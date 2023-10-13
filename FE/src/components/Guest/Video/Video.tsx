import "@/assets/font/font.css";
import { useInView } from 'react-intersection-observer';
import wave1Video from "@/assets/videos/wave2.mp4";
import * as S from "./Video.styles";

const waveUp = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
    },
  }),
};
const Video = () => {
  const [textRef, inView] = useInView({
    threshold: 0.1,
  });

  return (
    <S.VideoBackground ref={textRef}>
      <S.BackgroundVideo playsInline autoPlay muted loop>
        <source src={wave1Video} type="video/mp4" />
      </S.BackgroundVideo>
      <S.VideoText
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={waveUp}
        custom={0} // delay factor
      >
        Just Dive
      </S.VideoText>
      <S.VideoText
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={waveUp}
        custom={1} // delay factor
      >
        Into
      </S.VideoText>
      <S.VideoText
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={waveUp}
        custom={2} // delay factor
      >
        BookWave
      </S.VideoText>
    </S.VideoBackground>
  );
};
export default Video;
