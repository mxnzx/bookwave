import styled from "styled-components";
import CarouselLeft from "../../../assets/icons/CarouselLeft.png";
import CarouselRight from "../../../assets/icons/CarouselRight.png";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
export const Container = styled.div`
  background: #ecf2f4;
  padding: 30px 45px;
  border-radius: 20px;
  width: 850px;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 850px) {
    width: 90%;
  }
`;
export const Header = styled.div`
  display: flex;
`;
export const HeaderText = styled.div`
  color: #064469;
  font-weight: bold;
  font-size: 25px;
`;
export const UnderLine = styled.div`
  margin: 5px 0;
  border-bottom: 3px solid #63636b;
`;
export const SubText = styled.div`
  color: #7b7373;
  font-size: 15px;
`;
export const CloseButton = styled.button`
  border: 2px solid #064469;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 15px;
  height: 10px;
  margin-left: auto;
  margin-top: 10px;
  color: #064469;
  cursor: pointer;
  &:hover {
    color: white; /* 마우스를 올렸을 때의 글자색 */
    background-color: #064469; /* 마우스를 올렸을 때의 배경색 */
  }
`;
export const Box = styled.div`
  text-align: center;
  padding-top: 20px;
`;
export const SelectHeader = styled.h2`
  border-radius: 5px;
  width: fit-content;
  text-align: left;
  background-color: #d6e7ee;
  font-size: 15px;
  color: #064469;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 5px 30px;
`;
export const CarouselBox = styled.div`
  height: 200px;
  padding: 10px;
  width: 100%;
`;
export const AlartBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 30px;
  display: flex;
  justify-content: center; // 수평 방향(좌 우) 가운데 정렬
  align-items: center; // 수직 방향(위 아래) 가운데 정렬
  @media (max-width: 470px) {
    font-size: 25px;
  }
  @media (max-width: 400px) {
    font-size: 20px;
  }
`;
export const CarouselItem = styled.div`
  border: 1px solid #064469;
  border-radius: 5px;
  width: 120px;
  height: 170px;
  margin-top: 3px;
  padding: 5px;
  background: transparent;
  box-shadow: 10px 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-3px);
    background: #9dcedc;
  }
  @media (max-width: 850px) {
    width: 100px;
  }
`;
export const ImageBox = styled.div`
  border-radius: 10px;
  width: 65px;
  height: 90px;
`;
export const BookImage = styled.img`
  border-radius: 10px;
  height: 90px;
`;
export const CardUnderLine = styled.div`
  width: 80px;
  height: 2px;
  background-color: #064469;
  margin: 10px 0;
`;
export const BookTitle = styled.div`
  font-weight: bold;
  font-size: 12px;
`;
export const BookAuthor = styled.div`
  font-size: 8px;
`;
type CarouselButtonProps = {
  direction: "left" | "right";
};
export const CarouselButton = styled.button<CarouselButtonProps>`
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  background-image: url(${props =>
    props.direction === "left" ? CarouselLeft : CarouselRight});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;
