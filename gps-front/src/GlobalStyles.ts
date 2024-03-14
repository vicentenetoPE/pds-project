import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body, #root{
        min-height:100vh;
        margin:0;
        padding:0;
    }
    #root{
        @media (min-width: 600px) {
            display: grid;
            grid-template-rows: 1fr 12fr;
            grid-template-areas: 
            "nav"
            "page-body";
        }
    }

    header {
    grid-area: nav;
    }
`;

export const PageBody = styled.div`
  grid-area: page-body;
  padding:25px 50px;

`;
