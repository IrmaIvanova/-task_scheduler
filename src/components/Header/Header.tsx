import * as React from "react"
import {
    HeaderProps,
    cnCalendarHeader
} from "./Header.index"

export const Header: React.FC<HeaderProps> = ({ day }) => {
    return <div className={cnCalendarHeader("")}>
        <h1>{day}</h1>
    </div>;
};