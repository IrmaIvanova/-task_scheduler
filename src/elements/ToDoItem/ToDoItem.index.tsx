import { createCn as cn } from "bem-react-classname"
import { TaskResponse as Task } from '../../models/response/TaskResponse'
export const cnToDoItem = cn("ToDoItem")

export interface IToDoItem {
    // title: string,
    // time: string,
    id: string,
    // checked: boolean,

}


export interface IToDoItemOwnProps extends IToDoItem {
    theme: string;
    onCheckClick: (id: string, item: Task) => void
    onDelClick: (id: string) => void
}