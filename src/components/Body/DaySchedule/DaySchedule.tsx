import * as React from "react"
import { DayScheduleProps, cnDaySchedule } from './DaySchedule.index'
import { TransitionGroup } from '../../../elements/Transitions/Transitions'
import { useAppContext } from '../../../context/AppContext/AppContextProvider'


export const DaySchedule: React.FC<DayScheduleProps> = () => {

    const {
        showDayPlan,
        toggleShowDayPlan,
        toggleOpen,
        open
    } = useAppContext();

    return <TransitionGroup
    // component={<div 
    //     style={{
    //     display: 'flex',
    //     position: 'fixed',
    //     right: 0,
    //     height: "100vh",
    //     maxWidth: '100%',
    //     // backgroundColor: '#194776',
    //     zIndex: 90,
    //     transition: `max-width 0.25s ease-in-out`,
    //     backgroundColor: '#FFFFFF',
    // }}
    // >
    //     кукареку
    // </div>}
    // className={cnDaySchedule("")}
    // className={cnDaySchedule({ stayOpened, hide, opened }, [className])}
    // sx={{
    //     maxWidth: opened ? 300 : !opened ? 93 : undefined,
    //     overflowX: 'auto'
    // }}
    // onClick={() => {
    //     if (opened) {
    //         return
    //     }
    //     else {
    //         setOpened(true)
    //     }
    // }}
    >
        <div>
            {open && new Date(showDayPlan).toISOString()}

        </div>
        <div onClick={() => { toggleOpen(false) }}>x</div>
    </TransitionGroup>


}