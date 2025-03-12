import * as React from 'react'
import { Header } from '../Header/Header'
import { weekdaysArray, monthArray } from '../../constants'
import { Body } from '../Body/Body'
import { LayoutProps, cnLayoutBody } from './Layout.index'
import "./Layout.scss"
import { Button } from '../../elements/Button/Button'
import { useAppContext } from '../../context/AppContext/AppContextProvider'

export const Layout: React.FC<LayoutProps> = () => {
    let today = new Date();
    const { darkTheme, toggleTheme, open, toggleOpen, showDayPlan, toggleShowDayPlan } = useAppContext();

    const actualYear = today.getFullYear()
    let actualMonth = today.getMonth();

    const monthChangeButton = (forward: boolean) => {
        if (forward) {
            toggleShowDayPlan(new Date(showDayPlan.getFullYear(), showDayPlan.getMonth() + 1, showDayPlan.getDate()))
            toggleOpen(false)

        } else {
            toggleShowDayPlan(new Date(showDayPlan.getFullYear(), showDayPlan.getMonth() - 1, showDayPlan.getDate()))
            toggleOpen(false)

        }
  

    }

    return <div className={cnLayoutBody(`${darkTheme ? "NightTheme" : "DayTheme"}`)}>


        <div style={{ width: open ? "80%" : "100%" }}>
            <div className={cnLayoutBody("ButtonBox")} >
                <div className={cnLayoutBody("ButtonBox-ForwardBack")} >

                    <Button darkTheme={darkTheme} arrow={'left'} onClick={() => monthChangeButton(false)} children='назад' />
                    <Button darkTheme={darkTheme} 
                    onClick={() =>  toggleShowDayPlan(new Date())} 
                    children='сегодня' />
                    <Button darkTheme={darkTheme} arrow={'right'} onClick={() => monthChangeButton(true)} children='вперёд' />
                </div>
                <button
                    className={cnLayoutBody(`switch-btn ${darkTheme ? "LayoutBody__switch-on" : " "}`)}
                    onClick={() => toggleTheme()}
                >

                </button>
            </div>
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
                weekdays={weekdaysArray} />
        </div>

        <div id="DayScheduleBox" style={{ width: open ? "20%" : "0" }}></div>
    </div>

}