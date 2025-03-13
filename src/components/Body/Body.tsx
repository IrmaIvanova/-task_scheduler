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
        open,
        plan
    } = useAppContext();



    const DayScheduleRender = React.useMemo(() => {
        if (!rendered) return null
        const root = document.getElementById('DayScheduleBox');
        return createPortal(
            <DaySchedule />,
            root!
        );
    }, [rendered]);

    return <div className={cnCalendarBody(`${theme}`)}>
        {weekdays.map((el: string, index: number) => <div className={cnCalendarBody(`${index > 4 ? `${theme}-weekends` : `${theme}-weekdays`} CalendarBody__${theme}Box`,)}>{el}</div>)}
        {[...Array(42)].map((_, i) => {
            const day = i - firstDay + 1;
            const weekDay = new Date(selectYear, selectMonth, day).getDay();

            const checkToday = day === today && selectYear === actualYear && selectMonth === actualMonth
            const checkOpenDay = showDayPlan.getDate() === day && selectYear === showDayPlan.getFullYear() && selectMonth === showDayPlan.getMonth()

            return <div
                onClick={() => {
                    toggleShowDayPlan(new Date(selectYear, selectMonth, i - firstDay + 1));
                    toggleOpen(true);
                }}
                className={cnCalendarBody(i >= firstDay && i < monthDaysCount + firstDay ?
                    `${theme}-days
                     CalendarBody__${theme}${checkOpenDay && open ? "-OpenDay" : "-closedDay"} 
                     CalendarBody__${theme}Box ${weekDay === 0 || weekDay === 6 ?
                        `CalendarBody__${theme}-weekend CalendarBody__${theme}Box` : ""} 
                        ${checkToday ? `CalendarBody__${theme}-today CalendarBody__${theme}Box` : ""}` : `${theme}-outOfMonth`
                )}>

                {i >= firstDay && i < monthDaysCount + firstDay ? day : ""}

                {plan.map((el) => {
                    if (el.day === day && el.month === selectMonth && el.year === selectYear) {
                        return <div className={cnCalendarBody(`${theme}-taskList`)}>
                            {el.todo.map((el) => {
                                return <div
                                    className={cnCalendarBody(`${theme}-taskList-item`)}>
                                </div>
                            })}
                        </div>
                    }
                    return null
                })}

            </div>
        }
        )}
        {open && DayScheduleRender}
    </div>
}