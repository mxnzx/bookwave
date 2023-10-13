import styled from "styled-components";

export const Header = styled.div`
  border-radius: 20px;
  background-color: white;
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  height: 100%;
`;
export const Image = styled.img`
  border-radius: 50%;
  padding: 2px;
  margin-left: 10px; 
  width: 50px;
  height: 50px;
`;
export const NickName = styled.div`
  flex: 1;
  margin-left: 10px; 
  text-align: left; 
  font-size: 20px;
`;
export const Edit = styled.div`
  width: 100px;
  padding: 10px;
  border-radius: 20px;
  margin-right: 20px; /* 텍스트와 컨테이너 경계 간격을 설정 */
  text-align: center; 
  background-color: #d6e7ee;
  color: black;
  cursor: pointer;
  &:hover {
    background-color: white;
    border: 3px solid #d6e7ee;
  }
`;
