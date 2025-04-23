import * as React from 'react'
import { Header } from '../Header/Header'
import { weekdaysArray, monthArray } from '../../constants'
import { Body } from '../Body/Body'
import { LayoutProps, cnLayoutBody } from './Layout.index'
import "./Layout.scss"
import { Button } from '../../elements/Button/Button'
import { useAppContext } from '../../context/AppContext/AppContextProvider'
import { useResize } from '../../hooks/resizeHook/resizeHook'
import { LoginForm } from '../LoginForm/LoginForm'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import axios from 'axios';
import { AuthResponse } from '../../models/response/AuthResponse';
import { API_URL } from '../../http';
import { setUser } from '../../redux/reducers/userReducer'


export const Layout: React.FC<LayoutProps> = () => {
    let today = new Date();
    const { theme, toggleTheme, open, toggleOpen, showDayPlan, toggleShowDayPlan } = useAppContext();

    const actualYear = today.getFullYear()
    let actualMonth = today.getMonth();
    // "NightTheme" : "DayTheme"
    let { isScreenLg, isScreenMd, isScreenSm, isScreenXl, isScreenXxl, width } = useResize()

    // ${darkTheme ? "NightTheme" : 
    const user = useSelector((state: RootState) => {
        return state.user
    });
    const dispatch = useDispatch()

    const chechAuth = async function () {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken)

            dispatch(setUser({ data: response.data.user, isAuth: true }))
        } catch (e) {
            console.log("error chechAuth", e.response?.data)
        }
    }

    React.useEffect(() => {
        if (localStorage.getItem("token")) {
            chechAuth()
        }
    }, [])

    return <div className={cnLayoutBody(`${theme}`)}>
        {!user.isAuth ? <>
            <h1>
                {user.isAuth ? `Пользователь авторизован ${user.user.email}` : "Авторизуйтесь"}
            </h1>
            <LoginForm /> </> :

            <div style={{ width: open && (isScreenLg || isScreenXl || isScreenXxl) ? "60%" : "100%" }}>
                <button
                    className={cnLayoutBody(`switch-btn ${theme === "NightTheme" ? "LayoutBody__switch-on" : " "}`)}
                    onClick={() => toggleTheme()}
                >

                </button>
                <Header
                    theme={theme}
                    month={monthArray[showDayPlan.getMonth()]}
                    year={showDayPlan.getFullYear()} />

                <Body
                    theme={theme}
                    today={today.getDate()}
                    actualYear={actualYear}
                    actualMonth={actualMonth}
                    selectMonth={showDayPlan.getMonth()}
                    selectYear={showDayPlan.getFullYear()}
                    weekdays={weekdaysArray}
                    width={width} />
            </div>
             } 

        <div id="DayScheduleBox" style={{ width: !open ? "0" : open && (isScreenLg || isScreenXl || isScreenXxl) ? "40%" : "100% " }}></div>
    </div>


}