import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const HeaderText = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #064469;
`;
export const UnderLine = styled.div`
  margin-top: 10px;
  border-bottom: 3px solid #000000;
  width: 65px;
`;
export const Box = styled.div`
  margin-top: 20px;
  width: 450px;
  height: 140px;
  display: flex;
  @media (max-width: 1250px) {
    margin-left: 20vw;
    width: 70%;
  }
  @media (max-width: 700px) {
    margin-left: 15vw;
  }
`;
export const LeftBox = styled.div`
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BookImageBox = styled.div`
  width: 80px;
  height: 120px;
`;
export const BookImage = styled.div<{ imageUrl: string }>`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: 100% 100%;
`;
export const RightBox = styled.div`
  width: 280px;
  height: 140px;
    /* height: 200px; */
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1250px) {
    width: 100%;
    margin-left: 20px;
  }
`;
export const Text = styled.div`
  width: 250px;
  @media (max-width: 1250px) {
    width: 100%;
  }
`;
export const TextMain = styled.h3`
  font-weight: bold;
  font-size: 17px;
  @media (max-width: 1250px) {
    font-size: 30px;
  }
  @media (max-width: 450px) {
    font-size: 20px;
  }
`;
export const TextSub = styled.p`
  font-size: 15px; 
  margin-top: 10px;
  @media (max-width: 1250px) {
    font-size: 20px;
  }
  @media (max-width: 450px) {
    font-size: 15px;
  }
`;
