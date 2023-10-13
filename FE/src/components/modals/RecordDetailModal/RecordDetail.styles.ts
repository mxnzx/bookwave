import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  /* cursor: pointer; */
`;

export const Container = styled.div`
  /* border: 1px solid #000; */
  background: #ffffff;
  /* padding: 10px 20px; */
  border-radius: 10px;
  width: 610px;
  height: 90vh;
  /* max-height: 75vh; */
  display: flex;
  align-items: center; // 수직 방향(위 아래) 가운데 정렬
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 720px) {
    max-height: 80vh;
  }

  @media (max-width: 470px) {
    /* max-height: 100vh;  */
    width: 360px;
    height: 600px;
  }

  /* Webkit 기반 브라우저에 대한 스크롤바 숨기기 */
  *::-webkit-scrollbar {
    width: 0.5em;
  }
  *::-webkit-scrollbar-track {
    background: transparent;
  }
  *::-webkit-scrollbar-thumb {
    background-color: transparent;
    outline: none;
  }
  /* Firefox에 대한 스크롤바 숨기기 */
  * {
    scrollbar-width: none;
  }
`;

export const Header = styled.div`
  width: 100%;
  background-color: #ecf2f4;
  padding: 12px 0px;
`;

export const Book = styled.div`
  /* border: 1px solid #ccc; */
  width: 100%;
  height: 400px;
`;

export const Body = styled.div`
  /* border: 1px solid #ccc; */
  width: 100%;
`;

export const Comment = styled.div`
  /* border: 1px solid #ccc; */
  width: 100%;
  max-height: 40%;
`;
