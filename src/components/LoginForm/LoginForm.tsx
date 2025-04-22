import * as React from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '../../elements/Button/Button'
import { useAppContext } from '../../context/AppContext/AppContextProvider'
// import { login, registration } from '../../redux/reducers/userReducer'
import AuthService from '../../services/AuthService';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../redux/reducers/userReducer'

export interface ILoginForm {

}

export const LoginForm: React.FC<ILoginForm> = () => {


    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [name, setName] = React.useState<string>('')

    const {
        theme,
    } = useAppContext();
    const dispatch = useDispatch()

//    const isAuth = useSelector((state: RootState) => {
//         return state.user.isAuth
//     }) ;


    const login = async function (email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log("response", response.data.user)
            localStorage.setItem('token', response.data.accessToken)
            // dispatch(setAuth(true));
            dispatch(setUser({ data: response.data.user, isAuth: true }))
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
    return <div>
        <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Имя' />
        <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Почта' />
        <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Пароль' />

        <Button darkTheme={theme} onClick={() => login(email, password)}>
            Войти
        </Button>
        <Button darkTheme={theme} onClick={() => { "registration(email, password, name)" }}>
            Регистрация
        </Button>
    </div>
}