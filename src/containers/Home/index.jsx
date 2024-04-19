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
  const [orders, setOrders] = useState([]) // State variable for storing all registered orders
  const baseUrl = "https://api-burgers-register.vercel.app" // URL to access the Node.js server

  // State variables for storing the selected items in each category
  const [burger, setBurger] = useState("")
  const [followUp, setFollowUp] = useState("")
  const [drink, setDrink] = useState("")

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
    const selectedItem = event.target.value

    // Update the corresponding state based on the category
    switch (category) {
      case 0:
        setBurger(selectedItem.toLowerCase())
        break
      case 1:
        setFollowUp(selectedItem.toLowerCase())
        break
      case 2:
        setDrink(selectedItem.toLowerCase())
        break
      default:
        break
    }
  }

  // Function to register an order
  const createOrder = async () => {
    try {
      // Capitalize the client name
      const name = capitalize(typedName.current.value)

      // Check if the name is not empty
      if (name === "") {
        throw new Error("Nome é obrigatório.")
      }

      // Check if an item is selected in each category
      if (!burger || !followUp || !drink) {
        let errorMessage = ""

        if (!burger && !followUp && !drink) {
          errorMessage = "um hambúrguer, um acompanhamento e uma bebida"
        } else {
          if (!burger) errorMessage += "um hambúrguer"
          if (!followUp) {
            if (errorMessage !== "") errorMessage += " e " // Add 'e' if previous item selected
            errorMessage += "um acompanhamento"
          }
          if (!drink) {
            if (errorMessage !== "") errorMessage += " e " // Add 'e' if previous item selected
            errorMessage += "uma bebida"
          }
        }
        
        throw new Error(`Escolha ${errorMessage}.`)
      }

      // Create a string for the ordered items
      const orderItems = `1 ${items[0].burger[burger].desc}, 1 ${items[1].followUp[followUp].desc}, 1 ${items[2].drink[drink].desc}`

      // Calculate the total price of the order
      const totalPrice =
        items[0].burger[burger].price +
        items[1].followUp[followUp].price +
        items[2].drink[drink].price

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

      // Clear the order states
      setBurger("")
      setFollowUp("")
      setDrink("")

      // Clear radio inputs
      const radioInputs = document.querySelectorAll('input[type="radio"]')
      radioInputs.forEach(input => {
        input.checked = false
        const selectedLabel = input.closest("label")
        if (selectedLabel.classList.contains("red")) {
          selectedLabel.classList.remove("red")
        }
      })

      // Catch the error and show a message from Toastify
    } catch (err) {
      toast.error(err.message, { autoClose: 2000 })
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
                    value={i.name}
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
                    value={i.name}
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
                    value={i.name}
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
