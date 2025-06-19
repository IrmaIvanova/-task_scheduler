import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

import '../Body.scss'

import { createBem } from '../../../elements/HelperBemClassName/HelperBemClassName'


const { bemElClassName:element } = createBem('CalendarBody');
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
        if (width < 500 && dayItem?.tasks?.length > 0) return <div className={element(`${theme}-taskListSMobile`)}> <div className={element(`${theme}-taskListSMobile-absolute`)}>  {
            dayItem.tasks.map((el) => {
                return <span
                    className={element(`${theme}-taskListSMobile-absolute-item`)}>
                </span>
            })
        } </div>
        </div>;
        return <div className={element(`${theme}-taskList`)}>
           
            {
                dayItem.tasks.map((el) => {
                    return <div
                        className={element(`${theme}-taskList-item`)}>
                    </div>
                })
            }
        </div>
    }

    return null



}