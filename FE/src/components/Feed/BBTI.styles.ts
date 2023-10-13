import styled from "styled-components";

export const BBTIContainer = styled.header`
  padding: 20px;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1080px) {
    background-color: #ecf2f4;
  }
`;
export const BBTIResult = styled.p`
  color: #018abe;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  @media (max-width: 1080px) {
    display: flex;
    justify-content: center; 
    align-items: center;
    margin-left: 0px;
  }
`;
export const BBTIHeader = styled.p`
  width: 100%;
  font-size: 15px;
  display: flex;
  justify-content: center; 
  align-items: center;
`;
export const HighlightedText = styled.text`
  color: #018abe;
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
`;
export const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  .user-profile-container {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;
export const UserItem = styled.div`
  display: flex;
  width: 50px;
  flex-direction: column;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  p {
    padding-top: 10px;
    font-size: 13px;
    height: 40px;
  }
`;
export const SearchBox = styled.div`
  border: 1px solid #018abe;
  width: 350px;
  height: 45px;
  margin: 10px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  input[type="text"] {
    padding: 5px;
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
  }
  input[type="text"]::placeholder {
    color: #018abe;
  }
`;
export const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-right: 10px;
`;
export const SearchButton = styled.button`
  border-radius: 5px;
  width: 70px;
  padding: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
export const GoToBBTIButton = styled.button`
  display: block;
  width: 80%;
  padding: 10px 10px;
  background-color: #018abe;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  text-align: center;
  transition: background-color 0.3s;
  cursor: pointer;
  &:hover {
    border: 1px solid #018abe;
    color: #018abe;
    background-color: #ffffff;
  }
  @media (max-width: 1080px) {
    width: 300px;
  }
`;
export const NoResultMessage = styled.div`
  color: #018abe;
  text-align: center;
  margin: 20px 0;
  font-size: 16px;
`;
