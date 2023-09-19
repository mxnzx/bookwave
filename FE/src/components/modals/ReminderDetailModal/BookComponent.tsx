import * as S from "./BookComponent.styles";

function BookComponent() {
    return (
        <S.Container>
            <S.BookImage>
                <img src="https://image.aladin.co.kr/product/31867/71/cover500/k132833528_2.jpg" alt="Book Cover" />
            </S.BookImage>
            <S.BookInfo>
                <S.BookTitle>도서 제목</S.BookTitle>
                <S.Author>저자명</S.Author>
            </S.BookInfo>
        </S.Container>
    );
}

export default BookComponent;