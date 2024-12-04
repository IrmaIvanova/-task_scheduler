import * as React from "react"
import { BodyProps, cnCalendarBody } from "./Body.index"
import "./Body.scss"
export const Body: React.FC<BodyProps> = ({ weekdays, selectMonth, selectYear }) => {

    const firstDay = new Date(selectYear, selectMonth, 0).getDay()
    const monthDaysCount = new Date(selectYear, selectMonth + 1, 0).getDate()

    return <div className={cnCalendarBody("Body")}>
        {weekdays.map((el: string, index: number) => <div className={cnCalendarBody(`${index > 4 ? "Body-weekends" : "Body-weekdays"}`,)}>{el}</div>)}
        {[...Array(42)].map((_, i) => {
            const day = i - firstDay + 1;
            const weekDay = new Date(selectYear, selectMonth, day).getDay();

            return <div className={cnCalendarBody(i >= firstDay && i < monthDaysCount + firstDay ? `Body-days ${weekDay === 0 || weekDay === 6 ? "CalendarBody__Body-weekend" : ""}` : "Body-outOfMonth",)}>
                {i >= firstDay && i < monthDaysCount + firstDay ? day : ""}
            </div>
        }
        )}
    </div>
}