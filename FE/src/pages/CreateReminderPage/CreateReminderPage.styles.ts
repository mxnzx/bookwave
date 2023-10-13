import styled from "styled-components";

export const Container = styled.div`
  background-color: #ecf2f4;
  margin-top: 60px;
  min-height: 840px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Body = styled.div`
  width: 700px;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 720px) {
    width: 80%;
  }
`;

export const HeaderText = styled.div`
  width: 100%;
  height: 80px;
  font-size: 35px;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DateText = styled.div`
  width: 100%;
  height: 80px;
  font-size: 25px;
  display: flex;
  align-items: center;
  font-weight: bold;
`;

export const Box = styled.div`
  width: 700px;
  height: 550px;
  display: flex;
  @media (max-width: 720px) {
    width: 100%;
  }
`;

export const BoxText = styled.div`
  width: 85%;
  border-radius: 20px;
  display: flex;
  align-items: center;
  background-color: ${props => props.color || "#F5DADC"};
  input[type="text"],
  textarea::placeholder {
    color: white;
    font-size: 20px;
  }
  textarea {
    background-color: transparent;
    width: 90%;
    height: 80%;
    margin-left: 30px;
    font-size: 20px;

    border: none;
    resize: none;
    color: white; /* 원하는 플레이스홀더 색상 지정 */
    &:focus {
      outline: none; // 입력 상자에 포커스될 때 나타나는 외곽선 제거
      border: none; // 입력 상자에 포커스될 때 나타나는 테두리 제거
    }
  }
  @media (max-width: 720px) {
    width: 100%;
  }
`;
export const BoxColor = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 720px) {
    display: none;
  }
`;
export const BoxColor2 = styled.div`
  width: 50%;
  height: 100%;
  display: flex;

  @media (min-width: 720px) {
    display: none;
  }
`;

export const Circle_1 = styled.div`
  width: 70%;
  height: 10%;
  border-radius: 50%;
  margin: 5px;
  background-color: #f5dadc;
  @media (max-width: 720px) {
    width: 10vw;
    height: 50px;
    border-radius: 50%;
    margin: 5px;
  }
`;
export const Circle_2 = styled.div`
  width: 70%;
  height: 10%;
  border-radius: 50%;
  background-color: #f9e6a7;
  margin: 5px;
  cursor: pointer;
  @media (max-width: 720px) {
    width: 10vw;
    height: 50px;
    border-radius: 50%;
    margin: 5px;
  }
`;
export const Circle_3 = styled.div`
  width: 70%;
  height: 10%;
  border-radius: 50%;
  background-color: #dabfe1;
  margin: 5px;
  cursor: pointer;
  @media (max-width: 720px) {
    width: 10vw;
    height: 50px;
    border-radius: 50%;
    margin: 5px;
  }
`;
export const Circle_4 = styled.div`
  width: 70%;
  height: 10%;
  border-radius: 50%;
  background-color: #ccebc7;
  margin: 5px;
  cursor: pointer;
  @media (max-width: 720px) {
    width: 10vw;
    height: 50px;
    border-radius: 50%;
    margin: 5px;
  }
`;
export const PageInput = styled.input.attrs({
  type: "number",
})`
  border: 1px solid #ccc;
  width: 6%;
  height: 50%;
  text-align: center;
  border-radius: 5px;
  margin-left: 1vw;
  margin-right: 0.5vw;
`;
export const Bottom = styled.div`
  width: 700px;
  height: 70px;
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  @media (max-width: 720px) {
    width: 100%;
    justify-content: space-between;
  }
`;
export const Button = styled.div`
  padding: 10px 20px;
  width: 100px;
  height: 40px;
  margin: 10px;
  margin-right: 15%;
  border-radius: 15px;
  border-style: solid;
  border-width: 2px;
  font-size: 15px;
  color: #018abe;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  border-color: #018abe;
  transition: transform 0.5s;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #018abe;
  }
  @media (max-width: 720px) {
    margin-right: 0;
  }
`;
