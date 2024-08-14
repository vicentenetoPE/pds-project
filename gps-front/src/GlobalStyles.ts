import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body, #root{
        min-height:100vh;
        margin:0;
        padding:0;
        background-color:#f2f2f2;
    }


    header {
    height:fit-content;
    }
`;

export const PageBody = styled.div`
  grid-area: page-body;
  padding:25px 50px;
  display:flex;
  flex-direction:column;

`;
