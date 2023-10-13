import React, { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";

interface ChildrenProps {
  children: ReactNode;
}

// const Mobile: React.FC<ChildrenProps> = ({ children }) => {
//   const isPc = useMediaQuery({
//     query: "(max-width:500px)"
//   });
//   return <>{isPc && children}</>;
// };

const Tablet: React.FC<ChildrenProps> = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 740px)"
  });
  return <>{isMobile && children}</>;
};

const PC: React.FC<ChildrenProps> = ({ children }) => {
  const isPc = useMediaQuery({
    query: "(min-width:741px)"
  });
  return <>{isPc && children}</>;
};


export { PC, Tablet };