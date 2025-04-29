import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/store'
import { cnCalendarBody } from '../Body.index'
import '../Body.scss'
interface ICalendarItem {
    id: string,
    date: string,
    theme: string,
    width: number
}

export const Item: React.FC<ICalendarItem> = ({
    id,
    date,
    theme,
    width
}) => {

    const dayItem = useSelector((state: RootState) => state.planner.plannerCollection[id]);

    if (dayItem.date === date) {
        if (width < 500 && dayItem?.tasks?.length > 0) return <div className={cnCalendarBody(`${theme}-taskListSMobile`)}> <div className={cnCalendarBody(`${theme}-taskListSMobile-absolute`)}>  {
            dayItem.tasks.map((el) => {
                return <span
                    className={cnCalendarBody(`${theme}-taskListSMobile-absolute-item`)}>
                </span>
            })
        } </div>
        </div>;
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