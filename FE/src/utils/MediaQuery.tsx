import React, { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";

interface ChildrenProps {
  children: ReactNode;
}

const Mobile: React.FC<ChildrenProps> = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:700px)"
  });
  return <>{isMobile && children}</>;
};

const PC: React.FC<ChildrenProps> = ({ children }) => {
  const isPc = useMediaQuery({
    query: "(min-width:701px)"
  });
  return <>{isPc && children}</>;
};

export { Mobile, PC };