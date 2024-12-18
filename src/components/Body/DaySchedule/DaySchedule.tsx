import * as React from "react"
import { DayScheduleProps, cnDaySchedule } from './DaySchedule.index'
import { TransitionGroup } from '../../../elements/Transitions/Transitions'
import { useAppContext } from '../../../context/AppContext/AppContextProvider'
import { weekdaysArrayAmerican } from '../../../constants'
import Slide from '@mui/material/Slide';
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


    return <TransitionGroup>
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
           {open &&  <div className={cnDaySchedule(`${theme}`)}>




                <div className={cnDaySchedule(`${theme}-Title`)}>
                    <div>
                        {weekdaysArrayAmerican[showDayPlan.getDay()]}, {showDayPlan.getDate()}
                    </div>
                    <div onClick={() => { toggleOpen(false) }}>x</div>
                </div>
            </div>}
        </Slide>
    </TransitionGroup>


}