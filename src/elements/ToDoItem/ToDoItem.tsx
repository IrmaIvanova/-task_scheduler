import * as React from "react"
import { IToDoItem, cnToDoItem, IToDoItemOwnProps } from './ToDoItem.index'
import "./ToDoItem.scss"

export const BaseToDoItemObject={
    title: "",
    time: "",
    id: "",
    checked:false
}
export const ToDoItem: React.FC<IToDoItemOwnProps> = ({ id, time, title, theme }) => {

    return <div className={cnToDoItem(`${theme}-taskList-item`)}>
        {/* {el.time}: */}
        {title}
    </div>
}