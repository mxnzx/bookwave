import * as S from "./ShelfPage.styles";
import { useShelf } from "../../apis";
import { useNavigate, useParams } from "react-router";
import TextMaxLength from "../../components/Common/TextMaxLength";
import useCheckAuthentication from "../../utils/Hooks/useCheckAuthentication";

function ShelfPage() {
  const navigate = useNavigate();
  const { id: idString } = useParams();
  const id = idString ? parseInt(idString, 10) : null;
  const memberId = Number(localStorage.getItem("memberId"));
  //책장 정보 받아오기 리액트쿼리
  useCheckAuthentication();
  const { data, isLoading, isError } = useShelf(id);
  const sliderSetting = {
    className: "center",
    centerMode: false,
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    dots: false,
    speed: 500,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: false,
          dots: false,
        },
      },

      {
        breakpoint: 1330,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
    ],
  };
  
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading shelf</p>;
  // console.log(data, "책장불러오기");

  return (
    <S.MainContainer>
      <S.ListContainer>
        {/* 책장 페이지 설명 */}
        <S.ShelfInfo>
          {memberId === id ? (
            <>
              <S.Title>내 책장</S.Title>
              <S.SubText>나만의 책장을 채워보세요.</S.SubText>
            </>
          ) : (
            <>
              <S.Title>{data.userNickname}<S.SubTitle>님의 책장</S.SubTitle></S.Title>
              <p></p>
            </>
          )
          }
        </S.ShelfInfo>
        {/* 읽고 싶은 책 */}
        <S.ShelfContainer>
          <S.TitleWrapper>
            <S.TitleInfo>읽고 싶은 책</S.TitleInfo>
          </S.TitleWrapper>
          <S.BookWrapper>
            <S.BookList>
              <S.StyledSlider {...sliderSetting}>
                {data.wishBookList.map((element, index) => (
                  <S.BookContainer key={index}>
                    <S.BookImg
                      onClick={() => navigate(`/bookdetail/${element.bookId}`)}
                    >
                      <img src={element.bookImageUrl}></img>
                    </S.BookImg>
                    <S.BookTitle>
                      <TextMaxLength text={element.bookTitle} maxLength={8} />
                    </S.BookTitle>
                    <S.BookAuthor>
                      <TextMaxLength text={element.bookAuthor} maxLength={7} />
                    </S.BookAuthor>
                  </S.BookContainer>
                ))}
              </S.StyledSlider>
            </S.BookList>
            <S.WishShelf></S.WishShelf>
          </S.BookWrapper>
        </S.ShelfContainer>

        {/* 읽는 중인 책 */}
        <S.ShelfContainer>
          <S.TitleWrapper>
            <S.TitleInfo>읽고 있는 책</S.TitleInfo>
          </S.TitleWrapper>
          <S.BookWrapper>
            <S.BookList>
              <S.StyledSlider {...sliderSetting}>
                {data.readingBookList.map((element, index) => (
                  <S.BookContainer key={index}>
                    <S.BookImg
                      onClick={() => navigate(`/bookdetail/${element.bookId}`)}
                    >
                      <img src={element.bookImageUrl}></img>
                    </S.BookImg>
                    <S.BookTitle>
                      <TextMaxLength text={element.bookTitle} maxLength={8} />
                    </S.BookTitle>
                    <S.BookAuthor>
                      <TextMaxLength text={element.bookAuthor} maxLength={7} />
                    </S.BookAuthor>
                  </S.BookContainer>
                ))}
              </S.StyledSlider>
            </S.BookList>
            <S.ReadingShelf></S.ReadingShelf>
          </S.BookWrapper>
        </S.ShelfContainer>

        {/* 읽은 책 */}
        <S.ShelfContainer>
          <S.TitleWrapper>
            <S.TitleInfo>다 읽은 책</S.TitleInfo>
          </S.TitleWrapper>
          <S.BookWrapper>
            <S.BookList>
              <S.StyledSlider {...sliderSetting}>
                {data.doneBookList.map((element, index) => (
                  <S.BookContainer key={index}>
                    <S.BookImg
                      onClick={() => navigate(`/bookdetail/${element.bookId}`)}
                    >
                      <img src={element.bookImageUrl}></img>
                    </S.BookImg>
                    <S.BookTitle>
                      <TextMaxLength text={element.bookTitle} maxLength={8} />
                    </S.BookTitle>
                    <S.BookAuthor>
                      <TextMaxLength text={element.bookAuthor} maxLength={7} />
                    </S.BookAuthor>
                  </S.BookContainer>
                ))}
              </S.StyledSlider>
            </S.BookList>
            <S.DoneShelf></S.DoneShelf>
          </S.BookWrapper>
        </S.ShelfContainer>
      </S.ListContainer>
    </S.MainContainer>
  );
}
export default ShelfPage;
