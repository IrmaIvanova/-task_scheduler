import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/store'
import { cnCalendarBody } from '../Body.index'
import '../Body.scss'
interface ICalendarItem {
    id: string,
    date:string,
    // day: number,
    // month: number,
    // year: number,
    theme: string,
    width: number
}

export const Item: React.FC<ICalendarItem> = ({
    id,
    date,
    // day,
    // month,
    // year,
    theme,
    width }) => {

    const dayItem = useSelector((state: RootState) => state.planner.plannerCollection[id]);

// console.log("dayItem", dayItem, date) 

    if (dayItem.date === date) {
    // if (dayItem.day === day && dayItem.month === month && dayItem.year === year) {
        if (width < 500) return <div className={cnCalendarBody(`${theme}-taskListSMobile`)}> {dayItem?.tasks?.length} </div>;
        return <div className={cnCalendarBody(`${theme}-taskList`)}>
            {
                dayItem.tasks.map((el) => {
                    return <div
                        className={cnCalendarBody(`${theme}-taskList-item`)}>
                    </div>
                })
            }
        </div>
    }

    return null



}