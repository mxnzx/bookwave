import pandas as pd
import requests
import json
import warnings

warnings.filterwarnings('ignore')

# CSV 파일을 읽어들임
df = pd.read_csv('bookwavedivide/bookwave_11.csv', encoding='utf-8')
print(df.head(2))
# '장르' 열을 추가합니다.
df['genre_1'] = None
df['genre_2'] = None

# 삭제할 행의 인덱스를 저장할 리스트

indices_to_remove = []

for index, row in df.iterrows():
    isbn = row['isbn']

    url = f"http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbcjh9703241248001&Query={isbn}&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101"
    response = requests.get(url)

    if response.status_code == 200:
        json_data = response.json()
        items = json_data.get('item', [])

        if not items:  # 빈 배열이면
            print(f"Empty array for ISBN: {isbn}, will remove row {index}")
            indices_to_remove.append(index)  # 삭제할 행의 인덱스를 저장
        else:
            first_item = items[0]  # 첫 번째 아이템을 가져옵니다.
            category_name = first_item.get('categoryName', '')

            if "국내도서" not in category_name:
                print(f"국내 도서가 아닙니다 ISBN: {isbn}, 제거중!!!! {index}")
                indices_to_remove.append(index)  # 삭제할 행의 인덱스를 저장
            else:
                genre_1 = category_name.split(">")[1]  # 예술/대중문화>디자인/공예>디자인이론/비평/역사

                try:
                    genre_2 = category_name.split(">")[2]  # 예술/대중문화>디자인/공예>디자인이론/비평/역사
                except IndexError:
                    genre_2 = None
                    continue

                if genre_1 in ['가정/요리/뷰티', '건강/취미/레저', '여행']:
                    genre_1 = '취미'
                elif genre_1 in['과학']:
                    genre_1='과학'
                elif genre_1 in['사회과학']:
                    genre_1='사회과학'
                elif genre_1 in['소설/시/희곡','에세이']:
                    genre_1='문학'
                elif genre_1 in['예술/대중문화']:
                    genre_1='예술'
                elif genre_1 in ['좋은부모']:
                    genre_1= '육아'
                elif genre_1 in ['컴퓨터/모바일']:
                    genre_1 = 'IT'
                elif genre_1 in ['경제/경영']:
                    genre_1='경제/경영'
                elif genre_1 in['자기 계발']:
                    genre_1='자기 계발'
                elif genre_1 in['만화']:
                    genre_1='만화'
                elif genre_1 in['역사']:
                    genre_1='역사'
                elif genre_1 in['인문학']:
                    genre_1='인문학'
                else:
                    indices_to_remove.append(index)  # 삭제할 행의 인덱스를 저장
                    continue

                if genre_2 is None:
                    indices_to_remove.append(index)  # genre_2 값이 없는 행을 삭제
                    continue

                print(f"{index}번째 데이터 정제중 genre_1 : {genre_1}, genre_2:{genre_2}")
                df.at[index, 'genre_1'] = genre_1
                df.at[index, 'genre_2'] = genre_2

    else:
        print(f"Failed to get data for ISBN: {isbn}")

    # 모든 ISBN에 대한 조회가 끝난 후, 저장된 인덱스를 이용해 행을 삭제
    # print(indices_to_remove)
df.drop(indices_to_remove, inplace=True)
# print("삭제 완료")
df['id'] = range(1, len(df) + 1)
# 새로운 CSV 파일로 저장
df.to_csv('filtered_bookwave_11.csv', index=False, encoding='utf-8-sig')



