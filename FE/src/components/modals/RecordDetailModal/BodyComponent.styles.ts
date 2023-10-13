import styled from "styled-components";

export const Container = styled.div`
  margin-top: 10px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 50px;
  position: relative;
`;

export const Title = styled.div`
  font-weight: bold;
  /* width: 100%; */
  /* margin: 16px; */
  /* margin: 15px 0; */
  padding: 0px 10px 0px 10px;
  font-size: 22px;
  display: flex;
  justify-content: center;
  position: absolute;
  letter-spacing: -1.5px;
  top: 0px;
  background-color: white;
  color: #064469;
`;

export const DashedLine = styled.span`
  font-weight: lighter;
  padding: 0 20px;
`;

export const Line = styled.span`
  width: 2px;
  background-color: black;
  margin: 0 1vw;
  flex-grow: 1;
`;

export const Top = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;
`;

export const Period = styled.p`
  border: 1px solid #000;
  font-size: 10px;
  margin-bottom: 5px;
`;

export const BoldText = styled.span`
  font-weight: bold;
  font-size: 12px;
`;

export const TopBox = styled.div`
  width: 150px;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
`;

export const Text = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const TextRight = styled.div`
  font-size: 20px;
  text-align: right;
`;

export const StarIcon = styled.img`
  width: 13px;
  height: 13px;
  margin-right: 5px;
`;

export const Main = styled.div`
  margin: 0px 29px 10px 29px;
  margin-top: 0px;
  padding: 30px;
  font-size: 15px;
  white-space: pre-line;
  background-color: #ecf2f4;
  border-radius: 9px;
  letter-spacing: -1px;
  width: 88%;
  @media (max-width: 720px) {
    width: 500px;
  }
  @media (max-width: 620px) {
    width: 400px;
  }
  @media (max-width: 470px) {
    width: 300px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const BookInfoWrap = styled.div`
  display: grid;
  width: 100%;
  height: 90px;
  grid-template-columns: repeat(2, 2fr);
  background-color: white;
  border-radius: 10px;
`;
export const BookContainer = styled.div`
  display: flex;
  width: 100%;
`;
export const BookInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
`;
export const BookInfoTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 3px;
  color: ${props => props.theme.mainColor};
  span {
    padding-left: 11px;
    color: black;
    font-weight: 100;
  }
`;
export const BookInfoContent = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: black;
`;
export const Hr = styled.hr`
  width: 88%;
  border: 0;
  /* height: 10px; */
  height: 3px;
  background-color: darkgray;
`;
export const InfoContainer = styled.div`
  margin: 11px;
  width: 88%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
