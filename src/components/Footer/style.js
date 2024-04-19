import styled from "styled-components";

export const CopyrightFooter = styled.footer`
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 30px;
  
  h5 {
    display: flex;
    gap: 7px;
  }

  h4, h5 {
    font-weight: 400;
    font-size: 0.9rem;

    @media (max-width: 720px) {
      font-size: 0.8rem;
    }
  }  
  
  a {
    font-weight: 600;
    text-decoration: none;
    color: #111;

    &:hover {
      color: #f21d2f;
    }

    &:active {
      opacity: .7;
    }
  }
`