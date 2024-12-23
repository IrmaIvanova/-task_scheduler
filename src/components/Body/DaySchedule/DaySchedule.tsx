import * as React from "react"
import { DayScheduleProps, cnDaySchedule } from './DaySchedule.index'
import { TransitionGroup } from '../../../elements/Transitions/Transitions'
import { useAppContext } from '../../../context/AppContext/AppContextProvider'
import { weekdaysArrayAmerican } from '../../../constants'
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import './DaySchedule.scss'


export const DaySchedule: React.FC<DayScheduleProps> = () => {

    const {
        showDayPlan,

        toggleShowDayPlan,
        toggleOpen,
        open,
        darkTheme
    } = useAppContext();

    const theme = darkTheme ? "NightTheme" : "DayTheme";
console.log("showDayPlan", showDayPlan)

    return <TransitionGroup>
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
            {open && <div className={cnDaySchedule(`${theme}`)}>


                <div className={cnDaySchedule(`${theme}-Header`)}>
                    <div className={cnDaySchedule(`${theme}-Header-Navigation`)}>
                        <IconButton sx={{ color: darkTheme ? "#fff" : "#000" }}
                            onClick={() => { toggleShowDayPlan(new Date(showDayPlan.getFullYear(), showDayPlan.getMonth(),  showDayPlan.getDate() - 1)) }}>
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                        <Typography variant="h6">
                            {weekdaysArrayAmerican[showDayPlan.getDay()]}, {showDayPlan.getDate()}
                        </Typography>
                        <IconButton sx={{ color: darkTheme ? "#fff" : "#000" }}
                            onClick={() => {toggleShowDayPlan(new Date(showDayPlan.getFullYear(), showDayPlan.getMonth(),  showDayPlan.getDate() + 1)) }}
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
            </div>}
        </Slide>
    </TransitionGroup>


}