import axios from 'axios'

export const API_URL =`https://backend-one-beta-73.vercel.app/api`
// export const API_URL =`https://backend-git-dev-irmas-projects-89b5f685.vercel.app/api`


const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers:{
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
 
    return config
})

export default $api