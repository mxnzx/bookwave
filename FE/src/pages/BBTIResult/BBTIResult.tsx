import React from "react";
import { useNavigate } from "react-router-dom";
import { Mobile, PC, Tablet } from "../../utils/MediaQuery/BBTIResultMQ";
import * as S from "./BBTIResult.styles";
import useCheckAuthentication from "../../utils/Hooks/useCheckAuthentication";

interface IBBTIResultProps {
  data: {
    name: string;
    bookId: string;
    content: string;
    imageUrl: string;
    author: string;
    title: string;
  };
}

const modalAnimation = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -80 },
};
const BBTIResult: React.FC<IBBTIResultProps> = ({ data }) => {
  const navigate = useNavigate();
  const nickName = localStorage.getItem("nickName")
  const bookId = parseInt(data.bookId, 10);
  useCheckAuthentication();
  console.log(bookId);
  
  return (
      <S.Container
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalAnimation}
              transition={{ duration: 0.5 }}
      >
        <S.Wrapper>
        <S.Title><S.PointTitle>{nickName}</S.PointTitle>님의 BBTI는<br/>
        <S.PointTitle>{data.name}</S.PointTitle>입니다.</S.Title>
        <S.Text><S.PointText>{data.content}</S.PointText><br/>
          이런 책은 어때요?
        </S.Text>
        <S.Hr/>
          <S.BookWrap>
            <S.BookBox>
            <S.BookImg 
              src={data.imageUrl}
              onClick={() => navigate(`/bookdetail/${bookId}`)}
            />
            </S.BookBox>
            <S.BookTextWrap>
              <S.BookTitle>{data.title}</S.BookTitle>
              <S.Author>{data.author}</S.Author>
                <S.Text>지금 당신과 같은 <S.Text>BBTI</S.Text>를 가진 독서가들이<br/>
                많이 읽고 있는 책이에요.<br/>
                더 많은 추천을 받아보세요.</S.Text>
                <PC>
      <S.BookDetailBtn onClick={() => navigate('/')} />
    </PC>
    <Tablet>
      <S.BookDetailBtn onClick={() => navigate('/')} />
    </Tablet>
            </S.BookTextWrap>
            <Mobile>
            <S.BBTIButton
              onClick={() => navigate('/')}
            >
              추천 받기
            </S.BBTIButton>
            </Mobile>
          </S.BookWrap>
        </S.Wrapper>
      </S.Container>
  );
};
export default BBTIResult;
