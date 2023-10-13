import styled from "styled-components";
import SearchIconImage from "../../assets/icons/search.png"; // 경로는 실제 프로젝트 구조에 맞게 조절해야 합니다.

export const Container = styled.div`
  width: 100%;
  height: 100%;
  /* padding: 0 5vw; */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ecf2f4;
`;
export const Wrapper = styled.div`
  width: 93%;
  max-width: 1300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Header = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  height: 20vh;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
`;

export const HeaderTitle = styled.div`
  /* border: 1px solid red; */
  font-family: "Pretendard-Regular";
  /* width: 100%; */
  height: 80%;
  /* padding-left: 4vw; */
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 35px;
  font-weight: bold;
  color: ${props => props.theme.mainColor};
`;

export const HeaderSub = styled.div`
  font-family: "Pretendard-Regular";
  width: 100%;
  height: 20%;
  /* padding-left: 4vw; */
  font-size: 20px;
  font-weight: bold;
  color: #8c8c8c;
  display: flex;
  justify-content: center;
  @media (max-width: 380px) {
    font-size: 25px;
  }
`;

export const Search = styled.div`
  /* border: 1px solid red; */
  width: 70%;
  /* max-width: 750px; */
  height: 100px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: center;
`;

export const InputBox = styled.div`
  /* border: 1px solid red; */
  height: 45px;
  width: 80%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 2px solid ${props => props.theme.pointColor};
  /* box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); */
`;

export const InputBorder = styled.div`
  /* border: 1px solid red; */
  width: 95%;
  height: 33px;
  padding-left: 1vw;
  display: flex;
  align-items: center;
`;

export const SearchIcon = styled.div`
  /* border: 1px solid red; */
  width: 30px;
  height: 30px;
  object-fit: cover;
  background-image: url(${SearchIconImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: white;
`;

export const InputText = styled.input`
  font-family: "Pretendard-Regular";
  border-radius: 10px;
  width: 95%;
  height: 100%;
  padding: 0 1vw;
  font-size: 18px;
  border: none;
  &::placeholder {
    /* border: 1px solid blue; */
    padding-right: 10px;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 660px) {
    font-size: 20px;
  }
  @media (max-width: 560px) {
    font-size: 15px;
  }
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const ButtonBox = styled.div`
  /* border: 1px solid red; */
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  margin-left: 10px;
  @media (max-width: 560px) {
    display: none;
  }
  @media (max-width: 480px) {
    margin-left: 0;
  }
`;

export const Button = styled.button`
  font-family: "Pretendard-Regular";
  border-radius: 20px;
  width: 90%;
  height: 40px;

  background-color: #064469;
  color: white;
  font-size: 18px;

  &:hover {
    background-color: white; // 호버 시 배경색을 흰색으로
    color: #064469; // 호버 시 글자색을 #064469로
    border: 5px solid #064469; // 호버 시 테두리 색을 흰색으로
  }
`;

export const Body = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  min-height: 60vh;
  /* height: 100%; */
  
`;
