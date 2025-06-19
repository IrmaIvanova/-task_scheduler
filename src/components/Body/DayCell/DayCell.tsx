import * as React from "react"
import {DayCellProps} from './DayCell.index'
import { Item } from "../Item/Item";
import { useGetPlannerHook } from '../Body.hook'
import { createBem } from '../../../elements/HelperBemClassName/HelperBemClassName'


const { bemElClassName } = createBem('CalendarBody');
// 1. Мемоизируем компонент Item
const MemoizedItem = React.memo(Item, (prev, next) => {
    return prev.id === next.id &&
        prev.theme === next.theme &&
        prev.width === next.width
});


export const DayCell = React.memo(({
    day,
    theme,
    isToday,
    isWeekend,
    isOutOfMonth,
    open,
    events,
    width,
    onClick
}: DayCellProps) => {

    const isDayOpen = open ? "-OpenDay" : "-closedDay";
    const className = `CalendarBody__${theme}`

    return (
        <div
            onClick={onClick}
            className={bemElClassName(
                !isOutOfMonth
                    ? `${theme}Box 
           ${className}-days
            ${className}${isDayOpen} 
            ${isWeekend && `${className}-weekend`} 
             ${isToday && `${className}-today`}`
                    : `${theme}-outOfMonth`
            )}>
            {!isOutOfMonth ? day : ""}

            {events.map((event) => (
                <MemoizedItem
                    key={event}
                    id={event}
                    date={event}
                    theme={theme}
                    width={width}

                />
            ))}
        </div>
    );
}, (prev, next) => {
    // Проверка для предотвращения ререндеров
    return prev.theme === next.theme &&
        prev.open === next.open &&

        prev.width === next.width &&
        JSON.stringify(prev.events) === JSON.stringify(next.events);
});