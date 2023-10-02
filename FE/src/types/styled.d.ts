import "styled-components";

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
  bgColor: string;
  sideBarColor : string;
  pointColor: string;
  mainColor: string;
  subColor: string;
  beigeColor: string;
  }
}