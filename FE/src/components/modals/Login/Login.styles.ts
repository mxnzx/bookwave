import styled from "styled-components";
import naver from "@/assets/icons/naver.png";
import kakao from "@/assets/icons/kakao.png";

export const LayOut = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 24rem;
  height: 18rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background-color: white;
  border-radius: 1rem;
  @media (max-width: 500px) {
    height: 100vh;
    width: 100vw;
  }
`;
export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2.5rem;
  align-items: center;
`;
export const Title = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  @media (max-width: 500px) {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
  }
`;
export const Text = styled.span`
  margin-top: 5px;
  font-size: 0.7rem;
  font-weight: 500;
`;
export const NaverBox = styled.div`
  display: grid;
  grid-template-columns: auto 1fr; // 로고를 그대로 두고 나머지 공간을 LoginButton에게 할당
  align-items: center;
  margin-top: 1rem;
  width: 70%;
  height: 2.3rem;
  background-color: #00c300;
  font-weight: 500;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-radius: 0.2rem;
  padding: 0 0.3rem;
  cursor: pointer;
`;
export const KakaoBox = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin-top: 1.5rem;
  width: 100%;
  height: 2.3rem;
  font-weight: 500;
  padding: 0 0.3rem;
  border-radius: 0.2rem;
  background-color: #fae100;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  cursor: pointer;
`;
export const KakaoLogin = styled.img`
  height: 2.7rem;
  margin-top: 30px;
`;
export const NaverLogo = styled.div`
  background-image: url(${naver});
  background-size: contain;
  background-position: center;
  width: 30px;
  height: 30px;
`;
export const KakaoLogo = styled.div`
  background-image: url(${kakao});
  background-size: contain;
  background-position: center;
  width: 30px;
  height: 30px;
  margin-left: 0.4rem;
`;
export const NaverButton = styled.div`
  font-size: 0.9rem;
  color: white;
  margin-right: 0.3rem;
  text-align: center;
`;
export const KakaoButton = styled.div`
  font-size: 0.9rem;
  color: black;
  margin-right: 0.3rem;
  text-align: center;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 5rem;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  @media (max-width: 500px) {
    justify-content: center;
    height: 90%;
  }
`;
export const LogoBox = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoImg = styled.img`
  width: 140px;
  height: 50px;
  object-fit: cover;
  margin-top: 7px;
`;