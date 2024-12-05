import { createCn as cn } from "bem-react-classname"
import * as React from "react"

export const cnButton = cn("Button")

export interface ButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    children: string;
    darkTheme: boolean;
    arrow?: "left" | "right"
} 