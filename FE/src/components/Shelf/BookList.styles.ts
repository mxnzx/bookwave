import styled from "styled-components";
import CarouselLeft from "../../assets/icons/CarouselLeft.png";
import CarouselRight from "../../assets/icons/CarouselRight.png";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 2vh 10vw;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: #ecf2f4;
`;
export const Title = styled.div`
  width: 100%;
  height: 30%;
`;
export const HeaderText = styled.div`
  display: inline-block;
  font-weight: bold;
  color: black;
  margin-top: 2vh;
  font-size: 2rem;
`;
export const UnderLine = styled.div`
  border-bottom: 6px solid #06719a;
  width: 12vw;
`;
export const List = styled.div`
  width: 100%;
  height: 60%;
`;
export const bottom = styled.div`
  border-radius: 5px;
  width: 100%;
  height: 10%;
  background-color: #64646f;
`;
type CarouselButtonProps = {
  direction: "left" | "right";
};
export const CarouselButton: StyledComponent<
  "button",
  any,
  CarouselButtonProps,
  never
> = styled.button<CarouselButtonProps>`
  background: transparent;
  border: none;
  width: 50px;
  height: 50px;
  background-image: url(${props =>props.direction === "left" ? CarouselLeft : CarouselRight});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;
export const CarouselItem = styled.div`
  width: 50%;
  height: 90%;
  margin-top: 10px;
  padding: 10px; 
  border-radius: 10px; 
  transition: transform 0.2s;
  cursor: pointer;
  &:hover {
    transform: translateY(-10px);
    background-color: rgba(157, 206, 220, 0.5);
  }
`;
export const BookImage = styled.img`
  width: 99%; 
  height: 100%;
  border-radius: 8px; 
`;
