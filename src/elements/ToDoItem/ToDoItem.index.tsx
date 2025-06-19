import cn from 'classnames';
import { TaskResponse as Task } from '../../RestAPI/models/response/TaskResponse'

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