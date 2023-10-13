import { motion } from "framer-motion";
import Login from "../../components/modals/Login/Login"
import styled from "styled-components";

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
  
const LoginPage = () => {

  return (
    <LayOut>
      <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalAnimation}
          transition={{ duration: 0.5 }}
      >
      <Login />
    </motion.div>
    </LayOut>
  );
};
export default LoginPage;
