import styled from "styled-components";
import DropIcon from "../../assets/icons/Drop.png";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ECF2F4;

`;
export const Left = styled.div`
  width: 100%;
  padding-top: 2vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Wrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: start;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
export const CategoryBox = styled.div`
  width: 95%;
  flex-wrap: wrap;
  display: flex;
  margin: 0 auto;
  @media (max-width: 560px) {
    justify-content: center;
  }
`;
export const Highlight = styled.span`
  color: #018abe;
  font-size: 30px;
  @media (max-width: 600px) {
    font-size: 20px;
  }
  @media (max-width: 400px) {
    font-size: 15px;
  }
`;
export const ResultBox = styled.div`
  height: 90%;
  width: 90%;
  display: flex;
  justify-content: center;
`;
export const Right = styled.div`
  width: 150px;
  display: flex;
  align-items: start;
  justify-content: center;
`;
export const DropBox = styled.div`
  width: 130px;
  display: flex;
  justify-content: center;
  @media (max-width: 900px) {
    margin-top: 10px;
  }
`;
export const DropdownContainer = styled.div`
  position: relative;
  width: 90%;
`;
export const DropdownHeader = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
  color: #8c8c8c;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  background-color: white;
`;
export const DropImage = styled.div`
  background-image: url(${DropIcon});
  margin-top: 4px; 
  margin-left: 1px;
  background-size: 100% 100%;
  width: 10px;
  height: 10px;
  @media (max-width: 800px) {
    margin-top: 4px;
  }
`;
export const DropdownList = styled.ul`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  position: absolute;
  margin-top: 10px;
  width: 100%;
  background-color: white;
  color: rgba(0, 0, 0, 0.7);
  font-size: 15px;
`;
export const DropdownItem = styled.li`
  padding: 15px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
export const GenreButton = styled.button<{ $isActive?: boolean }>`
  background-color: transparent;
  border: 1px solid ${props => props.theme.sideBarColor};
  border-radius: 18px;
  margin: 0 5px 5px 5px;
  width: 85px;
  height: 37px;
  font-size: 15px;
  font-weight: 500;
  color: ${props => (props.$isActive ? "white" : props.theme.pointColor)};
  background-color: ${props => (props.$isActive ? props.theme.pointColor : "white")};
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #018abe;
    color: white;
  }
`;
