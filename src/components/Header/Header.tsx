import * as React from "react"
import {
    HeaderProps,
    cnCalendarHeader
} from "./Header.index"

export const Header: React.FC<HeaderProps> = ({ month, year }) => {
    return <div className={cnCalendarHeader("")}>
        <h1>{month}, {year}</h1>
    </div>;
};