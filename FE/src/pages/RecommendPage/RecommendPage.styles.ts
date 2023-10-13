import styled from "styled-components";

//다 감싸는 main
export const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    background-color: #D6E7EE;
    font-family:'Pretendard-Regular';
`;

//side bar
export const SideBar = styled.div`
    width: 230px;
    margin: 100px -2% 3% 3%;
    height: 650px;
    border-radius: 1em;
    font-family: 'Pretendard-Regular';
    position: sticky;
    top: 100px;

    @media (max-width:1024px){
        margin: 100px 0% 3% 3%;
    }

    /* 화면 폭이 768px 이하일 때 */
    @media (max-width: 864px) {
        display:none;
    }
`;

//side bar base line
export const VerticalLine = styled.div`
    position: relative;
    left: 50px;
    top: 15px;
    height: 60%;
    width: 2px;
    background-color: #06446969;
    border-radius: 4px;
`;

export const CursorContainer = styled.div`

    display: flex;
    flex-direction: column;
    position: absolute;
    top: -10%;
    width: 100%;
    height: 84%;
    justify-content: space-evenly;
    align-items: center;

`;

export const CursorInfo = styled.div<{$isHighlighted:boolean;}>`

    position:relative;
    display: flex;
    flex-direction: row;
    width: 80%;
    align-items: center;
    justify-content:center;
    height: 10%;
    border-radius: 1rem;
    color: ${(props)=>(props.$isHighlighted ? '#D6E7EE':'black')};
    /* background-color: cadetblue; */
    background-color: ${(props)=>(props.$isHighlighted ? '#06719A':'transparent')};
`;

export const CategoryName = styled.div`
    /* position: absolute; */
    /* left:8vh; */
    font-size: 1.5rem;
    position: absolute;
    left: 30%;
`;

export const Circle = styled.div<{$isHighlighted:boolean;}>`
    /* D6E7EE */
    background-color: ${(props)=>(props.$isHighlighted ? '#D6E7EE':'#06719A')};
    border-radius: 50%;
    height: 20px;
    width: 20px;
    position: absolute;
    left:10%;
    margin-right: 1vh;
`;

//오른쪽 4개 div로 나뉨
export const RightContainer = styled.div`
    display: flex;
    margin-top:100px;
    flex-direction: column;
    flex-grow: 1;
    font-family:'Pretendard-Regular';
    align-items: center;
`;