import * as React from "react"
import { BodyProps, cnCalendarBody } from "./Body.index"
import "./Body.scss"
export const Body: React.FC<BodyProps> = ({ weekdays }) => {

    return <div className={cnCalendarBody("Body")}>
        {weekdays.map((el: string) => <div className={cnCalendarBody("Body-weekDays")}>{el}</div>)}
    </div>
}