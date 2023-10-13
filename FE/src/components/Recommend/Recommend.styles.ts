import styled from "styled-components";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const StyledSlider = styled(Slider)`
    width:80%;
    .slick-slide > div > div {
    width: 100%;
    display: flex !important;
    flex-direction: column;
    align-items: center;
    height: 300px;
  }
  .slick-dots{
      position:static;
  }
  .slick-list {
    margin-top: 25px;
  }
  /* .slick-slide > div {
    margin: 0 10px;
  }
  
  .slick-list {
    margin: 0 -10px;
    height: 100%;
  }
  .slick-prev {
    z-index: 1;
    left: -26px;
  }

  .slick-next {
    right: -23px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 25px;
    opacity: 0.5;
    color: #a1a1a1;
  }

  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: -13px;

    li button:before {
      color: #acaaa9;
    }

    li.slick-active button:before {
      color: #353535;
    }
  } */
`;

export const RecommendContainer = styled(motion.div)`
    display: flex;
    width: 71vw;
    min-height:500px;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin: 0% 0% 4% 0%;
    padding-bottom: 1%;
    padding-top: 3%;
    border-radius: 1em;
    background-color: #064469;
    position:relative;
`;

export const RecommendText = styled(motion.div)`
    font-size:1.5rem;
    padding:0% 4% 0% 4%;
    color : #F9F6ED;
    width: 100%;

    @media (max-width: 1200px) {
        //1200px 이하일 때
        font-size: 1rem; /* 큰 폰트 크기 설정 */
    }

    /* 화면 폭이 768px 이하일 때 */
    @media (max-width: 768px) {
        font-size: 0.8rem; /* 작은 폰트 크기 설정 */
    }
`;

export const InfoText = styled(motion.span)`
    text-decoration:underline;
    text-underline-position:under;
    font-weight:500;
    letter-spacing: -0.15rem;
    word-spacing: 0.3rem;
    margin-right:1%;
    color : #FFB4BD;

    @media (max-width: 1200px) {
        //1200px 이하일 때
        font-size: 1.5rem; /* 큰 폰트 크기 설정 */
    }

    /* 화면 폭이 768px 이하일 때 */
    @media (max-width: 768px) {
        font-size: 1rem; /* 작은 폰트 크기 설정 */
    }
`;

export const BookList = styled.div`
    padding:0% 3%;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export const RefreshBtn = styled(motion.button)`
    width: 9rem;
    margin: 2%;
    border: none;
    background-color: #00234F;
    color: white;
    border-radius: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: 'Pretendard-Regular';
    cursor: pointer;
    img{
        height:50%;
    }
    &:hover{
        transform:scale(1.2);
        transition: transform 0.2s;
    }
`;

export const BookContainer = styled(motion.div)`
    margin: 3% 0% 0%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: 0%;
    justify-content: center;
    text-align: center;
`;

//책 이미지 div
export const BookImg = styled.div`
    &:hover{
            transform:scale(1.2);
            transition: transform 0.2s;
    }
    img{
        box-shadow: 0px 10px 10px black;
        border-radius: 1rem;
        height: 195px;
        width: 137px;
        object-fit: cover;
        cursor: pointer;
        
    }
`;

//책 이름
export const TextStyle = styled.p`
    color : #F9F6ED;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
`;
export const BookTitle = styled(TextStyle)`
    font-size: 1.2rem;
    font-weight: 500;
    word-break: break-all;
    padding-top: 14px;
    width:100%;
    /* 화면 폭이 768px 이하일 때 */
    @media (max-width: 768px) {
        font-size: 1rem; /* 작은 폰트 크기 설정 */
    }

`;
//책 작가
export const BookAuthor = styled(TextStyle)`
    padding-top: 1%;
    color: darkgrey;
    width:100%;
    /* 화면 폭이 768px 이하일 때 */
    @media (max-width: 768px) {
        font-size: 0.8rem; /* 작은 폰트 크기 설정 */
    }
`

export const categoryUl = styled.ul`
    margin-top: 3vh;
    display: flex;
    flex-direction: row;

    @media (max-width:768px) {
        margin-top:1vh;
    }
`;

export const Category = styled.li<{$isselected:boolean}>`
    width: 10vh;
    background: ${({ $isselected }) => ($isselected ? '#9DCEDC' : '#ECF2F4')};
    border-radius: 5px;
    text-align: center;
    margin: 0vh;
    color: #064469;
    margin-right: 1vh;
    font-size: 1.3rem;
    letter-spacing: -2px;
    cursor: pointer;

    @media (max-width: 1200px) {
        // 1200px 이하일 때
        font-size: 1rem; /* 큰 폰트 크기 설정 */
    }

    /* 화면 폭이 768px 이하일 때 */
    @media (max-width: 768px) {
        font-size: 0.8rem; /* 작은 폰트 크기 설정 */
    }
`;

export const genreUl = styled(categoryUl)`
    justify-content: center;
`;
export const GenreCategory = styled.li<{$isSelected:boolean}>`
    margin-left:2vh;
    margin-right: 2vh;
    padding: 1vh;
    width: 17vh;
    color: ${({ $isSelected }) => ($isSelected ? '#9DCEDC' : 'grey')};
    /* #9DCEDC */
    text-align: center;
    border-bottom: 3px solid ${({ $isSelected }) => ($isSelected ? '#9DCEDC' : 'grey')};
    cursor: pointer;

    @media (max-width: 768px) {
        width: 10vh;
        font-size: 0.5rem;
        
    }
`;

export const NavigateBtn = styled(RefreshBtn)`
    position: absolute;
    top: 53%;
    left: 2%;
    border-radius: 10px;
    width: 12rem;
    height: 40px;
    font-size: 1rem;
    @media (max-width:768px) {
        height: 30px;
        font-size: 0.8rem;
    }
`;

export const SearchBtn = styled.button`
    position: absolute;
    top: 54%;
    left: 2%;
    border-radius: 10px;
    height: 40px;
    font-size: 1rem;
    margin: 2%;
    border: none;
    background-color: #00234F;
    color: white;
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
        height: 30px;
        font-size: 0.8rem;
    }
`;

export const BbtiText = styled(InfoText)`
    text-decoration: none;
`;

export const NoRecommendText = styled.div`
    font-size:1.5rem;
    padding:0% 4% 0% 4%;
    color : #F9F6ED;
    width: 100%;


    /* 화면 폭이 768px 이하일 때 */
    @media (max-width: 768px) {
        font-size: 1rem; /* 작은 폰트 크기 설정 */
     }
`;


export const changeGenreBtn = styled.button`    
    display: flex;
    flex-direction: row;
    align-items: center;
    /* justify-content: center; */
    border: none;
    background-color: transparent;
    width: 12rem;
    height: 40px;
    font-size: 1rem;
    color: #9DCEDC;
    cursor: pointer;
    img{
        height:16px;
        margin: 2px 2px 4px 2px;
    }
    @media (max-width:768px) {
        height: 30px;
        font-size: 0.8rem;
    }
`;
export const TextContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    @media (max-width:580px) {
        flex-direction: column;
    }
`
//애니메이션

export const containerVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: 
        {   type:"spring",
            duration:1,
            delayChildren:1,
            staggerChildren:0.8
        } }
};

export const bookVariants = {
    initial:{scale:0.5,opacity:0},
    animate:{scale:1, opacity:1, transition:{duration:1}},
}

export const refreshBookVariants={
    start:{scale:0.5,opacity:0},
    end:{scale:1, opacity:1},
}

export const btnVariants={
    initial:{scale:0.5,opacity:0},
    animate:{scale:1, opacity:1, transition:{duration:0.8, delay:3}},
}

export const textVariants={
    initial:{
        x:"200%",
        opacity:0
    },
    animate:{
        x:"0%",
        opacity:1,
        transition:{duration:1, ease:[0.6,-0.05,0.01,0.9]}
    },
}



export const infoTextVariants={
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: 
        {   type:"spring",
            duration:1,
            delayChildren:1,
            staggerChildren:0.6
        } }
}

export const mainTextVariants = {
    initial:{scale:0,opacity:0},
    animate:{scale:1, opacity:1, transition:{duration:2, delay:0.5}},
}
export const BtnContainer = styled.div`
    display: flex;
    align-items: baseline;
`;