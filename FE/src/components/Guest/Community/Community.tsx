import { useInView } from "react-intersection-observer";
import * as S from "./Community.styles";

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
const revealFromBottom = {
  hidden: {
    height: "100%",
  },
  visible: {
    height: "0%",
    transition: {
      duration: 2.3,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const Community = () => {
  const [leftImgRef, leftImgInView] = useInView({
    threshold: 0.2,
  });
  const [rightImgRef, rightImgInView] = useInView({
    threshold: 0.2,
  });
  const [textRef, textInView] = useInView({
    threshold: 0.1,
  });
  return (
    <S.LayOut>
      <S.Container>
        <S.LeftWrap>
          <S.TextBox ref={textRef}>
            <S.Title
              initial="hidden"
              animate={textInView ? "visible" : "hidden"}
              variants={fromBottom}
              transition={{ duration: 0.7 }}
            >
              편안한 공간에서 나누는 편안한 대화
            </S.Title>
            <S.Text
              initial="hidden"
              animate={textInView ? "visible" : "hidden"}
              variants={fromBottom}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              독서 취향을 확인하고 <br />
              나와 맞는 사람들과 감상을 나눠보세요.
            </S.Text>
          </S.TextBox>
          <S.BoxWrap>
          <S.LeftImgBox ref={leftImgRef}>
            <S.Mask
              initial="hidden"
              animate={leftImgInView ? "visible" : "hidden"}
              variants={revealFromBottom}
            />
          </S.LeftImgBox>
          </S.BoxWrap>
        </S.LeftWrap>
        <S.RightWrap>
        <S.BoxWrap>
          <S.RightImgBox ref={rightImgRef}>
            <S.Mask
              initial="hidden"
              animate={rightImgInView ? "visible" : "hidden"}
              variants={revealFromBottom}
            />
          </S.RightImgBox>
          </S.BoxWrap>
        </S.RightWrap>
      </S.Container>
    </S.LayOut>
  );
};
export default Community;
