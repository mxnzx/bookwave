import styled from "styled-components";
import {motion} from "framer-motion";
export const TodayRecommendContainer = styled.div`
    display: flex;
    width:71vw;
    flex-direction:column;
    justify-content: space-evenly;
    background-color: #064469;
    border-radius: 1em;
    margin: 0% 0% 4% 0%;
    padding-bottom: 1%;

`;
export const TodayText = styled.p`
    padding:3% 4% 3% 4%;
    width: 100%;
    font-size: 1.5rem;
    font-weight: 700;
    color: #FFB4BD;
    @media (max-width:768px) {
        font-size: 1.5rem;
    }
`;

export const TodayRecommendText = styled.div`
    padding:3% 4% 0% 4%;
    color : #F9F6ED;
    width: 100%;


    p:nth-child(1){
        font-size:1.5rem;
        @media (max-width:768px) {
            font-size: 1rem;
        }
    }
    p:nth-child(2){
        font-size:1.5rem;
        @media (max-width:768px) {
            font-size: 1rem;
        }
    }
    // 마지막 p태그
    p:nth-child(3){
        padding-top: 10px;
        color: #BDBDBD;
        @media (max-width:768px) {
            font-size:10px;
        }
    }
    
`;

export const WriteDiarayBtn = styled(motion.button)`
    width: 8rem;
    margin-top: 5%;
    margin-bottom: 5%;
    padding: 7px;
    border: none;
    background-color: #00234F;
    color: white;
    border-radius: 7px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: 'Pretendard-Regular';
    cursor: pointer;
    &:hover{
        transform:scale(1.2);
        transition: transform 0.2s;
    }

    @media (max-width:768px) {
        font-size: 1px;
        width: 6rem;
    }
`;

export const HighLighting=styled.span`
    color: #9DCEDC;
    font-weight: 500;
    font-size: 1.5rem;
    @media (max-width:768px) {
            font-size: 1rem;
    }

`;

export const BookRecommendContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 290px;
    justify-content:center;

    @media (max-width:768px) {
        flex-direction: column;
    }
`;

export const DiaryRecommendText = styled.div`
    padding: 0% 4% 4% 4%;
    font-size: 1.6rem;
    color: white;
    line-height: 3rem;
    @media (max-width:1080px) {
        font-size:1rem;
        line-height: 2rem;
    }
`;

export const TodayBookContainer = styled.div`

    width:445px;
    height:230px;
    display: flex;
    flex-direction: row;
    background-color: #ffffff8c;
    border-radius: 5px;
    padding: 3% 3% 3% 3%;
    margin: 0% 4% 4% 4%;
    position: relative;
    img{
        max-width: 122px;
        box-shadow: 5px 10px 21px #000000b0;
        border-radius: 1rem;
        height: 100%;
        object-fit: cover;
    }
    @media (max-width:768px) {
        width: 87%;
        height: 159px;
    }
`;

export const BookImg = styled.div``;

export const BookInfo = styled.div`
    position: absolute;
    bottom: 38%;
    left: 180px;
    line-height: 2rem;

    @media (max-width:572px) {
        left:130px;
    }

`;
export const BookTitle=styled.p`
    font-weight: 700;
    font-size: 20px;
    color: #064469;
    @media (max-width:572px) {
        font-size: 1rem;
    }
`;

export const BookDetailBtn = styled(motion.button)`
   
    width: 26%;
    padding: 1%;
    border: none;
    position: absolute;
    bottom: 43px;
    left: 180px;
    font-family: 'Pretendard-Regular';
    cursor: pointer;
    border-radius: 4px;
    background-color: #D9D9D9;
    color: dimgray;
    font-family: 'Pretendard-Regular';

    cursor: pointer;
    &:hover{
        transform:scale(1.2);
        transition: transform 0.2s;
    }

    @media (max-width:768px) {
        font-size: 1px;
        bottom: 25px;
        left:180px;
    }
    @media (max-width:572px) {
        left:130px;
    }
`;

export const BookAuthor = styled.p`
    color: dimgray;
    @media (max-width:572px) {
        font-size: 1px;
    }
`;