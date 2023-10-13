import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-items: center;
  align-items: center;
`;
export const Body = styled.div`
  display: grid;
  width: 100%;
  height: 90%;
  gap: 10px;
  margin-top: 20px;
  height: auto;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  @media (max-width: 1080px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  @media (max-width: 785px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
`;
export const Item = styled.div`
  border-radius: 10px;
  width: 170px;
  height: 250px;
  padding: 5px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  background-color: rgba(189, 189, 189, 0.15);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
  &:hover {
    transform: translateY(-3px);
    background: #9dcedc;
  }
  @media (max-width: 1080px) {
    width: 140px;
    height: 230px;
  }
  @media (max-width: 550px) {
    width: 120px;
    height: 220px;
  }
`;
export const BookImage = styled.img`
  max-width: 80%;
  height: 65%;
  max-height: 65%;
  margin-top: 15px;
  border-radius: 10px;
  @media (max-width: 560px) {
    border-radius: 5px;
    width: 90px;
    height: 190px;
  }
`;
export const CardUnderLine = styled.div`
  width: 90%;
  height: 2px;
  background-color: #064469;
  margin: 10px 0;
`;
export const BookTitle = styled.div`
  font-weight: bold;
  font-size: 15px;
  color: #0f172a;
`;
export const BookAuthor = styled.div`
  color: gray;
  font-weight: bold;
  font-size: 13px;
`;
export const Bottom = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;
export const Pagination = styled.div`
  width: auto;
  display: flex;
`;
export const PageButton = styled.button`
  padding: 8px 16px;
  margin: 0 4px;
  background-color: #ffffff;
  border: 2px solid #018abe;
  color: #018abe;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #064469;
    color: #ffffff;
  }
  @media (max-width: 560px) {
    margin: 20px 0 80px 0;
  }
`;
export const NoResultsMessage = styled.div`
    text-align: center;
    padding: 20px;
    font-size: 20px;
    font-weight: 500;
    color: #555;
`;