// React Hooks
import React, { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

// Axios library for making HTTP requests
import axios from "axios"

// Toastify library for displaying alerts
import { toast } from "react-toastify"

// Components
import Title from "../../components/Title" // Render the main title
import Image from "../../components/LogoImage" // Render the logo image
import Button from "../../components/Button" // Render the main button
import ItemsContainer from "../../components/ItemsContainer" // Render the items container
import BackgroundVideo from "../../components/BackgroundVideo" // Render the background video

import * as C from "./style.js" // Styled-components styles
import items from "../../menu.js" // Menu items data

import Logo from "../../assets/burger_logo.png" // Logo image
import bgVideo from "../../assets/bg-video.mp4" // Background video

// Beginning of the Home component
const Home = () => {
  const navigate = useNavigate() // Hook for navigation between pages
  const location = useLocation() // Hook for getting the current location
  const videoRef = useRef(null) // Ref for the video playback rate
  const typedName = useRef() // Ref for the typed value in the name input
  const [order, setOrder] = useState([]) // State variable for storing the registering order
  const [orders, setOrders] = useState([]) // State variable for storing all registered orders
  const baseUrl = "https://api-burgers-register.vercel.app" // URL to access the Node.js server

  // Effect hook to dynamically update the page title based on the current location
  useEffect(() => {
    // Check if the current location is the home page
    if (location.pathname === "/") {
      // Update the page title to indicate that it's the registration page
      document.title = "Burgers Register - Cadastro"
    }
  }, [location.pathname])

  // Effect hook to control the playback rate of the background video
  useEffect(() => {
    // Check if the video ref exists and set the playback rate to 1.5x
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5
    }
  }, [])

  // Function to capitalize the first letter of each word in a string
  const capitalize = string => {
    return string
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  // Function to format a numeric value as BRL currency
  const formatPrice = value =>
    value.toLocaleString("pt-br", { style: "currency", currency: "BRL" })

  // Function to select items from the menu
  const selectItem = (category, event) => {
    // Extract the name and value of the selected item
    const itemName = event.target.name
    const selectedItem = event.target.value

    // Find the price of the selected item in the API data
    const price = Object.values(items[category][itemName]).find(
      item => item.desc === selectedItem
    ).price

    // Update the order state with the selected item and its price
    setOrder({ ...order, [category]: { item: selectedItem, price: price } })
  }

  // Function to register an order
  const createOrder = async () => {
    try {
      // Capitalize the name typed by the user
      const name = capitalize(typedName.current.value)

      // Check if the name is not empty
      if (name !== "") {
        // Create a string fot the ordered items
        const orderItems = `1 ${order[0].item}, 1 ${order[1].item}, 1 ${order[2].item}`

        // Calculate the total price of the order
        const totalPrice = order[0].price + order[1].price + order[2].price

        // Send a POST request to register a new order
        const { data } = await axios.post(`${baseUrl}/orders`, {
          order: orderItems.toLowerCase(),
          price: formatPrice(totalPrice),
          clientName: name,
        })

        // Show a success message from Toastify
        toast.success("Pedido realizado com sucesso!", { autoClose: 2000 })

        // Update the orders state with the registered order
        setOrders([...orders, data])

        // Clear the typed name input
        typedName.current.value = ""

        // Clear the order state
        setOrder([])

        // Clear radio inputs
        const radioInputs = document.querySelectorAll('input[type="radio"]')
        radioInputs.forEach(input => {
          input.checked = false
          const selectedLabel = input.closest("label")
          if (selectedLabel.classList.contains("red")) {
            selectedLabel.classList.remove("red")
          }
        })

        // Throw an error if the name is empty
      } else {
        throw new Error("Nome é obrigatório")
      }
      // Catch the error and show a message from Toastify
    } catch (err) {
      toast.error("Verifique os dados do pedido.", { autoClose: 2000 })
      // console.log(err)
    }
  }

  // Event handler to trigger order creation on Enter key press
  const isEnter = e => (e.key === "Enter" ? createOrder() : null)

  // Function to change color of selected item
  const changeColor = event => {
    const selectedInput = event.target
    const selectedLabel = selectedInput.parentElement.parentElement
    const allLabels = selectedInput
      .closest(".radio-box")
      .querySelectorAll("label")

    // Remove 'red' class from all labels
    allLabels.forEach(label => {
      label.classList.remove("red")
    })

    // Add 'red' class to the selected label
    if (selectedLabel) {
      selectedLabel.classList.add("red")
    }
  }

  // Rendering the Home component
  return (
    <>
      {/* Background video component */}
      <BackgroundVideo ref={videoRef} src={bgVideo} muted autoPlay />

      {/* Main container */}
      <C.MainContainer>
        <Image src={Logo} alt="Burger Logo" />

        {/* Items section */}
        <ItemsContainer>
          <Title>Faça seu pedido</Title>

          {/* Burger selection */}
          <C.TitleLabel>Escolha qual será o tipo do hambúrguer:</C.TitleLabel>
          <C.InputBox className="radio-box" onChange={e => selectItem(0, e)}>
            {Object.values(items[0].burger).map(i => (
              <C.Label key={i.name} htmlFor={i.name} title={i.desc}>
                <img src={i.img} alt={i.desc} />
                <div className="select">
                  <p>
                    {i.name} - {formatPrice(i.price)}
                  </p>
                  <input
                    type="radio"
                    name="burger"
                    id={i.name}
                    value={i.desc}
                    onChange={changeColor}
                  />
                </div>
              </C.Label>
            ))}
          </C.InputBox>

          {/* Follow-up selection */}
          <C.TitleLabel>Agora, escolha um acompanhamento:</C.TitleLabel>
          <C.InputBox className="radio-box" onChange={e => selectItem(1, e)}>
            {Object.values(items[1].followUp).map(i => (
              <C.Label key={i.name} htmlFor={i.name} title={i.desc}>
                <img src={i.img} alt={i.desc} />
                <div className="select">
                  <p>
                    {i.name} - {formatPrice(i.price)}
                  </p>
                  <input
                    type="radio"
                    name="followUp"
                    id={i.name}
                    value={i.desc}
                    onChange={changeColor}
                  />
                </div>
              </C.Label>
            ))}
          </C.InputBox>

          {/* Drink selection */}
          <C.TitleLabel>E por último, escolha a sua bebida:</C.TitleLabel>
          <C.InputBox className="radio-box" onChange={e => selectItem(2, e)}>
            {Object.values(items[2].drink).map(i => (
              <C.Label key={i.name} htmlFor={i.name} title={i.desc}>
                <img src={i.img} alt={i.desc} />
                <div className="select">
                  <p>
                    {i.name} - {formatPrice(i.price)}
                  </p>
                  <input
                    type="radio"
                    name="drink"
                    id={i.name}
                    value={i.desc}
                    onChange={changeColor}
                  />
                </div>
              </C.Label>
            ))}
          </C.InputBox>

          {/* Name input and order button */}
          <C.ButtonBox>
            <C.Input
              type="name"
              name="name"
              onKeyDown={isEnter}
              ref={typedName}
              placeholder="Digite seu nome"
            />
            <Button onClick={createOrder}>Fazer pedido</Button>
          </C.ButtonBox>

          {/* Link to all orders */}
          <C.OrdersLink onClick={() => navigate("/orders")}>
            <img
              width="16"
              height="16"
              src="https://img.icons8.com/ios/16/222222/purchase-order.png"
              alt="purchase-order"
            />{" "}
            Ver todos os pedidos
          </C.OrdersLink>
        </ItemsContainer>
      </C.MainContainer>
    </>
  )
}

export default Home // Export the Home component