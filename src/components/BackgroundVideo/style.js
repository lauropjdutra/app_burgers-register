import styled from "styled-components";

export const Video = styled.video `
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  transform: ${({ $rotate }) => $rotate ? "rotateY(180deg)" : null};
  
  @media (max-width: 1050px){
    object-fit: cover;
    object-position: right;
  }
`