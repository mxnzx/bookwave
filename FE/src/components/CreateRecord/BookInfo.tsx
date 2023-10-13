import * as S from './BookInfo.styles'; // 스타일 파일을 불러옴

type BookInfoProps = {
  bookTitle: string;
  bookAuthor: string;
  bookImageUrl: string;
};


function BookInfo({ bookTitle, bookAuthor, bookImageUrl }: BookInfoProps) {
  return (
    <S.Container>
      <S.HeaderText >
        내 별점
      </S.HeaderText>
      <S.UnderLine />
      <S.Box>
        <S.LeftBox>
          <S.BookImageBox>
            <S.BookImage imageUrl={bookImageUrl} />
          </S.BookImageBox>
        </S.LeftBox>
        <S.RightBox>
          <S.Text>
            <S.TextMain>
              {bookTitle}
            </S.TextMain>
            <S.TextSub>
              {bookAuthor}
            </S.TextSub>
          </S.Text>
        </S.RightBox>
      </S.Box>
    </S.Container>
  );
}

export default BookInfo;
