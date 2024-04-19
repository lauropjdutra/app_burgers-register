import React from "react"
import Routes from "./routes.jsx" // Routes component
import GlobalStyle from "./styles/globalStyle.js" // Global styles
import { ToastContainer } from "react-toastify" // Component from Toastify library
import "react-toastify/dist/ReactToastify.css" // External CSS for Toastify component

// Main component of the application
const App = () => {
  return (
    <>
      {/* Toast container for displaying notifications */}
      <ToastContainer />
      {/* Routes component for managing navigation */}
      <Routes />
      {/* Global styles for resetting default browser styles and applying customizations */}
      <GlobalStyle />
    </>
  )
}

export default App // Export the App component