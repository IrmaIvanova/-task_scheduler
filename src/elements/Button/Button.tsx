import * as React from "react"
import { ButtonProps } from "./Button.index"
import './Button.scss'
import { createBem } from '../HelperBemClassName/HelperBemClassName'


const { bemElClassName } = createBem('Button');

export const Button: React.FC<ButtonProps> = ({ children, onClick, darkTheme, arrow }) => {
    let arrowElement = arrow || "withoutArrow"


    return <button
        onClick={onClick}
        className={bemElClassName(`${darkTheme} ${arrowElement}`)}>
        {children}
    </button>
}