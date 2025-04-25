import $api from "../http";
import { AxiosResponse } from "axios";
import { TaskResponse } from "../models/response/TaskResponse";



const TASK_URL = "/task"

export default class TaskService {
    static async createTask(task: TaskResponse): Promise<AxiosResponse<TaskResponse>> {
        return $api.post<TaskResponse>(TASK_URL, task)
    }
    static async changeTask(taskId: string, task: TaskResponse): Promise<AxiosResponse<TaskResponse[]>> {
        return $api.put<TaskResponse[]>(`${TASK_URL}/${taskId}`, task)
    }

    static async deleteTask(taskId: string): Promise<void> {
        return $api.delete(`${TASK_URL}/${taskId}`)
    }
}