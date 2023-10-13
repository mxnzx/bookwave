import * as S from "../Recommend.styles";
import { moodBookListState } from "../../../recoil/atoms";
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import refreshIcon from "@/assets/icons/refresh-circle-outline.png";
import { useMoodBook } from "../../../apis/recommend";
const MoodRecommend = () => {
       //현재 보여지는 책의 시작 인덱스
    const navigate = useNavigate();
    const [booksPerRow, setBooksPerRow] = useState(5);
    const [currentIndex, setCurrentIndex] = useState(0);
    const moods = ["행복","자신감","평화","후회","피로","걱정","분노","슬픔"];
    const [selectedMood, setSelectedMood] = useState(0);
    
    
    // const [selectedBooks, setSelectedBooks] = useState(data.moodList[0]);
    
    //반응형 구현 - 화면 줄어들 수록 보여주는 book count down
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

    const {data,isLoading,isError} = useMoodBook();
    if(isLoading) return <p>Loading...</p>
    if(isError) return <p> Error Mood recommend</p>
   
    const selectedBooks = data.moodList;

    //다시 추천하기 버튼
    const handleRefreshClick = () => {
        if (currentIndex + booksPerRow >= selectedBooks[selectedMood].bookList.length)
            setCurrentIndex(0);
        else setCurrentIndex(currentIndex + booksPerRow);
    }

    //감정 선택하기 - 버튼 클릭시 mood state 변경
    const handleMoodClick = (index: number) => {
        setSelectedMood(index);
        setCurrentIndex(0);
        console.log(selectedBooks);
    }

    //보여줄 book list container
    const visibleBooks = selectedBooks[selectedMood].bookList.slice(currentIndex, currentIndex + booksPerRow).map((element, index) => (
        <S.BookContainer key={index}>
            {/* <S.BookImg onClick={()=>{navigate(`/bookdetail/${element.bookId}`)}}> */}
            <S.BookImg onClick={()=>{navigate(`/bookdetail/${element.bookId}`)}}>
                <img src={element.bookImageUrl}></img>
            </S.BookImg>
            <S.BookTitle>{element.bookTitle}</S.BookTitle>
            <S.BookAuthor>{element.author}</S.BookAuthor>
        </S.BookContainer>
    ));

    return (
        <S.RecommendContainer>
            <S.RecommendText>
                읽고 싶은 책의<br></br><S.InfoText>#MOOD</S.InfoText>
                <S.categoryUl>
                    {moods.map((item, index) => (
                        <S.Category
                            key={index}
                            onClick={() => handleMoodClick(index)}
                            $isselected={selectedMood === index ? true : false}
                        >
                            {item}
                        </S.Category>
                    ))}
                </S.categoryUl>
            </S.RecommendText>
            <S.BookList>
                {visibleBooks}
            </S.BookList>
            <S.RefreshBtn onClick={handleRefreshClick} ><i>다시 추천받기</i><img src={refreshIcon}></img></S.RefreshBtn>
        </S.RecommendContainer>
    );
};

export default MoodRecommend;

