import styled from "styled-components"

export const Button = styled.button`
  width: 230px;
  margin-bottom: 5px;
  padding: 15px 20px;
  font-size: 17px;
  background: #f21d2f;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;

  &:hover {
    background: #730e20;
  }

  &:active {
    opacity: 0.5;
  }
`