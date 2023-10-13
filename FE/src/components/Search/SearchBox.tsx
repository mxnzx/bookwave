import { useState } from "react";
import * as S from "./SearchBox.styles";
import SearchResult from "./SearchResult";
import { fetchBookByGenre } from "../../apis";
import { RingLoader } from "react-spinners";
import { useRecoilState } from 'recoil';
import { selectedGenreIndexState } from "../../recoil";

interface GenreProps {
  bookList: any[];
}

function SearchBox({ bookList: initialBookList }: GenreProps) {
  const [bookList, setBookList] = useState(initialBookList); // 초기 리스트 상태
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("평점 높은 순");
  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenreIndex, setSelectedGenreIndex] = useRecoilState(selectedGenreIndexState);

  const Order = ['평점 높은 순', '평점 낮은 순', '많이 담은 순'];
  const handleOrderSelect = (item: string, index: number) => {
    setSelectedItem(item);
    setSelectedOrderIndex(index);
    setIsOpen(false);
    console.log("Index:", index);
  };

  const genres = ['error', 'IT', '인문학', '문학', '만화', '예술', '취미', '육아', '사회과학', '역사', '과학', '경제/경영', '자기계발'];

  const handleGenreClick = async (index: number) => {
    const SearchText = document.querySelector<HTMLInputElement>("#inputText")?.value || "";
    setIsLoading(true);

    try {
      if (!SearchText) {
        // 검색어가 없을 경우, 장르별로 API 호출
        const data = await fetchBookByGenre(index);
        setBookList(data.data.bookList);
      } else {
        // 검색어가 있을 경우, 전달받은 bookList에서 필터링
        const filteredBooks = initialBookList.filter(book => book.genre === index);
        setBookList(filteredBooks);
      }
      setSelectedGenreIndex(index);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);  // 로딩 종료
    }
  };

  return (
    <S.Container>
      {isLoading && <LoadingModal />}
      <S.Left>
        <S.Wrap>
          <S.CategoryBox>
            {genres.filter(genre => genre !== 'error').map((genre, index) => (
              <S.GenreButton 
                key={index} 
                onClick={() => handleGenreClick(index + 1)}
                $isActive={selectedGenreIndex === index + 1}
                >
                {genre}
              </S.GenreButton>
            ))}
          </S.CategoryBox>
          <S.DropBox>
            <S.DropdownContainer>
              <S.DropdownHeader onClick={() => setIsOpen(!isOpen)}>
                {selectedItem}
                <S.DropImage />
              </S.DropdownHeader>
              {isOpen && (
                <S.DropdownList>
                  {Order.map((item, index) =>
                    item !== selectedItem && (
                      <S.DropdownItem
                        key={index}
                        onClick={() => handleOrderSelect(item, index)}
                      >
                        {item}
                      </S.DropdownItem>
                    )
                  )}
                </S.DropdownList>
              )}
            </S.DropdownContainer>
          </S.DropBox>
        </S.Wrap>
      </S.Left>
      <S.ResultBox>
        <SearchResult
          orderIndex={selectedOrderIndex}
          genreIndex={selectedGenreIndex}
          bookList={bookList}
        />
      </S.ResultBox>

    </S.Container>
  );
}

function LoadingModal() {
  return (
    <div style={{ position: 'fixed', top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <RingLoader color="#123abc" size={120} />
    </div>
  );
}
export default SearchBox;

