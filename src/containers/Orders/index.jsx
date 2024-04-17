// import React, { useState, useEffect, useRef } from "react"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import { toast } from 'react-toastify'
// import * as C from "./style.js"
// import Logo from "../../assets/burger_logo.png"
// import bgVideo from "../../assets/bg2-video.mp4"

// const Orders = () => {
//   const videoRef = useRef(null);
//   const [orders, setOrders] = useState([])
//   const baseUrl = "http://localhost:3000"
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.playbackRate = 1.5;
//     }
//   }, []);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const { data } = await axios.get(`${baseUrl}/orders`)
//         setOrders(data)
//     }
//     fetchOrders()
//   }, [])

//   const deleteOrder = async (id) => {
//     const { data } = await axios.delete(`${baseUrl}/orders/${id}`)
//     setOrders(data)
//     toast.error('Pedido excluído com sucesso!', { autoClose: 2000 })
//   }

//   return (
//     <>
//     <C.Video ref={videoRef} src={bgVideo} muted autoPlay />
//     <C.MainContainer>
//       <C.ItemsContainer>
//         <C.Title>Todos os pedidos</C.Title>
//         <ul>
//           {orders.length > 0 ? orders.map((item, index) => (
//             <C.Order key={item.id}>
//               <div className="card-top">
//                 <div className="card-title">
//               <img
//                 width="27"
//                 height="27"
//                 src="https://img.icons8.com/ios/27/ffffff/purchase-order.png"
//                 alt="purchase-order"
//               />
//               <h4>Pedido {index + 1}</h4>
//               </div>
//               <div className="card-btns">
//                 <img
//                   width="22"
//                   height="22"
//                   src="https://img.icons8.com/ios-glyphs/22/ffffff/pencil--v1.png"
//                   alt="pencil--v1"
//                 />
//                 <img
//                   width="22"
//                   height="22"
//                   src="https://img.icons8.com/ios-glyphs/22/ffffff/trash--v1.png"
//                   alt="trash--v1"
//                   onClick={() => deleteOrder(item.id)}
//                 />
//               </div>
//               </div>
//               <table>
//                 <tbody>
//                   <tr>
//                     <td className="table-box name">
//                       <strong>Cliente: </strong>
//                       <span>{item.clientName}</span>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="table-box">
//                       <strong>Pedido: </strong>
//                       <span>{item.order}</span>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="table-box total">
//                       <strong>Total: </strong>
//                       <span>{item.price}</span>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </C.Order>
//            )) : <p>Nenhum pedido cadastrado.</p>}
//         </ul>
//         <C.Button onClick={() => navigate("/")}>Novo pedido</C.Button>
//       </C.ItemsContainer>
//       <C.Image src={Logo} alt="Burger Logo" />
//     </C.MainContainer>
//     </>
//   )
// }

// export default Orders

import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { toast } from "react-toastify"
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import Image from "../../components/LogoImage" 
import Title from "../../components/Title"
import ItemsContainer from "../../components/ItemsContainer"
import VideoBackground from "../../components/BackgroundVideo/index.jsx"

import items from "../../api.js"
import * as C from "./style.js"
import "../../styles/confirmAlert.css"

import Logo from "../../assets/burger_logo.png"
import bgVideo from "../../assets/bg2-video.mp4"

const Orders = () => {
  const videoRef = useRef(null)
  const [orders, setOrders] = useState([])

  const [order, setOrder] = useState([])

  // const [burger, setBurger] = useState()
  // const [burgerPrice, setBurgerPrice] = useState()

  // const [followUp, setFollowUp] = useState()
  // const [followUpPrice, setFollowUpPrice] = useState()

  // const [drink, setDrink] = useState()
  // const [drinkPrice, setDrinkPrice] = useState()

  const [editingOrderId, setEditingOrderId] = useState(null)
  const [editedClientName, setEditedClientName] = useState("")
  const [editedOrder, setEditedOrder] = useState("")

  const baseUrl = "http://localhost:3000"
  const navigate = useNavigate()

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5
    }
  }, [])

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get(`${baseUrl}/orders`)
      setOrders(data)
    }
    fetchOrders()
  }, [])

  const capitalize = string => {
    return string
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, char => char.toUpperCase())
  }

  const formatPrice = value =>
    value.toLocaleString("pt-br", { style: "currency", currency: "BRL" })

  // const selectBurger = event => {
  //   const price = Object.values(items[0].burger).find(
  //     item => item.desc === event.target.value
  //   ).price

  //   setBurger(event.target.value)
  //   setBurgerPrice(price)
  // }

  // const selectFollowUp = event => {
  //   const price = Object.values(items[1].followUp).find(
  //     item => item.desc === event.target.value
  //   ).price

  //   setFollowUp(event.target.value)
  //   setFollowUpPrice(price)
  // }

  // const selectDrink = event => {
  //   const price = Object.values(items[2].drink).find(
  //     item => item.desc === event.target.value
  //   ).price

  //   setDrink(event.target.value)
  //   setDrinkPrice(price)
  // }

  const selectItem = (category, event) => {
    const item = event.target.name
    const selectedItem = event.target.value
    const price = Object.values(items[category][item]).find(
      item => item.desc === selectedItem).price
    console.log(item, selectedItem, price)

    setOrder(prevState => ({
      ...prevState,
      [category]: { item: selectedItem, price: price },
    }))
  }

  const changeColor = event => {
    const selectedInput = event.target
    const selectedLabel = selectedInput.parentElement.parentElement
    const allLabels = selectedInput
      .closest(".radio-box")
      .querySelectorAll("label")

    allLabels.forEach(label => {
      label.classList.remove("red")
    })

    if (selectedLabel) {
      selectedLabel.classList.add("red")
    }
  }
  
  const editOrder = (id, clientName, order) => {
    setEditingOrderId(id)
    setEditedClientName(clientName)
    setEditedOrder(order)
  }
  
  const cancelEdit = () => {
    setEditedClientName("")
    setEditedOrder("")
    setEditingOrderId(null)
  }

  const updateOrder = async id => {
    try {
      const orderItems = `1 ${order[0].item}, 1 ${order[1].item}, 1 ${order[2].item}`
      const totalPrice =
        order[0].price + order[1].price + order[2].price;
      const updatedOrder = {
          clientName: capitalize(editedClientName),
          order: orderItems.toLowerCase(),
          price: formatPrice(totalPrice),
      }
      const { data } = await axios.put(`${baseUrl}/orders/${id}`, updatedOrder)
      const updatedOrders = orders.map(order => {
        if (order.id === id) {
          return data
        }
        return order
      })
      setOrders(...updatedOrders)
      cancelEdit()
      toast.success("Pedido atualizado com sucesso!", { autoClose: 2000 })
    } catch (error) {
      console.error("Erro ao atualizar o pedido:", error)
      toast.error("Erro ao atualizar o pedido. Por favor, tente novamente.", {
        autoClose: 2000,
      })
    }
  }

  const deleteOrder = async (id) => {
    const isEnter = e => {
      if (e.key === 'Enter') {
        const button = document.querySelector('.react-confirm-alert-button-group button:first-child');
        if (button) {
          button.click();
        }
      }
    };
  
    confirmAlert({
      message: 'Tem certeza que deseja excluir este pedido?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            const { data } = await axios.delete(`${baseUrl}/orders/${id}`);
            setOrders(data);
            toast.success('Pedido excluído com sucesso!', { autoClose: 2000 });
          }
        },
        {
          label: 'Cancelar',
          onClick: () => {}
        }
      ]
    });
  
    document.addEventListener("keydown", isEnter)

    
  document.querySelector('.react-confirm-alert-overlay').addEventListener('click', () => {
        const button = document.querySelector('.react-confirm-alert-button-group button:last-child');
        if (button) {
          button.click()
        }
  })
}
  
  
  return (
    <>
      <VideoBackground ref={videoRef} $rotate="true" src={bgVideo} muted autoPlay />
      <C.MainContainer>
        <ItemsContainer $bottomradius="true">
          <Title>Todos os pedidos</Title>
          <C.List>
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <C.Order key={item.id}>
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
                  <table>
                    <tbody>
                      <tr>
                        <td className="table-box name">
                          <strong>Cliente: </strong>
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
                      <tr>
                        <td className="table-box">
                          <strong>Pedido: </strong>
                          {editingOrderId === item.id ? (
                            <div
                              value={editedOrder}
                              onChange={e => setEditedOrder(e.target.value)}>
                              <C.InputBox
                                className="radio-box"
                                onChange={e => selectItem(0, e)}>
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
                      <tr>
                        <td className="table-box total">
                          <strong>Total: </strong>
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
                  {editingOrderId === item.id && (
                    <div className="edit-btns">
                      <button onClick={() => updateOrder(item.id)}>
                        Salvar
                      </button>
                      <button onClick={cancelEdit}>Cancelar</button>
                    </div>
                  )}
                </C.Order>
              ))
            ) : (
              <p>Nenhum pedido cadastrado.</p>
            )}
          </C.List>
          <C.Button onClick={() => navigate("/")}>Novo pedido</C.Button>
        </ItemsContainer>
        <Image $bottommargin="true" src={Logo} alt="Burger Logo" />
      </C.MainContainer>
    </>
  )
}

export default Orders