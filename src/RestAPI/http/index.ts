import axios from 'axios'

// export const API_URL =`http://localhost:5000/api`
export const API_URL =`https://backend-one-beta-73.vercel.app/api`
// export const API_URL =`https://backend-git-dev-irmas-projects-89b5f685.vercel.app/api`


const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
   
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
 
    return config
})

export default $api