import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 50px; /* 내부 여백을 더 크게 설정 */
  border-radius: 10px;
  width: 80vw; /* 원하는 너비 설정 */
  height: 80vh; /* 원하는 높이 설정 */
`;
