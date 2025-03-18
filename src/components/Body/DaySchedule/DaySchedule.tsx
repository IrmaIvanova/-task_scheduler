import * as React from "react"
import { DayScheduleProps, cnDaySchedule } from './DaySchedule.index'
import { TransitionGroup } from '../../../elements/Transitions/Transitions'
import { useAppContext } from '../../../context/AppContext/AppContextProvider'
import { weekdaysArrayAmerican, monthSheduleArr } from '../../../constants'
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
import { ToDoItem, BaseToDoItemObject } from '../../../elements/ToDoItem/ToDoItem'
import { IToDoItem } from '../../../elements/ToDoItem/ToDoItem.index'




export interface IDayListItem {
    day: number,
    month: number,
    year: number,
    todo: IToDoItem[]
}



const DaySchedule: React.FC<DayScheduleProps> = () => {
    const {
        showDayPlan,

        toggleShowDayPlan,
        toggleOpen,
        open,
        darkTheme,
        plan,
        addToDoItem
    } = useAppContext();

    const baseDayList = {
        day: showDayPlan.getDate(),
        month: showDayPlan.getMonth(),
        year: showDayPlan.getFullYear(),
        todo: []
    }
    const [dayList, setDayList] = React.useState<IDayListItem>(baseDayList)


    React.useEffect(() => {
        // TODO fix rewriting tasks for a day if in day alrady was tasks


        let hasTodosObj = plan.find((el) => el.day === showDayPlan.getDate() && el.month === showDayPlan.getMonth() && el.year === showDayPlan.getFullYear()) || []

        console.log("hasTodosObj", hasTodosObj)
        setDayList({
            day: showDayPlan.getDate(),
            month: showDayPlan.getMonth(),
            year: showDayPlan.getFullYear(),
            todo: hasTodosObj?.todo || []
        })
    }, [showDayPlan])

    const [shownInput, setShowInput] = React.useState(false)

    const [toDoItem, setToDoItem] = React.useState<IToDoItem>(BaseToDoItemObject)

    const theme = darkTheme ? "NightTheme" : "DayTheme";

    const addTask = () => {
        setShowInput(true)

        setToDoItem({ ...toDoItem, id: uuidv4() })
        // setDayList({...dayList, todo:[]})
    }

    const saveTask = () => {
        setShowInput(false)

        setDayList({ ...dayList, todo: [...dayList.todo, toDoItem] })

        console.log("dayList", dayList)
        addToDoItem({
            ...baseDayList,
            todo: [...dayList.todo, toDoItem]
            // todo: [...dayList.todo, toDoItem]
        })
        setToDoItem(BaseToDoItemObject)
    }



    const memoToday = React.useMemo(() => plan.map((el) => {
        if (el.day === showDayPlan.getDate() && el.month === showDayPlan.getMonth() && el.year === showDayPlan.getFullYear()) {
            console.log("el", el)
            return <div className={cnDaySchedule(`${theme}-taskList`)}>

                {el?.todo?.map((el) => {
                    if(!el){
                        return null;
                    }
                    if (el) {
                        return <ToDoItem
                            key={el.id}
                            title={el.title || ""}
                            id={el.id}
                            theme={theme}
                            time={el.time}
                            checked={el.checked} />
                    }
                }
                )}
            </div>
        }
        return null;
    }), [plan, showDayPlan, darkTheme])

    return <TransitionGroup>
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
            {open && <div className={cnDaySchedule(`${theme}`)}>


                <div className={cnDaySchedule(`${theme}-Header`)}>
                    <div className={cnDaySchedule(`${theme}-Header-Navigation`)}>
                        <IconButton sx={{ color: darkTheme ? "#fff" : "#000" }}
                            onClick={() => {
                                toggleShowDayPlan(new Date(showDayPlan.getFullYear(), showDayPlan.getMonth(), showDayPlan.getDate() - 1));
                                setDayList(baseDayList)

                            }}>
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                        <Typography variant="h6">
                            {weekdaysArrayAmerican[showDayPlan.getDay()]}, {showDayPlan.getDate()}
                        </Typography>
                        <IconButton sx={{ color: darkTheme ? "#fff" : "#000" }}
                            onClick={() => {
                                toggleShowDayPlan(new Date(showDayPlan.getFullYear(), showDayPlan.getMonth(), showDayPlan.getDate() + 1));
                                setDayList(baseDayList)
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
                    label="With normal TextField"
                    variant="standard"
                    id="outlined-start-adornment"

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