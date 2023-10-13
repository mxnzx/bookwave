import * as S from "../Recommend.styles";
import {useEffect, useState} from 'react';
import refreshIcon from "@/assets/icons/refresh-circle-outline.png";
import { useBbtiRecommend } from "../../../apis/recommend";
import { useNavigate } from "react-router-dom";
import rightArrow from "@/assets/icons/arrow-right-circle.png";


const BbtiRecommend=()=>{
    const [booksPerRow, setBooksPerRow] = useState(5);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    useEffect(()=>{
        const handleResize = ()=>{
            if(window.innerWidth>=1200){
                setBooksPerRow(5);

            }
            else if(window.innerWidth>=864){
                setBooksPerRow(3);
            }
            else{
                setBooksPerRow(1);
            }
        };
        
        handleResize();
        window.addEventListener('resize',handleResize);
        return()=>{
            window.addEventListener('resize',handleResize);
        };

    },[]);

    const {data,isLoading,isError} = useBbtiRecommend();
    if(isLoading) return <p> Loading ... </p>
    if(isError) return <p> Error Loading Bbti Recommend</p>

    const nickName = localStorage.getItem("nickName");
    const bbti = data.bbti;
    const bbtiBookList = data.bookList; 
    const handleRefreshClick=()=>{
        if(currentIndex+booksPerRow>=bbtiBookList.length)
            setCurrentIndex(0)
        else setCurrentIndex(currentIndex+booksPerRow);
    }

    const visibleBooks = bbtiBookList.slice(currentIndex,currentIndex+booksPerRow).map((element,index)=>(
        <S.BookContainer key={index}>
            <S.BookImg  onClick={()=>{navigate(`/bookdetail/${element.bookId}`)}}>
                <img src={element.bookImageUrl}></img>
            </S.BookImg>
            <S.BookTitle>{element.bookTitle}</S.BookTitle>
            <S.BookAuthor>{element.author}</S.BookAuthor>
        </S.BookContainer>
    ));


    return (
        <S.RecommendContainer >
            <S.RecommendText >
               {
                bbti!=="" ? 
                    (
                        <>
                            <S.InfoText>{bbti}</S.InfoText>인 <S.InfoText>{nickName}</S.InfoText>님, <S.BtnContainer>
                                <p style={{paddingTop:"10px"}}>이런 책은 어때요?</p>
                                <S.changeGenreBtn  onClick={() => navigate("/bbti")}>BBTI 재검사 하기<img src={rightArrow}></img></S.changeGenreBtn>
                            </S.BtnContainer>
                            
                        </>
                    ): 
                    (
                        <S.BbtiText>아직 BBTI 테스트를 하지 않으셨군요. <br></br>BBTI 테스트를 통해 더 다양한 책을 추천받아 보세요.</S.BbtiText>
                    )
               }
                    
            </S.RecommendText>
                <S.BookList>
                    {visibleBooks}
                </S.BookList>
                {
                bbti!=="" ? 
                    (
                        <>
                            <S.RefreshBtn onClick={handleRefreshClick} ><i>다시 추천받기</i><img src={refreshIcon}></img></S.RefreshBtn>
                        </>
                    ): 
                    (
                        <S.NavigateBtn onClick={() => navigate("/bbti")} ><i>BBTI 테스트하러 가기</i><img src={refreshIcon}></img></S.NavigateBtn>
                    )
               }
            
        </S.RecommendContainer>
    );
};

export default BbtiRecommend;

