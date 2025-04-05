import * as React from "react"
import { DayScheduleProps, cnDaySchedule } from './DaySchedule.index'
import { TransitionGroup } from '../../../elements/Transitions/Transitions'
import { useAppContext } from '../../../context/AppContext/AppContextProvider'
import { weekdaysArrayAmerican } from '../../../constants'
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './DaySchedule.scss'
import { Button } from '../../../elements/Button/Button'
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import { ToDoItem } from '../../../elements/ToDoItem/ToDoItem'
// import { IToDoItem } from '../../../elements/ToDoItem/ToDoItem.index'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/store'
import {
    addItemToPlanner,
    Planner,
    setPlanner
} from '../../../redux/reducers/plannerReducer'
import {
    setTask,
    Task,
    addTask as addTastToRedux,
    checkTask as checkTaskToRedux,
    deleteTask as deleteTaskToRedux,

} from '../../../redux/reducers/tasksReducer'


const DaySchedule: React.FC<DayScheduleProps> = () => {
    const {
        showDayPlan,
        toggleShowDayPlan,
        toggleOpen,
        open,
        darkTheme,
    } = useAppContext();

    let month = showDayPlan.getMonth() < 9 ? `0${showDayPlan.getMonth() + 1}` : `${showDayPlan.getMonth() + 1}`


    let selectedDay = `${showDayPlan.getDate()}.${month}.${showDayPlan.getFullYear()}`;

    const baseDayList = {
        id: selectedDay,
        date: selectedDay,
    }

    const baseTodoItem = {
        title: "",
        id: "",
        date: selectedDay,
        checked: false,
        plannerId: selectedDay,
    }

    const dayPlan = useSelector((state: RootState) => {
        return state.planner.plannerCollection[selectedDay]
    }) || undefined;

    React.useEffect(() => {

        if (!dayPlan) {
            createDay(baseDayList)
            dispatch(addItemToPlanner({
                id: baseDayList.date,
                item: {
                    ...baseDayList,
                    tasks: []
                }
            }))
        };

    }, [dayPlan])

    const taskListIds = useSelector((state: RootState) => {
        return state.tasks.tasksIds
    }) || [];

    const dispatch = useDispatch()

    // TODO fix  multiple rerender 
    // console.log("dayPlan", dayPlan)

    const createDay = (dayItem: any) => {
        fetch(`http://localhost:5000/api/task/planner`, {
            method: 'POST',
            body: JSON.stringify(dayItem),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((result) => { })
    }



    const saveTaskToServer = (taskItem: any) => {
        fetch(`http://localhost:5000/api/task`, {
            method: 'POST',
            body: JSON.stringify(taskItem),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((result) => {

                console.log("res", result)
            });
    };

    const [shownInput, setShowInput] = React.useState(false)

    const [toDoItem, setToDoItem] = React.useState<Task>(baseTodoItem)

    const theme = darkTheme ? "NightTheme" : "DayTheme";

    const addTask = () => {
        setShowInput(true)

        setToDoItem({ ...toDoItem, plannerId: dayPlan.id, date: dayPlan.id, id: uuidv4() })

    }

    const saveTask = () => {
        setShowInput(false)

        saveTaskToServer(toDoItem)


        dispatch(addItemToPlanner({
            id: dayPlan.date,
            item: {
                ...dayPlan,
                tasks: [...dayPlan.tasks, toDoItem],
                taskIDS:[...dayPlan.taskIDS, toDoItem.id]
            }
        }))


        dispatch(addTastToRedux({
            id: toDoItem.id,
            item: toDoItem
        }))


        setToDoItem(baseTodoItem)
    }

    const checkTask = (id: string) => {
        dispatch(checkTaskToRedux({ id }))
    };

    const deleteTask = (id: string) => {

        const filteredTodoList = dayPlan.tasks.filter((todoItem) => todoItem.id !== id);

        dispatch(addItemToPlanner({
            id: dayPlan.date,
            item: {
                ...dayPlan,
                tasks: filteredTodoList
            }
        }))

        dispatch(deleteTaskToRedux({ id }))

    };

    const memoToday = React.useMemo(() => {
        return <div className={cnDaySchedule(`${theme}-taskList`)}>


            {dayPlan.taskIDS?.map((el) => {
                if (!el) {
                    return null;
                }
                if (el) {
                    return <ToDoItem
                        key={el}
                        id={el}
                        theme={theme}
                        onCheckClick={checkTask}
                        onDelClick={deleteTask}
                    />
                }
            }
            )}
        </div>
    }, [showDayPlan, darkTheme, taskListIds])

    return <TransitionGroup>
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
            {open && <div className={cnDaySchedule(`${theme}`)}>


                <div className={cnDaySchedule(`${theme}-Header`)}>
                    <div className={cnDaySchedule(`${theme}-Header-Navigation`)}>
                        <IconButton sx={{ color: darkTheme ? "#fff" : "#000" }}
                            onClick={() => {
                                toggleShowDayPlan(new Date(showDayPlan.getFullYear(), showDayPlan.getMonth(), showDayPlan.getDate() - 1));
                                // setDayList(baseDayList)

                            }}>
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                        <Typography variant="h6">
                            {weekdaysArrayAmerican[showDayPlan.getDay()]}, {showDayPlan.getDate()}
                        </Typography>
                        <IconButton sx={{ color: darkTheme ? "#fff" : "#000" }}
                            onClick={() => {
                                toggleShowDayPlan(new Date(showDayPlan.getFullYear(), showDayPlan.getMonth(), showDayPlan.getDate() + 1));
                                // setDayList(baseDayList)
                            }}
                        >
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    </div>
                    <IconButton sx={{ color: darkTheme ? "#fff" : "#000" }}
                        onClick={() => { toggleOpen(false) }}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                {memoToday}

                {shownInput && <TextField
                    onChange={(e) => setToDoItem({ ...toDoItem, title: e.target.value, })}
                />}

                <Button darkTheme={darkTheme}
                    onClick={() => shownInput ? saveTask() : addTask()}
                    children={shownInput ? "Сохранить" : "Добавить"} />

                {shownInput && <Button darkTheme={darkTheme}
                    onClick={() => {
                        setToDoItem({ ...toDoItem, title: "", })
                        setShowInput(false)
                    }}
                    children={"Отмена"} />
                }



            </div>}
        </Slide>
    </TransitionGroup>


}

export default React.memo(DaySchedule);