import styled from "styled-components";
import { motion } from 'framer-motion';

export const VideoBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const BackgroundVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: -1;
`;

export const VideoText = styled(motion.div)`
  position: absolute;
  left: 5%;
  font-weight: 900;
  font-size: 3.7rem;
  font-family: "Apple-H";
  color: white;
  z-index: 1;
  /* text-align: center; */

  &:nth-child(2) {
    top: calc(60% - 1em);
  }

  &:nth-child(3) {
    top: 60%;
  }

  &:nth-child(4) {
    top: calc(60% + 1em);
  }
`;