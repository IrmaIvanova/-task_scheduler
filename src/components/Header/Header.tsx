import * as React from "react"
import {
    HeaderProps,
    cnCalendarHeader
} from "./Header.index"
import "./Header.scss"

export const Header: React.FC<HeaderProps> = ({ month, year, darkTheme }) => {
    const theme = darkTheme ? "HeaderDark" : "Header";
    return <div className={cnCalendarHeader(`${theme}`)}>
        <h1>{month}, {year}</h1>
    </div>;
};