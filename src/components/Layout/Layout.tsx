import * as React from 'react'
import { Header } from '../Header/Header'
import { weekdaysArray, monthArray } from '../../constants'
import { Body } from '../Body/Body'
import { LayoutProps, cnLayoutBody } from './Layout.index'
import "./Layout.scss"
import { Button } from '../../elements/Button/Button'
export const Layout: React.FC<LayoutProps> = () => {
    let today = new Date();

    const [selectMonth, setSelectMonth] = React.useState(today.getMonth())
    const [selectYear, setSelectYear] = React.useState(today.getFullYear())
    const [darkTheme, setDarkTheme] = React.useState(false)

    console.log("selectMonth", selectMonth)

    const actualYear = today.getFullYear()
    let actualMonth = today.getMonth();

    const monthChangeButton = (forward: boolean) => {
        if (forward) {
            setSelectMonth((selectMonth + 1) === monthArray.length ? 0 : selectMonth + 1)
            if ((selectMonth + 1) === monthArray.length) {
                setSelectYear(selectYear + 1)
            }
        } else {
            setSelectMonth(selectMonth - 1 === -1 ? 11 : selectMonth - 1)
            if ((selectMonth + 1) === -1 || selectMonth === 0) {
                setSelectYear(selectYear - 1)
            }
        }

    }

    return <div className={cnLayoutBody(`${darkTheme ? "NightTheme" : "DayTheme"}`)}>
        <div className={cnLayoutBody("ButtonBox")} >
            <div className={cnLayoutBody("ButtonBox-ForwardBack")} >

                <Button darkTheme={darkTheme} arrow={'left'} onClick={() => monthChangeButton(false)} children='назад' />
                <Button darkTheme={darkTheme} arrow={'right'} onClick={() => monthChangeButton(true)} children='вперёд' />
            </div>
            <button
                className={cnLayoutBody(`switch-btn ${darkTheme ? "LayoutBody__switch-on" : " "}`)}
                onClick={() => setDarkTheme(!darkTheme)}
            >

            </button>
        </div>
        <Header
            darkTheme={darkTheme}
            month={monthArray[selectMonth]}
            year={selectYear} />

        <Body
            darkTheme={darkTheme}
            today={today.getDate()}
            actualYear={actualYear}
            actualMonth={actualMonth}
            selectMonth={selectMonth}
            selectYear={selectYear}
            weekdays={weekdaysArray} />
    </div>
}