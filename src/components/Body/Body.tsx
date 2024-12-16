import * as React from "react"
import { BodyProps, cnCalendarBody } from "./Body.index"
import { createPortal } from 'react-dom';
import "./Body.scss"
import { DaySchedule } from "./DaySchedule/DaySchedule"
import { useAppContext } from '../../context/AppContext/AppContextProvider'

export const Body: React.FC<BodyProps> = ({ weekdays, selectMonth, selectYear, actualYear, actualMonth, darkTheme, today }) => {

    const firstDay = new Date(selectYear, selectMonth, 0).getDay()
    const monthDaysCount = new Date(selectYear, selectMonth + 1, 0).getDate()

    const theme = darkTheme ? "BodyDark" : "Body";

    const [rendered, setRender] = React.useState(false)

    React.useEffect(() => {
        setRender(true)
    }, [])


    const {
        showDayPlan,
        toggleShowDayPlan,
        toggleOpen,
        open
    } = useAppContext();


    console.log("showDayPlan", showDayPlan)
    const DayScheduleRender = React.useMemo(() => {
        if (!rendered) return null
        const root = document.getElementById('DayScheduleBox');
        return createPortal(
            <DaySchedule />,
            root!
        );
    }, [rendered]);

    return <div className={cnCalendarBody(`${theme}`)}>
        {weekdays.map((el: string, index: number) => <div className={cnCalendarBody(`${index > 4 ? `${theme}-weekends` : `${theme}-weekdays`}`,)}>{el}</div>)}
        {[...Array(42)].map((_, i) => {
            const day = i - firstDay + 1;
            const weekDay = new Date(selectYear, selectMonth, day).getDay();
            const checkToday = day === today && selectYear === actualYear && selectMonth === actualMonth
            return <div
                onClick={() => {
                    toggleShowDayPlan(new Date(selectYear, selectMonth, i - firstDay + 2));
                    toggleOpen(true);
                }}
                className={cnCalendarBody(i >= firstDay && i < monthDaysCount + firstDay ?
                    `${theme}-days ${weekDay === 0 || weekDay === 6 ?
                        `CalendarBody__${theme}-weekend` : ""} ${checkToday ? `CalendarBody__${theme}-today` : ""}` : `${theme}-outOfMonth`,)}>
                {i >= firstDay && i < monthDaysCount + firstDay ? day : ""}
            </div>
        }
        )}
        {open && DayScheduleRender}
    </div>
}