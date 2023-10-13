import styled from "styled-components";
import UpdateIcon from "@/assets/icons/Update.png";
import UploadIcon from "@/assets/icons/Upload.png";
import RemoveIcon from "@/assets/icons/Remove.png";
import deleteIcon from "@/assets/icons/x.png";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const HeaderText = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #064469;
`;
export const UnderLine = styled.div`
  margin-top: 10px;
  border-bottom: 3px solid #000000;
  width: 100px;
`;
export const Main = styled.div`
  height: 200px;
  width: 100%;
  margin-top: 20px;
`;
export const Box = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const Alrt = styled.div`
  font-weight: bold;
  color: #63636b;
`;
export const ButtonUpload = styled.button`
  background-image: url(${UploadIcon});
  background-size: 100% 100%;
  background-color: transparent;
  width: 100px;
  height: 100px;
  margin-left: 175px;
  margin-top: 30px;
  @media (max-width: 1250px) {
    margin-left: 40vw;
  }
  @media (max-width: 700px) {
    margin-left: 35vw;
  }
  @media (max-width: 500px) {
    margin-left: 30vw;
  }
`;
export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 30px;
`;
export const ButtonUpdate = styled.button`
  background-image: url(${UpdateIcon});
  background-size: 100% 100%;
  width: 30px;
  height: 30px;
`;
export const ButtonRemove = styled.button`
  background-image: url(${RemoveIcon});
  background-size: 100% 100%;
  width: 30px;
  height: 30px;
`;
export const ImageItem = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ImageItemBox = styled.div`
  height: 200px;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.div`
    background-color: #E7E7E7;
    height: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    button{
      width: 40%;
      border: none;
      background-color: transparent;
      cursor: pointer;
      color: #7c7a7a;
    }
`;

export const updateBtn=styled.div`
  width: 100%;
  text-align: center;
  color: white;
  cursor: pointer;
    height: 33px;
    background-color: #0000008f;
    /* z-index: -100; */
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const deleteBtn = styled.div`
background-image: url(/src/assets/icons/x.png);
    height: 22px;
    width: 20px;
    position: absolute;
    top: 0px;
    right: 2px;
    background-size: 100% 100%;
    /* margin-right: 5px; */
    margin: 5px;
`;