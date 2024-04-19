import React from "react"

import { Button as Btn } from "./style"

const Button = ({ children, onClick }) => <Btn onClick={onClick}>{children}</Btn>

export default Button