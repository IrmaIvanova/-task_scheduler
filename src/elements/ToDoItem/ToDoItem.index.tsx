import {createCn as cn} from "bem-react-classname"

export const cnToDoItem = cn("ToDoItem")

export interface IToDoItem {
    title: string,
    time: string,
    id: string,
    checked: boolean,
 
}


export interface IToDoItemOwnProps extends IToDoItem{
    theme: string;
    onCheckClick: (id:string)=> void
    onDelClick: (id:string)=> void
}