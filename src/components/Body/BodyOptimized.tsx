import * as React from "react"
import { BodyProps, cnCalendarBody } from "./Body.index"
import { createPortal } from 'react-dom';
import "./Body.scss"
import DaySchedule from "./DaySchedule/DaySchedule"
import { useAppContext } from '../../context/AppContext/AppContextProvider'
import { Item } from "./Item/Item";
import { useGetPlannerHook } from './Body.hook'
import { DayCell } from "./DayCell/DayCell";


export const Body: React.FC<BodyProps> = React.memo(({ 
  weekdays, 
  selectMonth, 
  selectYear, 
  actualYear, 
  actualMonth, 
  theme, 
  today, 
  width 
}) => {
  const firstDay = new Date(selectYear, selectMonth, 0).getDay();
  const monthDaysCount = new Date(selectYear, selectMonth + 1, 0).getDate();
  const [rendered, setRender] = React.useState(false);
  const planIDS = useGetPlannerHook();

  // 3. Оптимизированная группировка событий
  const eventsByDate = React.useMemo(() => {
    const map = new Map<string, any[]>();
    planIDS.forEach(event => {
        const dateKey = event;
        if (!map.has(dateKey)) {
          map.set(dateKey, []);
        }
        map.get(dateKey)!.push(event);
      });
    return map;
  }, [planIDS]);


  React.useEffect(() => {
    setRender(true);
  }, []);

  const {
    showDayPlan,
    toggleShowDayPlan,
    toggleOpen,
    open,
  } = useAppContext();

  // 4. Мемоизация обработчиков
  const handleDayClick = React.useCallback((day: number) => {
    toggleShowDayPlan(new Date(selectYear, selectMonth, day));
    toggleOpen(true);
  }, [selectYear, selectMonth, toggleShowDayPlan, toggleOpen]);

  // 5. Мемоизация рендера DaySchedule
  const DayScheduleRender = React.useMemo(() => {
    if (!rendered) return null;
    const root = document.getElementById('DayScheduleBox');
    return createPortal(<DaySchedule />, root!);
  }, [rendered, showDayPlan]);

  // 6. Мемоизация рендера дней недели
  const weekdaysRender = React.useMemo(() => (
    weekdays.map((el: string, index: number) => (
      <div 
        key={`weekday-${index}`}
        className={cnCalendarBody(
          `${index > 4 ? `${theme}-weekends` : `${theme}-weekdays`} CalendarBody__${theme}Box`
        )}>
        {el}
      </div>
    ))
  ), [weekdays, theme]);

  // 7. Мемоизация рендера дней календаря
  const daysRender = React.useMemo(() => (
    [...Array(42)].map((_, i) => {
      const day = i - firstDay + 1;
      const weekDay = new Date(selectYear, selectMonth, day).getDay();
      const dateKey =  `${day}.0${selectMonth + 1}.${selectYear}`;

      return (
        <DayCell
          key={`day-${i}`}
          day={day}
          theme={theme}
          isToday={day === today && selectYear === actualYear && selectMonth === actualMonth}
          isWeekend={weekDay === 0 || weekDay === 6}
          isOpenDay={showDayPlan.getDate() === day && 
                    selectYear === showDayPlan.getFullYear() && 
                    selectMonth === showDayPlan.getMonth()}
          isOutOfMonth={!(i >= firstDay && i < monthDaysCount + firstDay)}
          open={open}
        //   events={planIDS || []}
          events={eventsByDate.get(dateKey) || []}
          width={width}
          onClick={() => handleDayClick(day)}
        />
      );
    })
  ), [
    firstDay, monthDaysCount, selectYear, selectMonth, 
    today, actualYear, actualMonth, theme, 
    showDayPlan, open, 
    eventsByDate, 
    width, handleDayClick
  ]);

  return (
    <div className={cnCalendarBody(`${theme}`)}>
      {weekdaysRender}
      {daysRender}
      {open && DayScheduleRender}
    </div>
  );
}, (prev, next) => {
  // Глубокая проверка пропсов для всего Body
  return prev.selectMonth === next.selectMonth &&
         prev.selectYear === next.selectYear &&
         prev.actualYear === next.actualYear &&
         prev.actualMonth === next.actualMonth &&
         prev.theme === next.theme &&
         prev.today === next.today &&
         prev.width === next.width &&
         JSON.stringify(prev.weekdays) === JSON.stringify(next.weekdays);
});