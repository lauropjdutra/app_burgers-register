import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Rubik", sans-serif ;
  }

  ::-webkit-scrollbar {
    width: 0.4rem;
  }
    
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(0deg, #F2BB16 0%, #ffed1b 100%);
    border-radius: 0.5rem;
  }
    
  ::-webkit-scrollbar-track {
    background: #592418; 
  }

  html, body {
    height: 100%;
  }

  #root {
    height: 100%;
    overflow: hidden;
  }
`