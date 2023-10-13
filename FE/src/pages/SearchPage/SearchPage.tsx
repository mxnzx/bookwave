import * as S from "./SearchPage.styles";
import SearchBox from "../../components/Search/SearchBox";
import { useEffect, useState } from "react";
import { fetchBookByKeyword } from "../../apis";
import { RingLoader } from "react-spinners";
import { useRecoilState, useSetRecoilState } from "recoil";
import { searchAttemptedState, searchTextState, selectedGenreIndexState } from "../../recoil";
import useCheckAuthentication from "../../utils/Hooks/useCheckAuthentication";

function SearchPage() {
  // const [searchText, setSearchText] = useState("");
  const [bookList, setBookList] = useState<any[]>([]);
  const [forceKey, setForceKey] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const setSelectedGenreIndex = useSetRecoilState(selectedGenreIndexState);
  const [searchAttempted, setSearchAttempted] = useRecoilState(searchAttemptedState);
  useCheckAuthentication();
  
  useEffect(() => {
    return () => {
      setSearchText("");
      setSelectedGenreIndex(null); // selectedGenre 상태 초기화
    };
  }, []);

  // 검색 버튼 클릭 시 호출되는 핸들러
  const handleSearch = async () => {
    if (searchText) {
      setIsLoading(true);
      try {
        const data = await fetchBookByKeyword(searchText);
        setBookList(data.data.bookList);
        setForceKey(Date.now());
        setSearchAttempted(true)
      } catch (error) {
        console.error("도서 검색 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // 엔터입력시 검색
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchAttempted(true)
      handleSearch();
    }
  };
  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setSelectedGenreIndex(null); // 검색어 입력시 액티브 상태 초기화
  };
  return (
    <S.Container>
      {isLoading && <LoadingModal />}
      <S.Wrapper>
        <S.Header>
          <S.HeaderTitle>BOOK WAVE</S.HeaderTitle>
          <S.HeaderSub>원하는 책을 검색해 보세요 !</S.HeaderSub>
        </S.Header>
        <S.Search>
          <S.InputBox>
            <S.InputBorder>
              <S.SearchIcon />
              <S.InputText
                id="inputText"
                placeholder="책 제목, 작가 검색"
                value={searchText}
                onChange={handleSearchTextChange}
                onKeyPress={handleKeyPress}
              />
            </S.InputBorder>
          </S.InputBox>
          <S.ButtonBox>
            <S.Button onClick={handleSearch}>검색</S.Button>
          </S.ButtonBox>
        </S.Search>
        <S.Body>
          <SearchBox key={forceKey} bookList={bookList} />
        </S.Body>
      </S.Wrapper>
    </S.Container>
  );
}

// HashLoader PuffLoader RingLoader ScaleLoader
function LoadingModal() {
  return (
    <div
      style={{
        position: "fixed",
        top: "60%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <RingLoader color="#123abc" size={120} />
    </div>
  );
}

export default SearchPage;
