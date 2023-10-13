import { useInView } from "react-intersection-observer";
import * as S from "./Record.styles";

const fromBottom = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};
const fromRight = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};
const revealFromRightToLeft = {
  hidden: {
    width: "100%",
  },
  visible: {
    width: "0%",
    transition: {
      duration: 2.3,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const Record = () => {
  const [imgRef, imgInView] = useInView({
    threshold: 0.2,
  });
  const [textRef, textInView] = useInView({
    threshold: 0.1,
  });
  return (
    <S.LayOut>
      <S.Title
        ref={textRef}
        initial="hidden"
        animate={textInView ? "visible" : "hidden"}
        variants={fromBottom}
        transition={{ duration: 0.7 }}
      >
        독서를 더 쉽게, 더 즐겁게
      </S.Title>
      <S.ImgBox ref={imgRef}>
        <S.Mask
          initial="hidden"
          animate={imgInView ? "visible" : "hidden"}
          variants={revealFromRightToLeft}
        />
        <S.ImgTextBox>
          <S.ImgTitle
            initial="hidden"
            animate={imgInView ? "visible" : "hidden"}
            variants={fromRight}
            transition={{ duration: 0.7, delay: 1 }}
          >
            과정을 기록하다
          </S.ImgTitle>
          <S.ImgText
            initial="hidden"
            animate={imgInView ? "visible" : "hidden"}
            variants={fromRight}
            transition={{ duration: 0.7, delay: 1.3 }}
          >
            언제, 어디서든
            <br />
            담아두고 싶은 한 줄을 기록하고
            <br />
            원할 때마다 꺼내보세요.
          </S.ImgText>
        </S.ImgTextBox>
      </S.ImgBox>
    </S.LayOut>
  );
};
export default Record;
