import styled, { keyframes } from "styled-components"

// Animation for the main container slides from bottom
const slideAnimation = keyframes`
  from {
    top: -720px;
  }

  to {
    top: 0;
  }
`

// Main container styles
export const MainContainer = styled.div`
  min-height: 100vh;
  position: absolute;
  right: 8vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  z-index: 1;

  animation: ${slideAnimation} 1s ease forwards; // Set animation

  @media (max-width: 1050px) {
    right: 0;
    width: 100%;
    margin: 0;
  }
`

// Orders list styles
export const List = styled.ul`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
`

// Editing name input styles
export const Input = styled.input`
  padding: 2px 5px;
  background: none;
  border: 1px solid #888888;
  outline: none;
  border-radius: 5px;

  &:focus {
    border: 1px solid #f21d2f;
  }
`
// Radio inputs box styles
export const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 5px auto 0;
  gap: 10px;
  flex-wrap: wrap;

  // Styling for the select box
  .select {
    display: flex;
    padding: 0 10px;
    align-items: center;
    gap: 4px;
  }
`

// Label for radio inputs styles
export const Label = styled.label`
  width: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  border: 1px solid #888;
  padding: 5px 0;
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
    width: 50px;
    border-radius: 10px;
  }

  @media (max-width: 600px) {
    width: 84px;
  }
`
// Order card styles
export const Order = styled.li`
  min-width: 300px;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  background: #ffffff88;
  border-radius: 10px;
  box-shadow: 1px 1px 4px #00000099;

  // Styling for the card table
  table {
    max-width: 460px;
    margin: 0 20px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    border-spacing: 0;

    .table-box {
      padding: 7px;
      border: 1px solid #111;
      border-bottom: none;
    }

    .name {
      border-radius: 7px 7px 0 0;
    }

    .total {
      border-bottom: 1px solid #111111;
      border-radius: 0 0 7px 7px;

      .price {
        opacity: 0.7;
        background: #ccc;
        cursor: not-allowed;
        border: 1px solid #999999;
      }
    }
  }

  // Styling fot the top section in the card
  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: #f21d2f;
    padding: 7px 5px 7px 7px;
    border-radius: 10px 10px 0 0;

    .card-title {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #ffffff;

      h4 {
        font-weight: 500;
      }
    }

    // Styling for the button sectionin the card
    .card-btns {
      display: flex;
      gap: 3px;

      img {
        cursor: pointer;
        transition: all ease 0.2s;

        &:hover {
          filter: invert(0.8);
        }

        &:active {
          opacity: 0.5;
        }
      }
    }
  }

  // Styling for buttons in the editing mode
  .edit-btns {
    display: flex;
    gap: 10px;
    margin-bottom: 18px;

    button {
      color: #ffffff;
      background: #f21d2f;
      border: none;
      padding: 7px 15px;
      border-radius: 5px;
      cursor: pointer;

      &:last-child {
        border: 1px solid #111111;
        color: #111111;
        background: none;
      }

      &:hover {
        opacity: 0.8;
      }

      &:active {
        opacity: 0.5;
      }
    }
  }
`