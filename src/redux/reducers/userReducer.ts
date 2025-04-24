import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../models/IUser'
import AuthService from '../../services/AuthService'

interface UserState {
    isAuth: boolean,
    user: IUser | null,
    isLoading: boolean
}

const initialState: UserState = {
    isAuth: false,
    user: null,
    isLoading: false

}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: false,
        user: null,
        isLoading: false
    
    },
    reducers: { 
         setLoading: (state, action) => {
            let { isLoading } = action.payload

            state.isLoading = isLoading;
            
        },
        setUser: (state, action) => {
            let { data, isAuth } = action.payload;
            

            state.user = data;
            state.isAuth = isAuth;
        }

      

    },


})

// Функция действия генерируется на каждую функцию релюсера(reducer), определённую в createSlice
export const { setUser, setLoading } = userSlice.actions



export default userSlice.reducer;