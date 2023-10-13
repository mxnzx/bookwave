import * as S from "./Today.styles";
import { todayBookState } from "../../../recoil/atoms";
import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import refreshIcon from "@/assets/icons/refresh-circle-outline.png";
import { useNavigate } from "react-router-dom";
import {useTodayBook} from "../../../apis/recommend";
const moods = ["행복","자신감","평화","후회","피로","걱정","분노","슬픔"];
type Emotions = {
    행복: string;
    자신감: string;
    평화: string;
    후회: string;
    피로: string;
    걱정: string;
    분노: string;
    슬픔: string;
    [key: string]: string;
}
const emotionsMent:Emotions = {
    행복: "행복한 하루를 보낸 당신!\n이 책을 읽고 더 행복하게 마무리해 봐요.",
    자신감: "자신감이 넘치는 하루네요!\n 이 책이 자신감을 더욱 UP 시켜줄 거예요.",
    평화: "오늘은 평화로운 하루네요.\n 이 책을 읽으며 평화를 더 만끽해봐요.",
    후회: "후회스러운 하루를 보냈네요.\n 이 책을 읽으며 마음을 다스려봐요.",
    피로: "오늘 피로를 많이 느끼셨네요.\n 이 책을 읽으며 피로를 풀어봐요.",
    걱정: "어떤 걱정이 당신을 괴롭히나요?\n 이 책이 도움이 되길 바라요.",
    분노: "어떤 일로 분노를 느꼈나요?\n 이 책을 읽으며 화를 가라앉혀 봐요.",
    슬픔: "어떤 일로 슬픔을 느꼈나요?\n 이 책이 위로가 되길 바라요."
}

const highlightKeyword = (text: string, keyword: string): JSX.Element => {
    const parts = text.split(keyword);
    return (
        <span>
            {parts.map((part, index) => (
                <span key={index}>
                    {part}
                    {index !== parts.length - 1 && <span style={{ fontWeight: 'bold', color: '#ffb4bd' }}>{keyword}</span>}
                </span>
            ))}
        </span>
    );
};

const TodayRecommend=()=>{
    const navigate = useNavigate();
    const {data,isLoading,isError} = useTodayBook();
    if(isLoading) return <p>Loading...</p>
    if(isError) return <p> Error Today Recommend</p>
    const todayEmotion = data.todayEmotion;
    const isDiary = (todayEmotion===null) ? false : true;
    return (
        <S.TodayRecommendContainer>
            <S.TodayText>TODAY</S.TodayText>
            {isDiary ? 
                <S.BookRecommendContainer>
                    {/* 감정 분석 멘트 */}
                    <S.DiaryRecommendText>
                        <p style={{whiteSpace: 'pre-line'}}>
                            {highlightKeyword(emotionsMent[todayEmotion], todayEmotion)}
                        </p>
                    </S.DiaryRecommendText>
                    {/* 추천 책 container */}
                    <S.TodayBookContainer>
                        <img src={data.bookImgUrl}></img>
                        <S.BookInfo>
                            <S.BookTitle>{data.bookTitle}</S.BookTitle>
                            <S.BookAuthor>{data.bookAuthor}</S.BookAuthor>
                        </S.BookInfo>
                        <S.BookDetailBtn onClick={()=>{navigate(`/bookdetail/${data.bookId}`)}}>책 상세 보기</S.BookDetailBtn>
                    </S.TodayBookContainer>
                </S.BookRecommendContainer>
                :
                <S.TodayRecommendText >
                   <p><S.HighLighting>오늘의 일기</S.HighLighting>를 작성하고<br></br></p>
                   <p><S.HighLighting>오늘의 책</S.HighLighting>을 추천 받아보세요.</p>
                   <p>당신의 감정을 분석해서 책을 추천해드립니다.</p>
                   <S.WriteDiarayBtn onClick={()=>navigate("/createreminder")}><i>일기 쓰러 가기</i></S.WriteDiarayBtn>
                </S.TodayRecommendText>
            }
            
            
        </S.TodayRecommendContainer>
    );
};

export default TodayRecommend;

