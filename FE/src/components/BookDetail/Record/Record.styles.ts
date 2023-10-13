import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Container = styled.div`
  display: flex;
  width: 95%;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background-color: white;
  border-radius: 1rem;
  padding: 25px;
  margin-bottom: 80px;
`;
export const RecordWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
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
`;
export const PointTitle = styled.span`
  font-weight: 600;
`;
export const FeedWrap = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
export const FeedBox = styled.div`
  /* border: 1px solid #000; */
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 260px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  padding: 20px;
  border-radius: 1rem;
  background-color: rgb(247, 247, 247);
`;
export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
export const ProfileImg = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin-right: 10px;
`;
export const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;
export const Hr = styled.div`
  margin: 15px 0 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
`;
export const RecordContent = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
`;

export const StyledSlider = styled(Slider)`
  /* border: 1px solid #000; */
  width: 85%;
  .slick-slide > div > div {
    width: 100%;
    display: flex !important;
    flex-direction: column;
    align-items: center;
  }
  .slick-dots {
    position: static;
  }
  .slick-list {
    margin-top: 25px;
  }
  .slick-slide > div {
    margin: 0 10px;
  }

  .slick-list {
    margin: 0 -10px;
    height: 100%;
  }
  .slick-prev {
    z-index: 1;
    left: -40px;
  }

  .slick-next {
    right: -40px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 25px;
    opacity: 0.5;
    color: #a1a1a1;
  }

  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: -13px;

    li button:before {
      color: #acaaa9;
    }

    li.slick-active button:before {
      color: #353535;
    }
  }
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