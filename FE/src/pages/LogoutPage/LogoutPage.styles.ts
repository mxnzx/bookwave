import { CSSProperties } from "react";

export const Header: CSSProperties = {
  width: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
  display: "grid",
  placeItems: "center" // 수직 및 수평 가운데 정렬
};