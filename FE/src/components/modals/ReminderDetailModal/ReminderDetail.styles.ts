import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Container = styled.div`
  padding: 30px;
  border-radius: 10px;
  width: 58rem;
  height: 40rem;
  display: flex;
  flex-direction: column;
  background: white;

  *::-webkit-scrollbar {
    width: 0.5em;
  }
  *::-webkit-scrollbar-track {
    background: transparent;
  }
  *::-webkit-scrollbar-thumb {
    background-color: transparent;
    outline: none;
  }
  * {
    scrollbar-width: none;
  }
  @media (max-width: 1000px) {
    width: 80%;
  }
`;

export const Box = styled.div`
  /* border: 1px solid #000; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const Header = styled.div`
  /* border: 1px solid #000; */
  display: flex;
  justify-content: flex-end;
  height: 10%;
  width: 100%;
`;
export const ContentContainer = styled.div`
  /* border: 1px solid #000; */
  display: flex;
  height: 90%;
  width: 100%;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;
export const LeftContent = styled.div<{ background: string }>`
  background: ${props => props.background};
  /* border: 1px solid black; */
  height: 100%;
  width: 60%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
export const Reminder = styled.div`
  /* border: 1px solid blue; */
  height: 90%;
  width: 90%;
`;
export const ReminderTop = styled.div`
  /* border: 1px solid green; */
  height: 10%;
  text-align: left;
  font-size: 25px;
  color: #064469;
  @media (max-width: 1000px) {
    font-size: 20px;
  }
`;
export const ReminderMid = styled.div`
  /* border: 1px solid red; */
  height: 90%;
  text-align: center;
  font-size: 20px;
  overflow-y: auto;
  margin: 20px 0;
  @media (max-width: 1000px) {
    margin-top: 30px;
  }
  @media (max-width: 700px) {
    font-size: 18px;
  }
  
`;

export const RightContent = styled.div`
  /* border: 1px solid #000; */
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1000px) {
    width: 100%;
    height: 50%;
    margin-top: 10px;
  }
`;

export const Book = styled.div`
  /* border: 1px solid red; */
  height: 80%;
  width: 80%;
  border-radius: 15px;
  background-color: rgba(189, 189, 189, 0.15);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 1000px) {
    width: 100%;
    height: 100%;
  }
`;

export const UpdateButton = styled.div`
  /* border: 1px solid #000; */
  height: 50%;
  font-size: 20px;
  margin-right: 3%;
  font-weight: 500;

  color: ${props => props.theme.mainColor};
  cursor: pointer;
`;

export const DeleteButton = styled.div`
  /* border: 1px solid #000; */
  height: 50%;
  font-size: 20px;
  color: ${props => props.theme.mainColor};
  cursor: pointer;
`;
