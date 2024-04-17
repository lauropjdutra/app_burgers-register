import styled, { keyframes } from "styled-components"



const slideAnimation = keyframes`
  from {
    top: -720px;
  }

  to {
    top: 0;
  }
`

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

  animation: ${slideAnimation} 1s ease forwards;
  
  @media (max-width: 1050px) {
    right: 0;
    width: 100%;
    margin: 0;
  }
`

  export const List = styled.ul`
    /* background: beige; */
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
`

export const Title = styled.h1`
  font-weight: 500;
  font-size: 40px;

  @media (max-width: 600px) {
    font-size: 36px;
  }
`

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

  &.red {
    background: #f21d2f33;
    border: 1px solid #f21d2f;
  }

  img {
    padding: 0;
    width: 50px;
    border-radius: 10px;
  }

  @media (max-width: 600px) {
    width: 84px;
  }
`
export const InputBox  = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 5px auto 0;
    gap: 10px;
    flex-wrap: wrap;

    .select {
    display: flex;
    padding: 0 10px;
    align-items: center;
    gap: 4px;
  }
`

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
        opacity: .7;
        background: #ccc;
        cursor: not-allowed;
        border: 1px solid #999999;
      }
    }
  }

  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
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