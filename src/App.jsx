import React from 'react'
import Routes from './routes.jsx'
import GlobalStyle from './styles/globalStyle.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes />
      <GlobalStyle />
    </>
  )
}

export default App