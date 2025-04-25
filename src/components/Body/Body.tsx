import * as React from "react"
import { BodyProps, cnCalendarBody } from "./Body.index"
import { createPortal } from 'react-dom';
import "./Body.scss"
import DaySchedule from "./DaySchedule/DaySchedule"
import { useAppContext } from '../../context/AppContext/AppContextProvider'
import { useSelector, useDispatch } from 'react-redux'
import { setPlanner } from '../../redux/reducers/plannerReducer'
import { RootState } from '../../redux/store'
import { Item } from "./Item/Item";
import { setTask } from '../../redux/reducers/tasksReducer'
import PlannerService from '../../services/PlannerService';


export const Body: React.FC<BodyProps> = ({ weekdays, selectMonth, selectYear, actualYear, actualMonth, theme, today, width }) => {

    const firstDay = new Date(selectYear, selectMonth, 0).getDay()
    const monthDaysCount = new Date(selectYear, selectMonth + 1, 0).getDate()

    // const theme = darkTheme ? "BodyDark" : "Body";

    const [rendered, setRender] = React.useState(false)

    const planIDS = useSelector((state: RootState) => state.planner.plannerCollectionIds)
    const userID = useSelector((state: RootState) => state.user.user.id)
    const dispatch = useDispatch()


 const getPlanner = async function (userID: any) {
    try {
        const response = await PlannerService.getAllPlannerDays(userID);
        let taskArr = [];
        let dayCollection = response?.data?.reduce((acc, dayItem) => {
            if (dayItem.tasks.length > 0) { taskArr.push(dayItem.tasks) }
            return {
                ...acc, [dayItem.date]: {
                    ...dayItem,
                    taskIDS: dayItem?.tasks?.map((el) => { return el.id }) || [],
                }
            }
        }, {})||{};

        let dayCollectionIds = Object.keys(dayCollection) || []
        dispatch(setPlanner({ listIds: dayCollectionIds, collectionList: dayCollection }))

        let tasksCollection = taskArr.flat()?.reduce((acc, taskItem) => {
            return {
                ...acc, [taskItem.id]: {
                    ...taskItem,
                }
            }
        }, {}) || {};

        dispatch(setTask({
            listIds: Object.keys(tasksCollection) || [],
            collectionList: tasksCollection
        }))

    } catch (e) {
        console.log(e.response?.data?.message)
    }
}

    React.useEffect(() => {
        getPlanner(userID)
    }, [])

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