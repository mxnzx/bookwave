import { useNavigate } from "react-router-dom";
import * as S from "./SignupComplete,styles"
import icon from "../../../assets/icons/check.png";

const MainVariants = {
  normal: {
    color: "#064469",
    backgroundColor: "#D6E7EE",
    borderColor: "#D6E7EE",
  },
  hover: {
    color: "#064469",
    backgroundColor: "#ECF2F4",
    borderColor: "#064469",
  },
};
const BBTiVariants = {
  normal: {
    color: "#ECF2F4",
    backgroundColor: "#064469",
  },
  hover: {
    color: "#064469",
    backgroundColor: "#ECF2F4",
    borderColor: "#064469",
  },
};

const SignUpComplete = () => {
  const navigate = useNavigate();
  const nickName = localStorage.getItem("nickName")
  return (
      <S.Container>
        <S.Wrapper>
          <S.Circle src={icon}/>
          <S.TitleBox>
            <S.Title>회원 가입 완료</S.Title>
          </S.TitleBox>
          <S.Text><S.Text>{nickName}</S.Text>님의 회원가입이 완료되었습니다.</S.Text>
          <S.Text>내 <S.Text>독서 BBTI</S.Text>를 확인하고 맞춤 도서 추천을 받아보세요!</S.Text>
          <S.ButtonBox>
            <S.MainButton
              variants={MainVariants}
              initial="normal"
              whileHover="hover"
              onClick={() => navigate('/recommend')}
            >
              메인으로 가기
            </S.MainButton>
            <S.BBTIButton
              variants={BBTiVariants}
              initial="normal"
              whileHover="hover"
              onClick={() => navigate(`/bbti`)}
            >
              독서 BBTI 확인
            </S.BBTIButton>
          </S.ButtonBox>
        </S.Wrapper>
      </S.Container>
  );
};
export default SignUpComplete;
