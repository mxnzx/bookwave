import React, { useState } from "react";
import * as S from "./BBTIPage.styles";
import { fetchBBTIList, postBBTITResult } from "../../apis";
import { useQuery } from "@tanstack/react-query";
import BBTIResult from "../BBTIResult/BBTIResult";
import useCheckAuthentication from "../../utils/Hooks/useCheckAuthentication";

type OptionKeys = "A" | "B" | "C" | "D" | "E" | "F";

type QuestionData = {
  question: string;
  detail1: string;
  detail2: string;
  code1: OptionKeys;
  code2: OptionKeys;
};

const prevVariants = {
  normal: {
    color: "white",
    backgroundColor: "#018ABE",
  },
  hover: {
    color: "white",
    backgroundColor: "#064469",
  },
};
const modalAnimation = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -80 },
};
const BBTIPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const memberId = Number(localStorage.getItem("memberId"))
  const [selectedOptions, setSelectedOptions] = useState<OptionKeys[]>([]);
  const {data: bbtiData, isError, isLoading} = useQuery<QuestionData[]>(['bbtiData'], fetchBBTIList)
  const currentQuestion = bbtiData ? bbtiData[currentIndex] : null;
  const [resultData, setResultData] = useState(null);
  useCheckAuthentication();
  const handleOptionClick = async  (optionKey: OptionKeys) => {
    setSelectedOptions((prev) => [...prev, optionKey]); // 선택한 옵션 코드를 배열에 추가

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading book detail</p>;
  
  if (currentIndex < bbtiData.length - 1) {
    setCurrentIndex((prev) => prev + 1);
  } else {
    console.log(selectedOptions);
    try {
      const response = await postBBTITResult(memberId, selectedOptions);
      setResultData(response.data);
      console.log(response.data, "등록데이터");
      
      // navigate("/bbtiresult");
    } catch (error) {
      console.error("Error posting BBTI result:", error);
    }
  }
};
const handlePreviousOptionClick = () => {
  if (currentIndex > 0) {
    setCurrentIndex((prev) => prev - 1);
    setSelectedOptions((prev) => prev.slice(0, -1));
  }
};
console.log(selectedOptions);

if (!currentQuestion) return <div>Error: Current question not found!</div>;
  
  
  return (
    <S.LayOut>
      {resultData ? <BBTIResult data={resultData} />
    : (
      <>
      <S.Container
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalAnimation}
        transition={{ duration: 0.5 }}
      >
        <S.AnswerWrap>
          <S.Title>내 독서 BBTI는?</S.Title>
          <S.StepIndicator>
            {bbtiData?.map((_: any, index: number) => (
              <S.StepDot key={index} $active={index === currentIndex} />
            ))}
          </S.StepIndicator>
          <S.Question>{bbtiData?.[currentIndex]?.question}</S.Question>
          <S.AnswerBox
          onClick={() => handleOptionClick(currentQuestion.code1)}
        >
          {currentQuestion.detail1}
        </S.AnswerBox>
        <S.AnswerBox
          onClick={() => handleOptionClick(currentQuestion.code2)}
        >
          {currentQuestion.detail2}
        </S.AnswerBox>
          <S.ButtonBox>
            {currentIndex > 0 && (
              <S.PrevButton
                onClick={handlePreviousOptionClick}
                variants={prevVariants}
                initial="normal"
                whileHover="hover"
              >
                이전
              </S.PrevButton>
            )}
          </S.ButtonBox>
        </S.AnswerWrap>
      </S.Container>
      </>
    )  
    }
      
    </S.LayOut>
  );
};
export default BBTIPage;
