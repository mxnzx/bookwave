import React, { useState } from "react";
import Chart from "../../components/BookDetail/Chart/Chart";
import * as S from "./BookDetailPage.styles";
import Record from "../../components/BookDetail/Record/Record";
import { useQuery } from "@tanstack/react-query";
import { fetchBookDetail, postBookState } from "../../apis";
import { BookDetail } from "../../types/types";
import { bookDetailState } from "../../recoil/book";
import { useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import TextMaxLength from "../../components/Common/TextMaxLength";
import useCheckAuthentication from "../../utils/Hooks/useCheckAuthentication";

interface BookDetailItem {
  title: string;
  content: string | number;
}

const bookStateVariants = {
  normal: {
    color: "#064469",
    backgroundColor: "white",
    borderColor: "#064469",
  },
  hover: {
    color: "#064469",
    backgroundColor: "#D6E7EE",
    borderColor: "#064469",
  },
  active: {
    color: "white",
    backgroundColor: "#064469",
    borderColor: "#064469",
  },
};
const BookDetailPage: React.FC = () => {
  const { bookId: bookIdString } = useParams();
  const bookId = bookIdString ? parseInt(bookIdString, 10) : null;
  const setBookDetailState = useSetRecoilState(bookDetailState);
  const [activeButton, setActiveButton] = useState<number>(-1);
  useCheckAuthentication();
  
  // 도서 상태 변경 요청
  const handleBookState = async (buttonIndex: number) => {
    if (activeButton === buttonIndex) {
      await postBookState(bookId, 3);
      setActiveButton(-1);
    } else {
      await postBookState(bookId, buttonIndex);
      setActiveButton(buttonIndex);
    }
  };
  // 도서 상세 조회 리액트 쿼리
  const {
    data: bookDetail,
    isError,
    isLoading,
  } = useQuery<BookDetail>(
    ["bookDetail", bookId],
    () => fetchBookDetail(bookId),
    {
      enabled: !!bookId,
      onSuccess: (data: BookDetail) => {
        setBookDetailState(data);
        setActiveButton(data.state);
      },
    }
  );
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading book detail</p>;
  // 도서 정보 리스트 커스텀
  const bookDetailsArray: BookDetailItem[] = [
    {
      title: "카테고리",
      content: bookDetail.genre,
    },
    {
      title: "출판사",
      content: bookDetail.publisher,
    },
    { title: "출시일", content: bookDetail.publishDate },
    { title: "ISBN", content: bookDetail.isbn },
    { title: "독서 기록", content: bookDetail.recordListCnt },
    { title: "책장", content: bookDetail.bookshelfCnt },
    { title: "평점", content: parseFloat(bookDetail.bookScore.toFixed(2)) },
  ];

  return (
    <S.LayOut>
      <S.BookInfoContainer>
        <S.LeftBookWrap>
          <S.BookTitle>{bookDetail.title}</S.BookTitle>
          <S.NomalText>{bookDetail.author}</S.NomalText>
          <S.BookImg src={bookDetail.imageUrl} />
          <S.ButtonBox>
            <S.BookButton
              onClick={() => handleBookState(0)}
              whileHover={bookStateVariants.hover}
              whileTap={activeButton === 0 ? bookStateVariants.active : {}}
              initial={bookStateVariants.normal}
              animate={
                activeButton === 0
                  ? bookStateVariants.active
                  : bookStateVariants.normal
              }
            >
              읽고 싶은
            </S.BookButton>
            <S.BookButton
              onClick={() => handleBookState(1)}
              whileHover={bookStateVariants.hover}
              whileTap={activeButton === 1 ? bookStateVariants.active : {}}
              initial={bookStateVariants.normal}
              animate={
                activeButton === 1
                  ? bookStateVariants.active
                  : bookStateVariants.normal
              }
            >
              읽는 중
            </S.BookButton>
            <S.BookButton
              onClick={() => handleBookState(2)}
              whileHover={bookStateVariants.hover}
              whileTap={activeButton === 2 ? bookStateVariants.active : {}}
              initial={bookStateVariants.normal}
              animate={
                activeButton === 2
                  ? bookStateVariants.active
                  : bookStateVariants.normal
              }
            >
              읽은
            </S.BookButton>
          </S.ButtonBox>
        </S.LeftBookWrap>
        <S.RightBookWrap>
          <S.BookContainer>
            <S.BookInfoWrap>
              {bookDetailsArray.map((bookDetail, index) => (
                <S.BookInfoBox key={index} index={index}>
                  <S.BookInfoTitle>{bookDetail.title}</S.BookInfoTitle>
                  <S.BookInfoContent>{bookDetail.content}</S.BookInfoContent>
                </S.BookInfoBox>
              ))}
            </S.BookInfoWrap>
          </S.BookContainer>
          <S.BookIntro>
            <S.BookInfoTitle>책 소개</S.BookInfoTitle>
            <S.BookIntroContent>
              <TextMaxLength text={bookDetail.content} maxLength={300} />
            </S.BookIntroContent>
          </S.BookIntro>
        </S.RightBookWrap>
      </S.BookInfoContainer>
      <Chart />
      <Record />
    </S.LayOut>
  );
};
export default BookDetailPage;
