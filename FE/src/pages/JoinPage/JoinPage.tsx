import { useState } from "react";
import { motion } from "framer-motion";
import NickNameSurvey from "../../components/Join/NickNameSurvey/NickNameSurvey";
import GenreSurvey from "../../components/Join/GenreSurvey/GenreSurvey";
import SignUpComplete from "../../components/Join/SignUpComplete/SignupComplete";
import styled from "styled-components";

type ActiveModalType = "nickName" | "genre" | "signUpComplete";

const modalAnimation = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -60 },
};
export const LayOut = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
`;

const JoinPage = () => {
  const [activeModal, setActiveModal] = useState<ActiveModalType>("nickName");

  const handleNickNameConfirm = () => {
    setActiveModal("genre");
  };

  const handleGenreConfirm = () => {
    setActiveModal("signUpComplete");
  };

  return (
    <LayOut>
      {activeModal === "nickName" && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalAnimation}
          transition={{ duration: 0.5 }}
        >
          <NickNameSurvey onConfirm={handleNickNameConfirm} />
        </motion.div>
      )}

      {activeModal === "genre" && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalAnimation}
          transition={{ duration: 0.5 }}
        >
          <GenreSurvey onConfirm={handleGenreConfirm} />
        </motion.div>
      )}

      {activeModal === "signUpComplete" && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalAnimation}
          transition={{ duration: 0.5 }}
        >
          <SignUpComplete />
        </motion.div>
      )}
    </LayOut>
  );
};
export default JoinPage;
