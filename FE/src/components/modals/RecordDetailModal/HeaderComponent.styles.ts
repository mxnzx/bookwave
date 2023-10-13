import styled from "styled-components";

export const Header = styled.div`
  /* border: 1px solid #ccc; */
  font-family: "Pretendard-Regular";
  display: flex;
  justify-content: space-between; /* 좌우 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  height: 100%;
  padding: 0 50px;
  @media (max-width: 470px) {
    padding: 0 20px;
  }
`;

export const Image = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

export const NickName = styled.div`
  /* border: 1px solid #000; */
  flex: 1;
  margin-left: 15px;
  font-size: 20px;
  font-weight: 500;
  text-align: left;
  letter-spacing: -1px;
`;

export const Edit = styled.div`
  /* border: 1px solid #000; */
  /* font-family: "omyu_pretty"; */
  padding: 8px 20px;
  border-radius: 10px;
  font-size: 15px;
  /* background-color: #d6e7ee; */
  color: #06719a;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* &:hover {
    background-color: white;
    border: 1px solid #d6e7ee;
  } */
  @media (max-width: 470px) {
    padding: 0;
  }
`;

export const FollowText = styled(Edit)``;

export const BBTIText = styled(Edit)``;
