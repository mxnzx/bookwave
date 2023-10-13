import * as S from './FeedBookSelect.styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemsCarousel from "react-items-carousel";
import { fetchBookList } from '../../../apis';
import TextMaxLength from '../../Common/TextMaxLength';

type BookData = {
  readingBookList: Array<{
    bookId: number;
    bookImageUrl: string;
    bookTitle: string;
    bookAuthor: string;
  }>;
  doneBookList: Array<{
    bookId: number;
    bookImageUrl: string;
    bookTitle: string;
    bookAuthor: string;
  }>;
};

function FeedBookSelect({ isOpen, onClose, userSeq }: { isOpen: boolean, onClose: () => void, userSeq: number | null }) {
  const [activeItemIndexReadingBook, setActiveItemIndexReadingBook] = useState(0);
  const [activeItemIndexReadBook, setActiveItemIndexReadBook] = useState(0);
  const [numberOfCards, setNumberOfCards] = useState(5);
  const navigate = useNavigate();
  const [bookData, setBookData] = useState<BookData>({
    readingBookList: [],
    doneBookList: [],
  });

  useEffect(() => {
    const loadBookList = async () => {
      try {
        let bookInfo;
        if (userSeq !== null) {
          // console.log("userSeq :"+ userSeq);
          bookInfo = await fetchBookList(userSeq);
        } else {
          console.log("userSeq가 어?")
        }
        if (bookInfo) {
          setBookData(bookInfo);
          // console.log("bookInfo" + bookInfo);
          // console.log("bookInfo.wishBookList" + bookInfo.wishBookList);
          // console.log("bookInfo.readingBookList" + bookInfo.readingBookList);
          // console.log("bookInfo.doneBookList" + bookInfo.doneBookList);
        } else {
          console.error("bookInfo가 어? ");
        }
      } catch (error) {
        console.error("도서 정보 부르는데 어?");
      }
    };

    // 비동기 에러 방지
    const timer = setTimeout(() => {
      loadBookList();
    }, 100);
    return () => clearTimeout(timer);
  }, [userSeq]);

  // 카드 수 (반응형)
  useEffect(() => {
    const updateNumberOfCards = () => {
      if (window.innerWidth <= 470) {
        setNumberOfCards(2);
      } else if (window.innerWidth <= 700) {
        setNumberOfCards(3);
      } else if (window.innerWidth <= 800) {
        setNumberOfCards(4);
      } else {
        setNumberOfCards(5);
      }
    };
    // 창 크기 변경 이벤트에 대한 리스너를 추가
    window.addEventListener('resize', updateNumberOfCards);
    updateNumberOfCards(); // 초기값을 설정
    // 컴포넌트가 언마운트될 때 리스너를 제거
    return () => {
      window.removeEventListener('resize', updateNumberOfCards);
    };
  }, []);

  const handleBookClick = (bookId: number) => {
    navigate(`/createrecord/${bookId}/${userSeq}`);
    console.log(`bookId: ${bookId} 입니다!`);
    console.log(`userSeq: ${userSeq} 입니다!`);
  };

  if (!isOpen) return null;

  return (
    <S.Overlay>
      <S.Container>
        <S.Header>
          <S.HeaderText >
            피드 작성하기
            <S.UnderLine />
            <S.SubText>
              피드를 작성할 책을 선택해주세요.
            </S.SubText>
          </S.HeaderText>
          <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
        </S.Header>

        {/* 읽는 중인 책 캐러셀 */}
        <S.Box>
          <S.SelectHeader>읽는 중인 책</S.SelectHeader>
          <S.CarouselBox>
            {bookData.readingBookList.length === 0 ? (

              <S.AlartBox>읽는 중인 책이 없습니다.</S.AlartBox> // 이 부분을 원하는 디자인과 텍스트로 꾸밀 수 있습니다.
            ) : (
              <ItemsCarousel
                requestToChangeActive={(index: number) => setActiveItemIndexReadingBook(index)}
                activeItemIndex={activeItemIndexReadingBook}
                numberOfCards={numberOfCards}
                gutter={20}
                leftChevron={<S.CarouselButton direction="left" />}
                rightChevron={<S.CarouselButton direction="right" />}
                outsideChevron
                chevronWidth={40}
                onInactive={() => setActiveItemIndexReadingBook(-1)}
              >
                {bookData.readingBookList.map((item) => (
                  <S.CarouselItem key={item.bookId} onClick={() => handleBookClick(item.bookId)}>
                    <S.ImageBox>
                      <S.BookImage src={item.bookImageUrl} />
                    </S.ImageBox>
                    <S.CardUnderLine />
                    <S.BookTitle>
                      <TextMaxLength text={item.bookTitle} maxLength={10} />
                    </S.BookTitle>
                    <S.BookAuthor>
                      <TextMaxLength text={item.bookAuthor} maxLength={10} />
                    </S.BookAuthor>
                  </S.CarouselItem>
                ))}
              </ItemsCarousel>
            )}
          </S.CarouselBox>
        </S.Box>

        {/* 읽은 책 캐러셀 */}
        <S.Box>
          <S.SelectHeader>다 읽은 책</S.SelectHeader>
          <S.CarouselBox>
            {bookData.doneBookList.length === 0 ? (
              <S.AlartBox>다 읽은 책이 없습니다.</S.AlartBox>
            ) : (
              <ItemsCarousel
                requestToChangeActive={(index: number) => setActiveItemIndexReadBook(index)}
                activeItemIndex={activeItemIndexReadBook}
                numberOfCards={numberOfCards}
                gutter={20}
                leftChevron={<S.CarouselButton direction="left" />}
                rightChevron={<S.CarouselButton direction="right" />}
                outsideChevron
                chevronWidth={40}
                onInactive={() => setActiveItemIndexReadBook(-1)}
              >
                {bookData.doneBookList.map((item) => (
                  <S.CarouselItem key={item.bookId} onClick={() => handleBookClick(item.bookId)}>
                    <S.ImageBox>
                      <S.BookImage src={item.bookImageUrl} />
                    </S.ImageBox>
                    <S.CardUnderLine />
                    <S.BookTitle>
                      <TextMaxLength text={item.bookTitle} maxLength={10} />
                    </S.BookTitle>
                    <S.BookAuthor>
                      <TextMaxLength text={item.bookAuthor} maxLength={10} />
                    </S.BookAuthor>
                  </S.CarouselItem>
                ))}
              </ItemsCarousel>
            )}
          </S.CarouselBox>
        </S.Box>

      </S.Container>
    </S.Overlay>
  );
}

export default FeedBookSelect;