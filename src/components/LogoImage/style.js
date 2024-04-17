import styled from "styled-components"

export const Image = styled.img`
  width: 200px;
  margin-bottom: ${({ $bottommargin }) => $bottommargin ? "18px" : null};
`