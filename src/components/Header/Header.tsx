import * as React from "react"
import {
    HeaderProps,
    cnCalendarHeader
} from "./Header.index"
import "./Header.scss"
import { useAppContext } from '../../context/AppContext/AppContextProvider'
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { DropDown } from '../../elements/Dropdown/Dropdown'
import { monthArray, createArrayYears } from '../../constants'

let today = new Date()
let yearOptions = createArrayYears(new Date().getFullYear())


export const Header: React.FC<HeaderProps> = ({ month, year }) => {

    const { theme, toggleOpen, showDayPlan, toggleShowDayPlan } = useAppContext();



    const monthChangeButton = (forward: boolean) => {
        if (forward) {
            toggleShowDayPlan(new Date(showDayPlan.getFullYear(), showDayPlan.getMonth() + 1, showDayPlan.getDate()))
            toggleOpen(false)

        } else {
            toggleShowDayPlan(new Date(showDayPlan.getFullYear(), showDayPlan.getMonth() - 1, showDayPlan.getDate()))
            toggleOpen(false)

        }


    }

    const handleMonthChange = (value) => {
        let monthIndex = monthArray.findIndex(el => el === value)
        toggleShowDayPlan(new Date(showDayPlan.getFullYear(), monthIndex, showDayPlan.getDate()))

    }
    const handleYearChange = (value) => {
        toggleShowDayPlan(new Date(value, showDayPlan.getMonth(), showDayPlan.getDate()))

    }

    const themeColor = theme === "DayTheme" ? "#000" : "#ffffffa3"

    return <div className={cnCalendarHeader(`${theme}`)}>
        <IconButton sx={{ color: themeColor }}
            onClick={() => monthChangeButton(false)}>
            <KeyboardArrowLeftIcon />
        </IconButton>

        <div className={cnCalendarHeader(`DateShow`)}>
            <DropDown
                color={themeColor}
                options={[monthArray[today.getMonth()], "-", ...monthArray]}
                defText={monthArray[showDayPlan.getMonth()]}
                handleChange={handleMonthChange}
            />
            <DropDown
                color={themeColor}
                options={[today.getFullYear(), "-", ...yearOptions]}
                defText={showDayPlan.getFullYear()}
                handleChange={handleYearChange} />
        </div>

        <IconButton sx={{ color: themeColor}}
            onClick={() => monthChangeButton(true)}
        >
            <KeyboardArrowRightIcon />
        </IconButton>

    </div>;
};