import React, { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";

interface ChildrenProps {
  children: ReactNode;
}


const Mobile: React.FC<ChildrenProps> = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 560px)"
  });
  return <>{isMobile && children}</>;
};

const PC: React.FC<ChildrenProps> = ({ children }) => {
  const isPc = useMediaQuery({
    query: "(min-width:561px)"
  });
  return <>{isPc && children}</>;
};


export { PC, Mobile };