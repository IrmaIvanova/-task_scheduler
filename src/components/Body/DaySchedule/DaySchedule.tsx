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

export interface IDayListItem {
    day: string,
    month: string,
    year: string,
    todo: IToDoItem[]
}

export interface IToDoItem {
    title: string,
    time: string,
    id: string
}

export const DaySchedule: React.FC<DayScheduleProps> = () => {
    const {
        showDayPlan,

        toggleShowDayPlan,
        toggleOpen,
        open,
        darkTheme,
        plan,
        addToDoItem
    } = useAppContext();

    const [dayList, setDayList] = React.useState<IDayListItem>({
        day: showDayPlan.getDate(),
        month: showDayPlan.getMonth(),
        year: showDayPlan.getFullYear(),
        todo: []
    })

    const [shownInput, setShowInput] = React.useState(false)

    const [toDoItem, setToDoItem] = React.useState<IToDoItem>({
        title: "",
        time: "",
        id: ""
    })

    const theme = darkTheme ? "NightTheme" : "DayTheme";

    const addTask = () => {
        setShowInput(true)

        setToDoItem({ ...toDoItem, id: uuidv4() })
        // setDayList({...dayList, todo:[]})
    }

    const saveTask = () => {
        setShowInput(false)

        setDayList({ ...dayList, todo: [...dayList.todo, toDoItem] })
console.log("showDayPlan",showDayPlan)

        addToDoItem({
            day: showDayPlan.getDate(),
            month: showDayPlan.getMonth(),
            year: showDayPlan.getFullYear(),
            todo: [...dayList.todo, toDoItem]
            // todo: [...dayList.todo, toDoItem]
        })

        setToDoItem({
            title: "",
            time: "",
            id: ""
        })
    }



    const memoToday = React.useMemo(() => plan.map((el) => {
        if (el.day === showDayPlan.getDate() && el.month === showDayPlan.getMonth() && el.year === showDayPlan.getFullYear()) {
          
            return <div className={cnDaySchedule(`${theme}-taskList`)}>

                {el.todo.map((el) => <div
                    className={cnDaySchedule(`${theme}-taskList-item`)}>
                    {el.time}: {el.title}
                </div>)}
            </div>
        }
        return null;
    }), [plan, showDayPlan])


    return <TransitionGroup>
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
            {open && <div className={cnDaySchedule(`${theme}`)}>


                <div className={cnDaySchedule(`${theme}-Header`)}>
                    <div className={cnDaySchedule(`${theme}-Header-Navigation`)}>
                        <IconButton sx={{ color: darkTheme ? "#fff" : "#000" }}
                            onClick={() => {
                                toggleShowDayPlan(new Date(showDayPlan.getFullYear(), showDayPlan.getMonth(), showDayPlan.getDate() - 1));
                                setDayList({
                                    day: showDayPlan.getDate(),
                                    month: showDayPlan.getMonth(),
                                    year: showDayPlan.getFullYear(),
                                    todo: []
                                })

                            }}>
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                        <Typography variant="h6">
                            {weekdaysArrayAmerican[showDayPlan.getDay()]}, {showDayPlan.getDate()}
                        </Typography>
                        <IconButton sx={{ color: darkTheme ? "#fff" : "#000" }}
                            onClick={() => {
                                toggleShowDayPlan(new Date(showDayPlan.getFullYear(), showDayPlan.getMonth(), showDayPlan.getDate() + 1));
                                setDayList({
                                    day: showDayPlan.getDate(),
                                    month: showDayPlan.getMonth(),
                                    year: showDayPlan.getFullYear(),
                                    todo: []
                                })
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

                {shownInput && <TextField
                    label="With normal TextField"
                    variant="standard"
                    id="outlined-start-adornment"

                    onChange={(e) => setToDoItem({ ...toDoItem, title: e.target.value,  })}
                />}

                <Button darkTheme={darkTheme}
                    onClick={() => shownInput ? saveTask() : addTask()}
                    children={shownInput ? "Сохранить" : "Добавить"} />

                {memoToday}


            </div>}
        </Slide>
    </TransitionGroup>


}