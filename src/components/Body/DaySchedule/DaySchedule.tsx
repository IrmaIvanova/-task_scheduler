import * as React from "react"
import { DayScheduleProps } from './DaySchedule.index'
import { TransitionGroup } from '../../../elements/Transitions/Transitions'
import { weekdaysArrayAmerican } from '../../../constants'
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './DaySchedule.scss'
import { Button } from '../../../elements/Button/Button'
// import TextField from '@mui/material/TextField';
import { TextField } from '../../../elements/TextField/TextField'
import { ToDoItem } from '../../../elements/ToDoItem/ToDoItem'
import { useDayScheduleHook } from './DayShedule.hook'
import { createBem } from '../../../elements/HelperBemClassName/HelperBemClassName'


const { bemElClassName } = createBem('DaySchedule');

const DaySchedule: React.FC<DayScheduleProps> = () => {

    const {
        showDayPlan,
        open,
        theme,
        darkTheme,
        dayPlan,
        shownInput,
        toDoItem,

        toggleShowDayPlan,
        toggleOpen,
        error,
        setToDoItem,
        setShowInput,
        deleteTask,
        saveTask,
        addTask,
        checkTask,
        handleTitleChange
    } = useDayScheduleHook();

    const memoToday = React.useMemo(() => {
        return <div className={bemElClassName(`${theme}-taskList`)}>
            {dayPlan?.taskIDS?.map((el) => {
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
    }, [showDayPlan, theme, dayPlan])

    return <TransitionGroup>
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
            {open && <div className={bemElClassName(`${theme}`)}>

                <div className={bemElClassName(`${theme}-Header`)}>
                    <div className={bemElClassName(`${theme}-Header-Navigation`)}>
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
                    theme={theme}
                    variant="outlined"
                    // placeholder="Добавьте название"
                    label="Добавьте название"
                    className={`${theme}`}
                    error={error['title']?.error}
                    helperText={error['title']?.message}
                    onChange={handleTitleChange}
                // onChange={(e) => setToDoItem({ ...toDoItem, title: e.target.value, })}
                />}
                <div className={bemElClassName(`${theme}-Actions`)}>
                    <Button darkTheme={theme}
                        onClick={() => shownInput ? saveTask() : addTask()}
                        children={shownInput ? "Сохранить" : "Добавить"} />

                    {shownInput && <Button darkTheme={theme}
                        onClick={() => {
                            setToDoItem({ ...toDoItem, title: "", })
                            setShowInput(false)
                        }}
                        children={"Отмена"} />
                    }
                </div>


            </div>}
        </Slide>
    </TransitionGroup>


}

export default React.memo(DaySchedule);