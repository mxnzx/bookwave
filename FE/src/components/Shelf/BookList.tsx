import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as S from './BookList.styles';
import ItemsCarousel from "react-items-carousel";

type Props = {
    state: number;
}

function BookList({ state }: Props) {
    const navigate = useNavigate();

    let headerText = 'Shelf State';
    if (state === 0) {
        headerText = '읽고 싶은 책';
    } else if (state === 1) {
        headerText = '읽는 중인 책';
    } else if (state === 2) {
        headerText = '다 읽은 책';
    }

    // /api/book/bookshelf-wish/{memberId} => /api/book/0/{memberId} 바꿔주라하자
    // 나중에 state에 따라 Axois 요청을 3군데로 나눠서 보내야 함.
    const bookList = [
        {
            "bookId": 1,
            "bookImageUrl": "https://image.aladin.co.kr/product/31867/71/cover500/k132833528_1.jpg",
            "bookTitle": "이토록 평범한 미래",
            "author": "김연수"
        },
        {
            "bookId": 2,
            "bookImageUrl": "https://image.aladin.co.kr/product/31867/71/cover500/k132833528_2.jpg",
            "bookTitle": "책 제목이야 1",
            "author": "은성"
        },
        {
            "bookId": 3,
            "bookImageUrl": "https://image.aladin.co.kr/product/31867/71/cover500/k132833528_1.jpg",
            "bookTitle": "책 제목이야 2",
            "author": "재현"
        },
        {
            "bookId": 4,
            "bookImageUrl": "https://image.aladin.co.kr/product/31867/71/cover500/k132833528_2.jpg",
            "bookTitle": "책 제목이야 3",
            "author": "소현"
        },
        {
            "bookId": 5,
            "bookImageUrl": "https://image.aladin.co.kr/product/31867/71/cover500/k132833528_1.jpg",
            "bookTitle": "책 제목이야 4",
            "author": "민지"
        },
        {
            "bookId": 6,
            "bookImageUrl": "https://image.aladin.co.kr/product/31867/71/cover500/k132833528_2.jpg",
            "bookTitle": "책 제목이야 5",
            "author": "제혁"
        },
        {
            "bookId": 6,
            "bookImageUrl": "https://image.aladin.co.kr/product/31867/71/cover500/k132833528_1.jpg",
            "bookTitle": "책 제목이야 6",
            "author": "준호"
        },
        {
            "bookId": 7,
            "bookImageUrl": "https://image.aladin.co.kr/product/31867/71/cover500/k132833528_1.jpg",
            "bookTitle": "책 제목이야 7",
            "author": "라현"
        },
    ];

    const [activeItemIndexReadingBook, setActiveItemIndexReadingBook] = useState(0);
    // 선택된 책의 ID를 저장할 상태
    // const [selectedBookId, setSelectedBookId] = useState(null);
    // 책을 클릭할 때 선택된 책 ID를 저장하고 모달을 열어주는 함수
    const handleBookClick = (bookId: number) => {
        // setSelectedBookId(bookId);
        navigate(`/BookDetail/${bookId}`);
    };
    const chevronWidth = 40;

    return (
        <S.Container>
            <S.Title>
                <S.HeaderText >
                    {headerText}
                </S.HeaderText>
                <S.UnderLine />
            </S.Title>

            <S.List>
                <ItemsCarousel
                    requestToChangeActive={(index: number) => setActiveItemIndexReadingBook(index)}
                    activeItemIndex={activeItemIndexReadingBook}
                    numberOfCards={5}
                    gutter={20}
                    leftChevron={<S.CarouselButton direction="left" />}
                    rightChevron={<S.CarouselButton direction="right" />}
                    outsideChevron
                    chevronWidth={chevronWidth}
                    onInactive={() => setActiveItemIndexReadingBook(-1)}
                >
                    {bookList.map((item) => (
                        <S.CarouselItem key={item.bookId} onClick={() => handleBookClick(item.bookId)}>
                            <S.BookImage src={item.bookImageUrl} />
                        </S.CarouselItem>
                    ))}
                </ItemsCarousel>
            </S.List>

            <S.bottom />
        </S.Container>
    );

}
export default BookList;