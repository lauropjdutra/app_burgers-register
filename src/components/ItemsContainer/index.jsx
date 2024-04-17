import React from "react"
import { ItemsContainer as Container } from "./style"

const ItemsContainer = ({ children, ...props }) => <Container {...props}>{children}</Container>


export default ItemsContainer