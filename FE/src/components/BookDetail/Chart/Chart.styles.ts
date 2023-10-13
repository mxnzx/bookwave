import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 95%;
  /* min-height: 50vh; */
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background-color: white;
  border-radius: 1rem;
  margin: 20px;
  padding: 25px;
  @media (max-width: 1080px) {
    flex-direction: column;
  }
  @media (max-width: 500px) {
  }
`;
export const Hr = styled.div`
  margin: 15px 0 20px 0;
  border-bottom: 15px solid ${props => props.theme.bgColor};
  width: 100%;
`;

export const BBTIChartWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;
export const BBTIChartBox = styled.div`
  width: 100%;
  height: 100%;
  max-width: 450px;
  /* margin-bottom: 10px; */
`;
export const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #000000;
  & span {
    font-weight: 600;
    font-size: 20px;
    color: ${props => props.theme.pointColor};
  }
  @media (max-width: 500px) {
    font-size: 18px;
  }

  @media (max-width: 500px) {
  }
`;
export const PointTitle = styled.span`
  font-weight: 600;
`;
export const EmptyText = styled.span`
  font-size: 18px;
`;
export const EmptyIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 3px;
`;
export const EmptyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
`;
