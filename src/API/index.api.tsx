import { createDay } from './planner.api'
import { saveTaskToDB, deleteTaskFromDB, changeTaskInDB} from './task.api'

export const APIList = {
    createDay,

    // task async functions
    saveTaskToDB,
    deleteTaskFromDB,
    changeTaskInDB
}