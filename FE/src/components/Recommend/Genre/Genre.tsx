import * as S from "../Recommend.styles";
import refreshIcon from "@/assets/icons/refresh-circle-outline.png";
import rightArrow from "@/assets/icons/arrow-right-circle.png";
import { useEffect, useState } from "react";
import { useGenreRecommend } from "../../../apis/recommend";
import { useNavigate } from "react-router";

interface GenreRecommendProps {
    onShowGenreModal: () => void;
}

const GenreRecommend: React.FC<GenreRecommendProps> = ({ onShowGenreModal }) => {
    const navigate = useNavigate();

    const [booksPerRow, setBooksPerRow] = useState(5);
    const [selectedGenre, setSelectedGenre] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1200) {
                setBooksPerRow(5);

            }
            else if (window.innerWidth >= 864) {
                setBooksPerRow(3);
            }
            else {
                setBooksPerRow(1);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.addEventListener('resize', handleResize);
        };

    }, []);
    //axios 값 가져오기
    const { data, isLoading, isError } = useGenreRecommend();
    if (isLoading) return <p>Loading..</p>
    if (isError) return <p> Error Loading Genre Recommend</p>

    const favoriteGenreList = data.favoriteGenreList;
    const genreBookList = data.genreBookList;
    const keyList = Object.keys(genreBookList);

    const handleRefreshClick = () => {
        if (currentIndex + booksPerRow >= genreBookList[keyList[selectedGenre]].length)
            setCurrentIndex(0);
        else setCurrentIndex(currentIndex + booksPerRow);
    }

    //장르 선택
    const handleGenreClick = (index: number) => {
        setSelectedGenre(index);
        setCurrentIndex(0);
    }

    const visibleBooks = (
        keyList.length !== 0 ?
            (genreBookList[keyList[selectedGenre]].slice(currentIndex, currentIndex + booksPerRow).map((element, index) => (
                <S.BookContainer key={index}>
                    <S.BookImg onClick={() => { navigate(`/bookdetail/${element.bookId}`) }}>
                        <img src={element.bookImageUrl}></img>
                    </S.BookImg>
                    <S.BookTitle>{element.bookTitle}</S.BookTitle>
                    <S.BookAuthor>{element.author}</S.BookAuthor>
                </S.BookContainer>
            ))) : null
    );

    return (
        <S.RecommendContainer>

            {
                keyList.length !== 0 ?
                    (
                        <S.RecommendText>
                            <S.TextContainer>
                            선호하는 장르의 책들을 추천할게요.
                            <S.changeGenreBtn  onClick={onShowGenreModal}>선호 장르 변경하기<img src={rightArrow}></img></S.changeGenreBtn>
                            
                            </S.TextContainer>
                            <S.genreUl>
                                {favoriteGenreList.map((genre, index) => (
                                    <S.GenreCategory
                                        key={index}
                                        onClick={() => handleGenreClick(index)}
                                        $isSelected={selectedGenre === index}
                                    >
                                        {genre}
                                    </S.GenreCategory>
                                ))}
                            </S.genreUl>
                        </S.RecommendText>
                    ) : (
                        <>
                            <S.RecommendText>
                                선호하는 장르를 선택하지 않았습니다.
                            </S.RecommendText>
                        </>
                    )
            }

            {
                keyList.length !== 0 ? (
                    <>
                        <S.BookList>
                            {visibleBooks}
                        </S.BookList>
                        <S.RefreshBtn onClick={handleRefreshClick}>다시 추천받기<img src={refreshIcon}></img></S.RefreshBtn>
                    </>
                ) : (
                    <S.NavigateBtn onClick={onShowGenreModal} ><i>장르 선택하기</i><img src={refreshIcon}></img></S.NavigateBtn>
                )
            }

        </S.RecommendContainer>
    );
};

export default GenreRecommend;

