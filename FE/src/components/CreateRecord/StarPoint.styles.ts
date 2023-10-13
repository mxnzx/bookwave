import styled from "styled-components";

export const Container = styled.div`
`;
export const Top = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Bottom = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 1250px) {
    display: flex;
    justify-content: center; // 수평 방향(좌 우) 가운데 정렬
    align-items: center; // 수직 방향(위 아래) 가운데 정렬
  }
  @media (max-width: 500px) {
    display: none;
  }
`;
export const Bottom2 = styled.div`
  display: flex;
  justify-content: center; // 수평 방향(좌 우) 가운데 정렬
  align-items: center;
  @media (min-width: 500px) {
    display: none;
  }
`;
export const HeaderText = styled.div`
  color: darkgray;
  padding: 5px;
  font-size: 13px;
  padding-top: 0px;
`;
export const UnderLine = styled.div`
  border-bottom: 3px solid #000000;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 150px;
`;
