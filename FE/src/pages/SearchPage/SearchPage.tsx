import * as S from './SearchPage.styles';

function SearchPage() {

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>BOOK WAVE</S.HeaderTitle>
        <S.HeaderSub>원하는 책을 검색해 보세요 !</S.HeaderSub>
      </S.Header>
      <S.Search>검색</S.Search>
      <S.Body>바디</S.Body>
    </S.Container>
  );
}

export default SearchPage;
