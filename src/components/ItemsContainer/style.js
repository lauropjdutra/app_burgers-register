import styled from "styled-components"

export const ItemsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${({ $bottomradius }) => $bottomradius ? "40px" : "10px"};
  background: linear-gradient(
    157.44deg,
    rgba(255, 255, 255, 0.9) 0.84%,
    rgba(255, 255, 255, 0.9) 0.85%,
    rgba(255, 255, 255, 0.7) 100%
  );
  width: 580px;
  min-height: calc(100vh - 235px);
  border-radius: ${({ $bottomradius }) => $bottomradius ? "0 0 32px 32px" : "32px 32px 0 0"};
  padding: 40px 15px;
  backdrop-filter: blur(20px);
  box-shadow: 0px 0px 15px #00000099;

  @media (max-width: 1050px) {
    width: 580px;
  }

  @media (max-width: 600px) {
    width: 410px;
  }

  @media (max-width: 430px) {
    width: 360px;
  }
`