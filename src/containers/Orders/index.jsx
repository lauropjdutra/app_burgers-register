// React Hooks
import React, { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"

// Axios library for making HTTP requests
import axios from "axios"

// Toastify library for displaying alerts
import { toast } from "react-toastify"

// React library for displaying a confirmation alert
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"

// Components
import Title from "../../components/Title" // Render the main title
import Image from "../../components/LogoImage" // Render the logo image
import Button from "../../components/Button" // Render the main button
import ItemsContainer from "../../components/ItemsContainer" // Render the items container
import BackgroundVideo from "../../components/BackgroundVideo" // Render the background video

import * as C from "./style.js" // Styled-components styles
import "../../styles/confirmAlert.css" // External CSS for the alert styles
import items from "../../menu.js" // Menu items data

import Logo from "../../assets/burger_logo.png" // Logo image
import bgVideo from "../../assets/bg2-video.mp4" // 2nd background video

// Beginning of the Orders component
const Orders = () => {
  const navigate = useNavigate() // Hook for navigation between pages
  const location = useLocation() // Hook for getting the current location
  const videoRef = useRef(null) // Ref for the video playback rate
  const [order, setOrder] = useState([]) // State variable for storing the registering order
  const [orders, setOrders] = useState([]) // State variable for storing all registered orders
  const baseUrl = "https://api-burgers-register.vercel.app" // URL to access the Node.js server

  const [editingOrderId, setEditingOrderId] = useState(null) // State variable for tracking the editing order ID
  const [editedClientName, setEditedClientName] = useState("") // State variable for the edited client name
  const [editedOrder, setEditedOrder] = useState("") // State variable for the edited order details

  // Effect hook to dynamically update the page title based on the current location
  useEffect(() => {
    // Check if the current location is the orders page
    if (location.pathname === "/orders") {
      // Update the page title to indicate that it's the orders page
      document.title = "Burgers Register - Pedidos"
    }
  }, [location.pathname])

  // Effect hook to control the playback rate of the background video
  useEffect(() => {
    // Check if the video ref exists and set the playback rate to 1.5x
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5
    }
  }, [])

  // Effect hook to fetch orders data from the server
  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get(`${baseUrl}/orders`) // Fetch orders data from the server
      setOrders(data) // Update orders state with fetched data
    }
    fetchOrders() // Call the fetchOrders function
  }, [])

  // Function to capitalize the first letter of each word in a string
  const capitalize = string => {
    return string
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, char => char.toUpperCase())
  }

  // Function to format a numeric value as BRL currency
  const formatPrice = value =>
    value.toLocaleString("pt-br", { style: "currency", currency: "BRL" })

  // Function to select items from the menu
  const selectItem = (category, event) => {
    const item = event.target.name // Get the name of the selected item
    const selectedItem = event.target.value // Get the value of the selected item
    const price = Object.values(items[category][item]).find(
      item => item.desc === selectedItem
    ).price // Find the price of the selected item
    setOrder(prevState => ({
      // Update the order state with the selected item
      ...prevState,
      [category]: { item: selectedItem, price: price },
    }))
  }

  // Function to change the color of the selected item
  const changeColor = event => {
    const selectedInput = event.target // Get the selected input element
    const selectedLabel = selectedInput.parentElement.parentElement // Get the parent label element
    const allLabels = selectedInput
      .closest(".radio-box")
      .querySelectorAll("label") // Get all label elements within the radio box

    // Remove the "red" class from all labels
    allLabels.forEach(label => {
      label.classList.remove("red")
    })

    // Add the "red" class to the selected label
    if (selectedLabel) {
      selectedLabel.classList.add("red")
    }
  }

  // Function to edit an order
  const editOrder = (id, clientName, order) => {
    setEditingOrderId(id) // Set the editing order ID
    setEditedClientName(clientName) // Set the edited client name
    setEditedOrder(order) // Set the edited order details
  }

  // Function to clear the edit mode
  const clearEdit = () => {
    setEditedClientName("") // Clear the edited client name
    setEditedOrder("") // Clear the edited order details
    setEditingOrderId(null) // Clear the editing order ID
  }

  // Function to update an order
  const updateOrder = async id => {
    try {
      const orderItems = `1 ${order[0].item}, 1 ${order[1].item}, 1 ${order[2].item}` // Concatenate order items
      const totalPrice = order[0].price + order[1].price + order[2].price // Calculate total price
      const updatedOrder = {
        clientName: capitalize(editedClientName), // Capitalize client name
        order: orderItems.toLowerCase(), // Format order details
        price: formatPrice(totalPrice), // Format total price
      }
      const { data } = await axios.put(`${baseUrl}/orders/${id}`, updatedOrder) // Update order data on the server
      setOrders(data) // Update orders state with updated data
      clearEdit() // Clear edit mode
      toast.success("Pedido atualizado com sucesso!", { autoClose: 2000 }) // Show success message
    } catch (error) {
      console.error("Erro ao atualizar o pedido:", error) // Log error message
      toast.error("Erro ao atualizar o pedido. Por favor, tente novamente.", {
        // Show error message
        autoClose: 2000,
      })
    }
  }

  // Function to delete an order
  const deleteOrder = async id => {
    // Function to handle pressing Enter key in confirmation alert
    const isEnter = e => {
      if (e.key === "Enter") {
        const button = document.querySelector(
          ".react-confirm-alert-button-group button:first-child"
        )
        if (button) {
          button.click()
        }
      }
    }

    // Show confirmation alert
    confirmAlert({
      message: "Tem certeza que deseja excluir este pedido?", // Confirmation message
      buttons: [
        {
          label: "Sim", // Button for confirming deletion
          onClick: async () => {
            // Delete the order from the server
            const { data } = await axios.delete(`${baseUrl}/orders/${id}`)
            // Update orders state with updated data
            setOrders(data)
            // Show success message
            toast.success("Pedido excluído com sucesso!", { autoClose: 2000 })
          },
        },
        {
          label: "Cancelar", // Button for canceling deletion
          onClick: () => {},
        },
      ],
    })

    // Add event listener for Enter key
    document.addEventListener("keydown", isEnter)

    // Add event listener to close alert on overlay click
    const overlay = document.querySelector(".react-confirm-alert-overlay")
    if (overlay) {
      overlay.addEventListener("click", () => {
        const button = document.querySelector(
          ".react-confirm-alert-button-group button:last-child"
        )
        if (button) {
          button.click()
        }
      })
    }
  }

  // Rendering the Order component
  return (
    <>
      {/* Background video component */}
      <BackgroundVideo
        ref={videoRef}
        $rotate="true"
        src={bgVideo}
        muted
        autoPlay
      />

      {/* Main container */}
      <C.MainContainer>
        {/* Items section */}
        <ItemsContainer $bottomradius="true">
          <Title>Todos os pedidos</Title>

          {/* List container */}
          <C.List>
            {/* Conditionally render each order */}
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <C.Order key={item.id}>
                  {/* Top section of the order card */}
                  <div className="card-top">
                    <div className="card-title">
                      <img
                        width="27"
                        height="27"
                        src="https://img.icons8.com/ios/27/ffffff/purchase-order.png"
                        alt="purchase-order"
                      />
                      <h4>Pedido {index + 1}</h4>
                    </div>
                    <div className="card-btns">
                      <img
                        width="22"
                        height="22"
                        src="https://img.icons8.com/ios-glyphs/22/ffffff/pencil--v1.png"
                        alt="pencil--v1"
                        onClick={() =>
                          editOrder(item.id, item.clientName, item.order)
                        }
                      />
                      <img
                        width="22"
                        height="22"
                        src="https://img.icons8.com/ios-glyphs/22/ffffff/trash--v1.png"
                        alt="trash--v1"
                        onClick={() => deleteOrder(item.id)}
                      />
                    </div>
                  </div>

                  {/* Main section of the order card */}
                  <table>
                    <tbody>
                      {/* Client name */}
                      <tr>
                        <td className="table-box name">
                          <strong>Cliente: </strong>
                          {/* Editable client name field */}
                          {editingOrderId === item.id ? (
                            <C.Input
                              type="text"
                              value={editedClientName}
                              onChange={e =>
                                setEditedClientName(e.target.value)
                              }
                            />
                          ) : (
                            <span>{item.clientName}</span>
                          )}
                        </td>
                      </tr>

                      {/* Order details */}
                      <tr>
                        <td className="table-box">
                          <strong>Pedido: </strong>
                          {/* Editable order details field */}
                          {editingOrderId === item.id ? (
                            <div
                              value={editedOrder}
                              onChange={e => setEditedOrder(e.target.value)}>
                              {/* Select items from menu */}
                              <C.InputBox
                                className="radio-box"
                                onChange={e => selectItem(0, e)}>
                                {/* Render burger options */}
                                {Object.values(items[0].burger).map(i => (
                                  <C.Label
                                    key={i.name}
                                    htmlFor={i.name}
                                    title={i.desc}>
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

                              {/* Render follow-up options */}
                              <C.InputBox
                                className="radio-box"
                                onChange={e => selectItem(1, e)}>
                                {Object.values(items[1].followUp).map(i => (
                                  <C.Label
                                    key={i.name}
                                    htmlFor={i.name}
                                    title={i.desc}>
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

                              {/* Render drink options */}
                              <C.InputBox
                                className="radio-box"
                                onChange={e => selectItem(2, e)}>
                                {Object.values(items[2].drink).map(i => (
                                  <C.Label
                                    key={i.name}
                                    htmlFor={i.name}
                                    title={i.desc}>
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
                            </div>
                          ) : (
                            <span>{item.order}</span>
                          )}
                        </td>
                      </tr>

                      {/* Total price */}
                      <tr>
                        <td className="table-box total">
                          <strong>Total: </strong>
                          {/* Editable total price field */}
                          {editingOrderId === item.id ? (
                            <C.Input
                              className="price"
                              disabled
                              type="readonly"
                              value={item.price}
                            />
                          ) : (
                            <span>{item.price}</span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Render edit buttons if in edit mode */}
                  {editingOrderId === item.id && (
                    <div className="edit-btns">
                      <button onClick={() => updateOrder(item.id)}>
                        Salvar
                      </button>
                      <button onClick={clearEdit}>Cancelar</button>
                    </div>
                  )}
                </C.Order>
              ))
            ) : (
              // Render if no orders available
              <p>Nenhum pedido cadastrado.</p>
            )}
          </C.List>

          {/* Navigate to the Home page */}
          <Button onClick={() => navigate("/")}>Novo pedido</Button>
        </ItemsContainer>

        <Image $bottommargin="true" src={Logo} alt="Burger Logo" />
      </C.MainContainer>
    </>
  )
}

export default Orders // Export the Orders components