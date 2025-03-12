import * as React from "react"
import { ButtonProps, cnButton } from "./Button.index"
import './Button.scss'

export const Button: React.FC<ButtonProps> = ({ children, onClick, darkTheme, arrow }) => {
    let arrowElement = arrow || "withoutArrow"
    return <button
        onClick={onClick}
        className={cnButton(`${darkTheme ? "NightBTN" : "DayBTN"} ${arrowElement}`)}>
        {children}
    </button>
}