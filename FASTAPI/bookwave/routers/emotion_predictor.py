from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from fastapi import Body
import torch
from torch import nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
import numpy as np
import pandas as pd
from tqdm import tqdm, tqdm_notebook
from kobert_tokenizer import KoBERTTokenizer
from transformers import BertModel
from util.bert_classifier import BERTClassifier  # bert_classifier 모듈에서 BERTClassifier 클래스 불러오기
from database import engineconn
from models import Book
from models import BookEmotion
from typing import List
import logging


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()
tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
bertmodel = BertModel.from_pretrained('skt/kobert-base-v1', return_dict=False)
vocab = nlp.vocab.BERTVocab.from_sentencepiece(tokenizer.vocab_file, padding_token='[PAD]')

class BERTDataset(Dataset):
    def __init__(self, dataset, sent_idx, label_idx, bert_tokenizer, vocab, max_len,
                 pad, pair):
        transform = nlp.data.BERTSentenceTransform(
            bert_tokenizer, max_seq_length=max_len, vocab=vocab, pad=pad, pair=pair)

        self.sentences = [transform([i[sent_idx]]) for i in dataset]
        self.labels = [np.int32(i[label_idx]) for i in dataset]

    def __getitem__(self, i):
        return (self.sentences[i] + (self.labels[i], ))

    def __len__(self):
        return (len(self.labels))
    

max_len = 64
batch_size = 32
warmup_ratio = 0.1
num_epochs = 20
max_grad_norm = 1
log_interval = 100
learning_rate =  5e-5

# 모델 로드
device = torch.device("cpu")
model = BERTClassifier(bertmodel, hidden_size=768, num_classes=8, dr_rate=None)
model.load_state_dict(torch.load('./models/bookwave_model_state_dict_v1.pt',map_location=torch.device('cpu')),strict=False)
model.eval()

#토큰화
tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
tok = tokenizer.tokenize

def new_softmax(a) : 
    c = np.max(a) # 최댓값
    exp_a = np.exp(a-c) # 각각의 원소에 최댓값을 뺀 값에 exp를 취한다. (이를 통해 overflow 방지)
    sum_exp_a = np.sum(exp_a)
    y = (exp_a / sum_exp_a) * 100
    return np.round(y, 3)



# 예측 모델 설정
def predict(predict_sentence):

    data = [predict_sentence, '0']
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, 0, 1, tok, vocab, max_len, True, False) # 토큰화한 문장
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size, num_workers=5)

    model.eval()

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)

        valid_length= valid_length
        label = label.long().to(device)

        out = model(token_ids, valid_length, segment_ids)

        test_eval=[]
        for i in out:
            logits=i
            logits = logits.detach().cpu().numpy()
            min_v = min(logits)
            total = 0
            probability = []
            logits = np.round(new_softmax(logits), 3).tolist()
            for logit in logits:
                # print(logit)
                probability.append(np.round(logit, 3))

            if np.argmax(logits) == 0:  emotion = "행복"
            elif np.argmax(logits) == 1: emotion = "자신감"
            elif np.argmax(logits) == 2: emotion = '평화'
            elif np.argmax(logits) == 3: emotion = '슬픔'
            elif np.argmax(logits) == 4: emotion = '분노'
            elif np.argmax(logits) == 5: emotion = '걱정'
            elif np.argmax(logits) == 6: emotion = '피곤'
            elif np.argmax(logits) == 7: emotion = '후회'



            probability.append(emotion)
            # print(probability)
    return probability

engine = engineconn()
session = engine.sessionmaker()

class GenreDetailIDList(BaseModel):
    member_id: int = Body(..., alias="memberId")
    content: str = Body(...,alias="content")
    genre_detail_ids: List[int]

@router.post("/rec/emotion")
async def 감정기반추천(data: GenreDetailIDList):
    logger.info(f"Received data: {data}")

    # KoBert 감정 분석 모델 load
    model_result= predict(data.content)
    state = model_result[8]

    datas = knn(model_result, data)
    response = {
            'id': datas,
            'state' : state
        }

    return response


class recordDeatil(BaseModel):
    book_id: int = Body(..., alias="bookId")
    isbn: str = Body(..., alias="isbn")
    content: str = Body(...,alias="content")



@router.post("/rec/bookwave")
async def 감정업데이트(data: recordDeatil):
    df = pd.read_csv("util/data/bookwave_reviews_v1.csv")
    logger.info(f"Received data: {data}")
    # data.isbn 값과 일치하는 df의 행들을 필터링
    reviews = df[df['isbn'] == int(data.isbn)]['review']
    # 해당 ISBN이 df에 없으면 reviews에 추가
    if reviews.empty:
        reviews = pd.Series([data.content])
    else:
        reviews = reviews.append(pd.Series([data.content]), ignore_index=True)
    # df에 새로운 행 추가
    new_row = {'isbn': data.isbn, 'review': data.content}
    df = df.append(new_row, ignore_index=True)
    # (선택적) 업데이트된 df를 파일에 다시 저장
    df.to_csv("util/data/bookwave_reviews_v1.csv", index=False,encoding='utf-8-sig')
    total_probability = [0, 0, 0, 0, 0, 0, 0, 0]  # 가정: 총 8개의 감정 클래스
    for review in reviews:
        prob = predict(review)
        # print(review)
        total_probability = [sum(x) for x in zip(total_probability, prob[:-1])]
        
    # 모든 probability 값을 합한 후, (리뷰의 개수 + 1)로 나눈 다음 소수점 세 자리까지 반올림
    avg_probability = [round(p / len(reviews), 3) for p in total_probability]

    print(avg_probability)
    emotion_names = {
        "happy": "행복",
        "confidence": "자신감",
        "peace": "평화",
        "sad": "슬픔",
        "angry":"분노",
        "scare": "걱정",
        "tired": "피로",
        "regret":"후회"
    }
    emotion_dict = dict(zip(emotion_names.keys(), avg_probability))
    max_emotion_key = max(emotion_dict, key=emotion_dict.get)
    max_emotion = emotion_names[max_emotion_key]

    # 해당 ISBN의 book_emotion 테이블에서 레코드 찾기
    book_emotion_record = session.query(BookEmotion).filter(BookEmotion.book_id == data.book_id).first()
    
    if not book_emotion_record:
        # 새로운 BookEmotion 레코드 추가
        new_emotion = BookEmotion(book_id=data.book_id,**emotion_dict)
        session.add(new_emotion)
    else:
        # BookEmotion 레코드 업데이트
        for emotion, value in emotion_dict.items():
            setattr(book_emotion_record, emotion, value)
        # Book 테이블의 emotion 업데이트
        # book_record = session.query(Book).filter(Book.id == data.book_id).first()
        # book_record.emotion = max_emotion

    # Book 테이블의 emotion 업데이트
    book_record = session.query(Book).filter(Book.id == data.book_id).first()
    # book_record.emotion = max_emotion


    logger.info(f"book_record: {book_record.emotion}")
    logger.info(f"max_emotion: {max_emotion}")
    response={
            'id': book_record.id,
            'emotion' : max_emotion
        }
    session.commit()
    session.close()
    
    
    
    return response



def knn(model_result,data: GenreDetailIDList):
    # genre_detail_ids에 포함된 모든 Book 항목을 검색
    books_with_emotions = (
        session.query(Book, BookEmotion)
        .join(BookEmotion, Book.id == BookEmotion.book_id)
        .filter(Book.genre_detail_dict_id.in_(data.genre_detail_ids))
        .all()
    )

    datas = []
    for book, book_emotion in books_with_emotions:
        tmp = [book_emotion.happy, book_emotion.confidence,book_emotion.peace, book_emotion.sad, book_emotion.angry,book_emotion.scare,book_emotion.tired,book_emotion.regret]

        sum = 0
        for i in range(0, len(tmp)):
            df = model_result[i] - tmp[i]  # 배열간 뺄셈
            df = df ** 2  # 데이터의 제곱
            sum += df
        row = {
                'id': book.id,  # flower primary key
                'distance': np.sqrt(sum)  # 데이터들의 합의 제곱근 = 거리
            }
        print(book.id)
        datas.append(row)
    df1 = pd.DataFrame(datas,columns=['id','distance']) # 결과 dataframe 생성
    
    df1 = df1.sort_values('distance') # distance가 가장 작은 순으로 정렬 후 상위 5개 추출
    print(df1)
    # 가장 작은 distance의 book_id 바로 추출
    result_book_id = int(df1['id'].iloc[0])
    session.close()
    return result_book_id





# FastAPI 엔드포인트 정의
# @router.post("/predict-emotion/", response_model=EmotionResponse)
# async def 감정예측(input_text: InputText):
#     predicted_emotion = predict(input_text.text)
#     return {"fear": predicted_emotion[0],
#         "embarrass": predicted_emotion[1],
#         "angry": predicted_emotion[2],
#         "sad": predicted_emotion[3],
#         "happy": predicted_emotion[4],
#         "aversion": predicted_emotion[5]}
