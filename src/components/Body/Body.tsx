import * as React from "react"
import { BodyProps, cnCalendarBody } from "./Body.index"
import { createPortal } from 'react-dom';
import "./Body.scss"
import DaySchedule from "./DaySchedule/DaySchedule"
import { useAppContext } from '../../context/AppContext/AppContextProvider'
import { Item } from "./Item/Item";
import { useGetPlannerHook } from './Body.hook'

export const Body: React.FC<BodyProps> = ({ weekdays, selectMonth, selectYear, actualYear, actualMonth, theme, today, width }) => {

    const firstDay = new Date(selectYear, selectMonth, 0).getDay()
    const monthDaysCount = new Date(selectYear, selectMonth + 1, 0).getDate()

    const [rendered, setRender] = React.useState(false)

    const planIDS = useGetPlannerHook()

    React.useEffect(() => {
        setRender(true)
    }, [])


    const {
        showDayPlan,
        toggleShowDayPlan,
        toggleOpen,
        open,
        // plan,
    } = useAppContext();


    const DayScheduleRender = React.useMemo(() => {
        if (!rendered) return null
        const root = document.getElementById('DayScheduleBox');
        return createPortal(
            <DaySchedule />,
            root!
        );
    }, [rendered, showDayPlan]);

    return <div className={cnCalendarBody(`${theme}`)}>
        {weekdays.map((el: string, index: number) => <div className={cnCalendarBody(`${index > 4 ? `${theme}-weekends` : `${theme}-weekdays`} CalendarBody__${theme}Box`,)}>{el}</div>)}
        {[...Array(42)].map((_, i) => {
            const day = i - firstDay + 1;
            const weekDay = new Date(selectYear, selectMonth, day).getDay();

            const checkToday = day === today && selectYear === actualYear && selectMonth === actualMonth
            const checkOpenDay = showDayPlan.getDate() === day && selectYear === showDayPlan.getFullYear() && selectMonth === showDayPlan.getMonth()

console.log("render old")
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

                {
                    planIDS.map((id) => {
                        return <Item
                            id={id}
                            key={id}
                            date={`${day}.0${selectMonth + 1}.${selectYear}`}
                            theme={theme}
                            width={width}
                        />
                    })
                }

            </div>
        }
        )}
        {open && DayScheduleRender}
    </div>
}

// import * as React from "react"
// import { BodyProps, cnCalendarBody } from "./Body.index"
// import { createPortal } from 'react-dom';
// import "./Body.scss"
// import DaySchedule from "./DaySchedule/DaySchedule"
// import { useAppContext } from '../../context/AppContext/AppContextProvider'
// import { Item } from "./Item/Item";
// import { useGetPlannerHook } from './Body.hook'

// // Мемоизированная версия Item для предотвращения лишних ререндеров
// const MemoizedItem = React.memo(Item);

// export const Body: React.FC<BodyProps> = ({ 
//   weekdays, 
//   selectMonth, 
//   selectYear, 
//   actualYear, 
//   actualMonth, 
//   theme, 
//   today, 
//   width 
// }) => {
//   const firstDay = new Date(selectYear, selectMonth, 0).getDay();
//   const monthDaysCount = new Date(selectYear, selectMonth + 1, 0).getDate();
//   const [rendered, setRender] = React.useState(false);
//   const planIDS = useGetPlannerHook();

//   // Группируем события по датам один раз при изменении planIDS
//   const eventsByDate = React.useMemo(() => {
//     const map = new Map<string, typeof planIDS>();
//     planIDS.forEach(event => {
//       const dateKey = event;
//       if (!map.has(dateKey)) {
//         map.set(dateKey, []);
//       }
//       map.get(dateKey)!.push(event);
//     });
//     return map;
//   }, [planIDS]);

//   React.useEffect(() => {
//     setRender(true);
//   }, []);

//   const {
//     showDayPlan,
//     toggleShowDayPlan,
//     toggleOpen,
//     open,
//   } = useAppContext();

//   const DayScheduleRender = React.useMemo(() => {
//     if (!rendered) return null;
//     const root = document.getElementById('DayScheduleBox');
//     return createPortal(<DaySchedule />, root!);
//   }, [rendered, showDayPlan]);


//   return (
//     <div className={cnCalendarBody(`${theme}`)}>
//       {weekdays.map((el: string, index: number) => (
//         <div 
//           key={`weekday-${index}`}
//           className={cnCalendarBody(
//             `${index > 4 ? `${theme}-weekends` : `${theme}-weekdays`} CalendarBody__${theme}Box`
//           )}>
//           {el}
//         </div>
//       ))}
      
//       {[...Array(42)].map((_, i) => {
//         const day = i - firstDay + 1;
//         const weekDay = new Date(selectYear, selectMonth, day).getDay();
//         const checkToday = day === today && selectYear === actualYear && selectMonth === actualMonth;
//         const checkOpenDay = showDayPlan.getDate() === day && 
//                            selectYear === showDayPlan.getFullYear() && 
//                            selectMonth === showDayPlan.getMonth();

//         // Формируем ключ для поиска событий
//         const dateKey = `${day}.0${selectMonth + 1}.${selectYear}`;
//         const dayEvents = eventsByDate.get(dateKey) || [];


           
//         return (
//           <div
//             key={`day-${i}`}
//             onClick={() => {
//               toggleShowDayPlan(new Date(selectYear, selectMonth, day));
//               toggleOpen(true);
//             }}
//             className={cnCalendarBody(
//               i >= firstDay && i < monthDaysCount + firstDay
//                 ? `${theme}-days
//                    CalendarBody__${theme}${checkOpenDay && open ? "-OpenDay" : "-closedDay"} 
//                    CalendarBody__${theme}Box ${weekDay === 0 || weekDay === 6
//                       ? `CalendarBody__${theme}-weekend CalendarBody__${theme}Box` : ""} 
//                    ${checkToday ? `CalendarBody__${theme}-today CalendarBody__${theme}Box` : ""}`
//                 : `${theme}-outOfMonth`
//             )}>
            
//             {i >= firstDay && i < monthDaysCount + firstDay ? day : ""}

//             {dayEvents.map((event) => (
//               <MemoizedItem
//                 key={event}
//                 id={event}
//                 date={dateKey}
//                 theme={theme}
//                 width={width}
//               />
//             ))}
//           </div>
//         );
//       })}
//       {open && DayScheduleRender}
//     </div>
//   );
// };

