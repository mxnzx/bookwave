import * as S from "./Login.styles";
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../../../config/SoialLogin";
import logo from "../../../assets/icons/logo.png";
import kakao from "../../../assets/icons/kakao_login.png";

const LoginPage: React.FC = () => {
  const handleLogin = (social: string) => {
    window.location.href = social === "kakao" ? KAKAO_AUTH_URL : NAVER_AUTH_URL;
  };
  return (
    <S.Container>
      <S.Wrapper>

        <S.TitleBox>
        <S.LogoBox>
          <S.LogoImg src={logo}/>
        </S.LogoBox>
          <S.Text>소셜 로그인으로 간편하게 시작하세요.</S.Text>
        </S.TitleBox>

        <S.ButtonWrapper>
          <S.KakaoLogin src={kakao} onClick={() => handleLogin("kakao")}/>
        </S.ButtonWrapper>
      </S.Wrapper>
    </S.Container>
  );
};
export default LoginPage;
