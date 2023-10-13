import * as S from "../Recommend.styles";
import {motion} from "framer-motion";
import {useEffect, useState} from 'react';
import { useRecentRecommend } from "../../../apis/recommend";
import refreshIcon from "@/assets/icons/refresh-circle-outline.png";
import { useNavigate } from "react-router-dom";

const RecentRecommend=()=>{
    const [booksPerRow, setBooksPerRow] = useState(5);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const {data,isLoading,isError} = useRecentRecommend();
    if(isLoading) return <p>Loading...</p>
    if(isError) return <p> Error Recent Recommend</p>
    const recentBookTitle = data.recentBookTitle;
    const recentBookList = data.recentList;
    // console.log(recentBookList);

    const sliderSetting = {
        className:"center",
        centerMode : false,
        infinite: false,
        centerPadding: "60px",
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide:0,
        dots: true,
        speed: 500,
        responsive: [
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false,
                dots: true,
              },
            },
            {
              breakpoint: 864,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite:false,
                dots:false,
              },
            },
          ],
    }

    const handleRefreshClick=()=>{
        if(currentIndex+booksPerRow>=recentBookList.length)
            setCurrentIndex(0)
        else setCurrentIndex(currentIndex+booksPerRow);
    }


    const visibleBooks = (
        recentBookList!==null ?
        (recentBookList.slice(currentIndex,currentIndex+booksPerRow).map((element,index)=>(
        <S.BookContainer key={index}>
            <S.BookImg onClick={()=>{navigate(`/bookdetail/${element.bookId}`)}}>
                <img src={element.bookImageUrl}></img>
            </S.BookImg>
            <S.BookTitle>{element.bookTitle}</S.BookTitle>
            <S.BookAuthor>{element.author}</S.BookAuthor>
        </S.BookContainer>)
        ))
        :null
    );

    
    return (
        <S.RecommendContainer >
            
                {
                    recentBookTitle!==null ?
                    (
                        <>
                        <S.RecommendText  >
                            최근 읽은<br></br><motion.span >
                            <S.InfoText>{recentBookTitle}</S.InfoText>
                        </motion.span> 과 비슷한 장르의 책을 추천해요.
                        </S.RecommendText>
                        </>
                    ) : (
                        <>
                        <S.NoRecommendText>
                            최근 읽은 책이 없습니다. 읽고 싶은 책을 검색해보세요!
                        </S.NoRecommendText>
                        </>
                    )
                }
            {
                recentBookList!==null ? (
                    <>
                        <S.StyledSlider {...sliderSetting}>
                                {visibleBooks}
                        </S.StyledSlider>
                        <S.RefreshBtn onClick={handleRefreshClick}><i>다시 추천받기</i><img src={refreshIcon}></img></S.RefreshBtn>
                    </>
                ):(
                    <S.SearchBtn onClick={() => navigate("/search")}><i>책 검색하러 가기</i></S.SearchBtn>
                )
            }
           
        </S.RecommendContainer>
    );
};

export default RecentRecommend;

