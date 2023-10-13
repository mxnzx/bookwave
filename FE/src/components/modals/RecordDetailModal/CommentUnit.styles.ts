import styled from "styled-components";

export const Container = styled.div`
  /* border: 1px solid #ccc; */
  font-family: "Pretendard-Regular";
  display: flex;
  justify-content: space-between; /* 좌우 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  width: 100%;
  height: 100%;
`;

export const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
  margin: 5px 20px;
`;

export const CommentBody = styled.div`
  /* border: 1px solid #ccc; */
  display: flex;
  flex-direction: column;
  width: 90%;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
`;

export const Box = styled.div`
  display: flex;
  align-items: baseline; 
  font-size: 15px;
`;

export const CommentAuthor = styled.span`
  font-weight: bold;
  margin-bottom: 4px;
`;



export const CommentDate = styled.span`
    font-size: 12px;
    color: #999;
    margin: 0px 0px 0px 9px;
`;

export const BoxButton = styled.button`
  background-color: transparent;
  /* font-weight: bold; */
  border: none;
  font-size: 12px;
  cursor: pointer;
  /* margin: 0 5px; */
`;

export const CommentText = styled.p`
  margin: 0;
  margin-top: 10px;
  font-size: 15px;
  color: #333;
`;