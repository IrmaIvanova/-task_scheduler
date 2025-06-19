import * as React from 'react'
import { Header } from '../Header/Header'
import { weekdaysArray, monthArray } from '../../constants'
import { Body } from '../Body/Body'
// import { Body } from '../Body/BodyOptimized'
import { LayoutProps, cnLayoutBody } from './Layout.index'
import "./Layout.scss"
import { Button } from '../../elements/Button/Button'
import { useAppContext } from '../../context/AppContext/AppContextProvider'
import { useResize } from '../../hooks/resizeHook/resizeHook'
import { LoginForm } from '../LoginForm/LoginForm'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import axios from 'axios';
import { AuthResponse } from '../../RestAPI/models/response/AuthResponse';
import { API_URL } from '../../RestAPI/http';
import { setUser, setLoading } from '../../redux/reducers/userReducer'
import CircularProgress from '@mui/material/CircularProgress';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import AuthService from '../../RestAPI/services/AuthService'
import { createBem } from '../../elements/HelperBemClassName/HelperBemClassName'


const { bemElClassName } = createBem('LayoutBody');
export const Layout: React.FC<LayoutProps> = () => {
    let today = new Date();
    const { theme, toggleTheme, open, toggleOpen, darkTheme, showDayPlan, toggleShowDayPlan } = useAppContext();

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
        dispatch(setLoading({ isLoading: true }))
        try {

            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken)

            dispatch(setUser({ data: response.data.user, isAuth: true }))
        } catch (e) {
            console.log("error chechAuth", e.response?.data)
        } finally {
            dispatch(setLoading({ isLoading: false }))
        }
    }

    const logout = async function () {
        try {
            const response = await AuthService.logout();

            localStorage.removeItem('token')
            dispatch(setUser({ data: null, isAuth: false }))
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }


    React.useEffect(() => {
        if (localStorage.getItem("token")) {

            chechAuth()
        }
    }, [])

    const themeColor = theme === "DayTheme" ? "#000" : "#ffffffa3"

    if (user.isLoading) {
        return <div className={bemElClassName(`${theme}`)}> <CircularProgress /></div>
    }
    if (!user.isAuth) {
        return <div className={bemElClassName(`${theme} LoginForm`)}>

            <h1 style={{ color: themeColor }}>
                {"Авторизуйтесь"}
            </h1>
            <LoginForm />
        </div>
    }

    return <div className={bemElClassName(`${theme}`)} style={{ height: open ? "100%" : "100vh" }}>
        <div style={{ width: open && (isScreenLg || isScreenXl || isScreenXxl) ? "60%" : "100%" }}>
            <div className={bemElClassName(`${theme}-actionBar`)}>

                <h3 style={{ color: themeColor }}>
                    {`Привет, ${user.user?.name ? user.user?.name : user.user?.email}`}
                </h3>

                <IconButton onClick={() => logout()}>
                    <LogoutIcon sx={{ color: themeColor }} />
                </IconButton>

                <button
                    className={bemElClassName(`switch-btn ${theme === "NightTheme" ? "LayoutBody__switch-on" : " "}`)}
                    onClick={() => toggleTheme()}
                >

                </button>

            </div>
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


        <div id="DayScheduleBox" style={{ width: !open ? "0" : open && (isScreenLg || isScreenXl || isScreenXxl) ? "40%" : "100% " }}></div>
    </div>


}