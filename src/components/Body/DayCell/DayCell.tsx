import * as React from "react"
import { cnCalendarBody } from "../Body.index"

import { Item } from "../Item/Item";
import { useGetPlannerHook } from '../Body.hook'

// 1. Мемоизируем компонент Item
const MemoizedItem = React.memo(Item, (prev, next) => {
  return prev.id === next.id && 
         prev.theme === next.theme && 
         prev.width === next.width 
});


// 2. Выносим рендер дня в отдельный компонент
interface DayCellProps {
  day: number;
  theme: string;
  isToday: boolean;
  isWeekend: boolean;
  isOpenDay: boolean;
  isOutOfMonth: boolean;
  open: boolean;
  events: any[];
  width: number;
  onClick: () => void;
}

export const DayCell = React.memo(({
  day,
  theme,
  isToday,
  isWeekend,
  isOpenDay,
  isOutOfMonth,
  open,
  events,
  width,
  onClick
}: DayCellProps) => {
    console.log("отрисовка ячейки")
  return (
    <div
      onClick={onClick}
      className={cnCalendarBody(
        !isOutOfMonth
          ? `${theme}-days
             CalendarBody__${theme}${isOpenDay && open ? "-OpenDay" : "-closedDay"} 
             CalendarBody__${theme}Box ${isWeekend
                ? `CalendarBody__${theme}-weekend CalendarBody__${theme}Box` : ""} 
             ${isToday ? `CalendarBody__${theme}-today CalendarBody__${theme}Box` : ""}`
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
  // Глубокая проверка для предотвращения ререндеров
  return prev.day === next.day &&
         prev.theme === next.theme &&
         prev.isToday === next.isToday &&
         prev.isWeekend === next.isWeekend &&
         prev.isOpenDay === next.isOpenDay &&
         prev.isOutOfMonth === next.isOutOfMonth &&
         prev.open === next.open &&
         prev.width === next.width &&
         JSON.stringify(prev.events) === JSON.stringify(next.events);
});