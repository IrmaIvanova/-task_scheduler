import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../models/IUser'
import AuthService from '../../services/AuthService'

interface UserState {
    // accessToken: string
    // refreshToken: string
    isAuth: boolean,
    user: IUser | null
}

const initialState: UserState = {
    // accessToken: "",
    // refreshToken: "",
    isAuth: false,
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            let { data, isAuth } = action.payload
            console.log("data",  action.payload)
            state.user = data;
            state.isAuth = isAuth;
        },
     

    },


})

// Функция действия генерируется на каждую функцию релюсера(reducer), определённую в createSlice
export const { setUser } = userSlice.actions


// export const registration = async function (email: string, password: string, name: string) {
//     try {
//         const response = await AuthService.registration(email, password, name);
//         console.log("response", response)
//         localStorage.setItem('token', response.data.accessToken)
//         setAuth(true);
//         setUser(response.data.user)
//     } catch (e) {
//         console.log(e.response?.data?.message)
//     }
// }
// export const logout = async function () {
//     try {
//         const response = await AuthService.logout();
//         console.log("response", response)
//         localStorage.removeItem('token')
//         setAuth(false);
//         setUser(null)
//     } catch (e) {
//         console.log(e.response?.data?.message)
//     }
// }

export default userSlice.reducer;