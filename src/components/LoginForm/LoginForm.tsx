import * as React from 'react'

import { Button } from '../../elements/Button/Button'
import { useAppContext } from '../../context/AppContext/AppContextProvider'
// import { login, registration } from '../../redux/reducers/userReducer'
import AuthService from '../../RestAPI/services/AuthService';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../redux/reducers/userReducer'
import { TabsComponent } from '../../elements/Tabs/Tabs';
import Alert from '@mui/material/Alert';
import { TextField } from '../../elements/TextField/TextField'
export interface ILoginForm {

}

export const LoginForm: React.FC<ILoginForm> = () => {



    const [value, setValue] = React.useState(0);
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [name, setName] = React.useState<string>('')
    // {fieldName: "password", error: false}, {fieldName: "email", error: false}
    const [error, setError] = React.useState({})
    const [showVarning, setShowVarning] = React.useState({ show: false, message: "" })


    const {
        theme,
    } = useAppContext();
    const dispatch = useDispatch()

    const login = async function (email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken)
            dispatch(setUser({ data: response.data.user, isAuth: true }))
        } catch (e) {
            setShowVarning({ show: true, message: e.response?.data?.message })
            console.log(e.response?.data?.message)
        }
    }


    const registration = async function (email: string, password: string, name: string) {
        try {
            const response = await AuthService.registration(email, password, name);
            localStorage.setItem('token', response.data.accessToken)
            dispatch(setUser({ data: response.data.user, isAuth: true }))
        } catch (e) {
            setShowVarning({ show: true, message: e.response?.data?.message })
            console.log(e.response?.data?.message)
        }
    }

    return <>

        <TabsComponent
        theme={theme}
            value={value}
            setValue={setValue}
            options={[
                { label: "Вход" },
                { label: "Регистрация" }]} />
        {showVarning.show && <Alert variant="filled" severity="error">
            {showVarning.message}
        </Alert>}

        {value === 1 && <TextField
            variant='outlined'
            theme={theme}
            value={name}
            onChange={(e) => setName(e.target.value)}
            label='Имя'
             />}

        <TextField
            variant='outlined'
            required
            value={email}
            error={error["email"]?.error}
            helperText={error["email"]?.message}
            theme={theme}
            onChange={(e) => {
                setEmail(e.target.value)
                setError({})
            }}
            label='Почта' />

        <TextField
            variant='outlined'
            theme={theme}
            required
            error={error["password"]?.error}
            helperText={error["password"]?.message}
            onChange={(e) => {
                setPassword(e.target.value);
                setError({})
            }}
            label='Пароль'
        />

        <Button darkTheme={theme} onClick={() => {
            setError({
                "password": {
                    error: password.length === 0,
                    message: password.length === 0 ? "Поле обязательно для заполнения" : ""
                },
                "email": {
                    error: email.length === 0,
                    message: email.length === 0 ? "Поле обязательно для заполнения" : ""
                }
            })

            if (password.length > 0 && email.length > 0) {
                value === 0 ? login(email, password) : registration(email, password, name)
            }
        }}
        >
            {value === 0 ? "Войти" : "Создать учётную запись"}
        </Button>

    </>
}