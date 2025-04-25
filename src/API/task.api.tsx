
import TaskService from '../services/TaskService';
import { TaskResponse as Task } from '../models/response/TaskResponse'

export const saveTaskToDB = async function (task: Task) {
    try {
        const response = await TaskService.createTask(task);
    } catch (e) {
        console.log(e.response?.data?.message)
    }
}
export const deleteTaskFromDB = async function (taskId: string) {
    try {
        const response = await TaskService.deleteTask(taskId);
    } catch (e) {
        console.log(e.response?.data?.message)
    }
}
export const changeTaskInDB = async function (taskId: string, task: Task) {
    try {
        const response = await TaskService.changeTask(taskId, task);
        console.log("task  ", task)
    } catch (e) {
        console.log(e.response?.data?.message)
    }
}

