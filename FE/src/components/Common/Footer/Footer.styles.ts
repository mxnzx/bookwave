import styled from "styled-components";

interface MenuProps {
    active: "true" | "false";
}
export const Footer = styled.footer`
    background-color: #FBFBFB;
    padding: 10px;
    display: flex;
    height: 60px;
    width: 100%;
    position: fixed;
    bottom: -1px;
    z-index: 1001;
    align-items: center;
    justify-content: space-around;

    @media (min-width:500px){
        display:none;
    }
`;

export const Menu = styled.div<MenuProps>`
    font-family: 'Pretendard';
    img{
        display:${props => props.active === "true" ? 'none' : 'initial'};
        height:35px;
    };
    span{
        display:${props => props.active === "true" ? 'initial' : 'none'};
        height:35px;
        color:#018ABE;
        font-weight:500;
        font-family: 'Pretendard-Regular';
    }
`;