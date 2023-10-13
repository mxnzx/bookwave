import styled from "styled-components";
import { motion } from "framer-motion";

interface ItemProps {
  active: "true" | "false";
}

export const Header = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 60px;
  top: 0;
  font-size: 18px;
  padding: 0 40px;
  z-index: 1000;
  @media (max-width: 500px) {
    padding: 0 20px;
  }
`;
export const Col = styled.div`
  display: flex;
  align-items: center;
`;
export const Nav = styled.nav`
  display: flex;
  align-items: center;
  /* width: 40%; */
  width: 30rem;
  justify-content: center;
`;
export const Items = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;

  @media (max-width: 500px) {
    display: none;
  }
`;

export const Item = styled.li<ItemProps>`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  color: ${props =>
    props.active === "true" ? props.theme.pointColor : "black"};
`;
export const LogoBox = styled.div`
  display: flex;
  align-items: center;
`;
export const Logo = styled.span`
  font-family: "Apple-H";
  font-size: 22px;
`;
export const LogoImg = styled.img`
  width: 140px;
  height: 50px;
  object-fit: cover;
  margin-top: 7px;
`;
export const ProfileImg = styled.img`
  border-radius: 50%;
  width: 45px;
  height: 45px;
  object-fit: cover;
  margin-right: 10px;
  position: relative;
  cursor: pointer;
`;
export const LogInBtn = styled.span`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
export const Dropdown = styled(motion.div)`
  position: absolute;
  right: 15px;
  top: 60px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 2000;
`;

export const DropdownItem = styled.div`
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 300;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;
