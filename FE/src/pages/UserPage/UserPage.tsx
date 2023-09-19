import { motion } from "framer-motion";
import styled from "styled-components";


export const LayOut = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
`;
  
const UserPage = () => {

  return (
    <LayOut>
      
    </LayOut>
  );
};
export default UserPage;
