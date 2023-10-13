import { useInView } from "react-intersection-observer";
import * as S from "./Recommend,styles";
import { useNavigate } from "react-router-dom";

const fromBottom = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Recommend = () => {
  const navigate = useNavigate();
  const [titleRef, titleInView] = useInView({
    threshold: 0.2,
  });
  const [textRef, textInView] = useInView({
    threshold: 0.2,
  });
  const [boxRef, boxInView] = useInView({
    threshold: 0.2,
  });
  const handleLogIn = () => {
    navigate('/login')
  }
  return (
    <S.LayOut>
      <S.TextBox>
        <S.Title
          ref={titleRef}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={fromBottom}
          transition={{ duration: 0.7 }}
        >
          완전히 새로운 방식의 추천
        </S.Title>
        <S.Text
          ref={textRef}
          initial="hidden"
          animate={textInView ? "visible" : "hidden"}
          variants={fromBottom}
          transition={{ duration: 0.7 }}
        >
          BookWave만의 추천을 경험하세요.
        </S.Text>
      </S.TextBox>
      {/* <S.RecommendWrapper ref={boxRef}>
        <S.RecommendBox
          initial="hidden"
          animate={boxInView ? "visible" : "hidden"}
          variants={fromBottom}
          transition={{ duration: 0.7 }}
        >
          <S.RecommendTitle>감정 기반</S.RecommendTitle>
        </S.RecommendBox>
        <S.RecommendBox
          initial="hidden"
          animate={boxInView ? "visible" : "hidden"}
          variants={fromBottom}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <S.RecommendTitle>BBTI 기반</S.RecommendTitle>
        </S.RecommendBox>
        <S.RecommendBox
          initial="hidden"
          animate={boxInView ? "visible" : "hidden"}
          variants={fromBottom}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <S.RecommendTitle>알고리즘 기반</S.RecommendTitle>
        </S.RecommendBox>
      </S.RecommendWrapper> */}
      <S.LogInBox>
      <S.LogInButton onClick={handleLogIn}>JUST DIVE</S.LogInButton>
      </S.LogInBox>
    </S.LayOut>
  );
};
export default Recommend;
