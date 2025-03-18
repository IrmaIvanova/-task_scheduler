import * as React from 'react'
import { Header } from '../Header/Header'
import { weekdaysArray, monthArray } from '../../constants'
import { Body } from '../Body/Body'
import { LayoutProps, cnLayoutBody } from './Layout.index'
import "./Layout.scss"
import { Button } from '../../elements/Button/Button'
import { useAppContext } from '../../context/AppContext/AppContextProvider'
import { useResize } from '../../hooks/resizeHook/resizeHook'




export const Layout: React.FC<LayoutProps> = () => {
    let today = new Date();
    const { darkTheme, toggleTheme, open, toggleOpen, showDayPlan, toggleShowDayPlan } = useAppContext();

    const actualYear = today.getFullYear()
    let actualMonth = today.getMonth();

    let { isScreenLg, isScreenMd, isScreenSm, isScreenXl, isScreenXxl, width } = useResize()



    return <div className={cnLayoutBody(`${darkTheme ? "NightTheme" : "DayTheme"}`)}>


        <div style={{ width: open && (isScreenLg || isScreenXl || isScreenXxl) ? "60%" : "100%" }}>
            <button
                className={cnLayoutBody(`switch-btn ${darkTheme ? "LayoutBody__switch-on" : " "}`)}
                onClick={() => toggleTheme()}
            >

            </button>
            <Header
                darkTheme={darkTheme}
                month={monthArray[showDayPlan.getMonth()]}
                year={showDayPlan.getFullYear()} />

            <Body
                darkTheme={darkTheme}
                today={today.getDate()}
                actualYear={actualYear}
                actualMonth={actualMonth}
                selectMonth={showDayPlan.getMonth()}
                selectYear={showDayPlan.getFullYear()}
                weekdays={weekdaysArray} 
                width={width}/>
        </div>

        <div id="DayScheduleBox" style={{ width: !open ? "0" : open && (isScreenLg || isScreenXl || isScreenXxl) ? "40%" : "100% " }}></div>
    </div>

}