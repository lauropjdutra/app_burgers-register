import styled, { keyframes } from "styled-components"

// Animation for the main container slides from bottom
const slideAnimation = keyframes`
  from {
    top: 720px;
  }

  to {
    top: 20px;
  }
`

// Main container styles
export const MainContainer = styled.div`
  width: 45vw;
  min-height: 100vh;
  margin-left: 5vw;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 1;

  animation: ${slideAnimation} 1s ease forwards; // set animation

  @media (max-width: 1050px) {
    width: 100%;
    margin: 0;
  }
`

// Radio inputs box styles 
export const InputBox  = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    gap: 10px;
    flex-wrap: wrap;

    // Styling for the select box
    .select {
    width: auto;
    display: flex;
    flex-direction: row;
    gap: 6px;
  }
`

// Label box title styles
export const TitleLabel = styled.p`
  margin-top: 30px;
  `

// Label for radio inputs styles
export const Label = styled.label`
  width: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  border: 1px solid #888;
  padding: 12px 0;
  border-radius: 10px;
  cursor: pointer;
  transition: ease 0.3s;

  &:hover {
    background: #ffffff;
  }

  &:active {
    opacity: 0.5;
  }
  
  // Red color styling when selected
  &.red {
    background: #f21d2f33;
    border: 1px solid #f21d2f;
  }

  // Styling for the item image within the label
  img {
    padding: 0;
    width: 100px;
    border-radius: 10px;
  }
  `

// Button box styles
export const ButtonBox = styled.div`
  margin-top: 35px;
  width: 100%;
  min-width: 360px;
  max-width: 580px;
  display: flex;
  flex-direction: row;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
`

// Name input styles
export const Input = styled.input`
  max-width: 230px;
  padding: 10px 15px;
  font-size: 17px;
  background: none;
  border: 2px solid #888888;
  outline: none;
  border-radius: 10px;

  &:focus {
    border: 2px solid #f21d2f;
  }
`

// Styling for the orders link
export const OrdersLink = styled.a`
  margin-top: 10px;
  color: #222222;
  display: flex;
  gap: 3px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 200;
  border-bottom: 0.7px solid #22222299;
  cursor: pointer;

  &:hover {
    opacity: .8;
  }

  &:active {
    opacity: .5;
  }
`