import * as React from "react"
import { IToDoItem, cnToDoItem, IToDoItemOwnProps } from './ToDoItem.index'
import "./ToDoItem.scss"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

export const BaseToDoItemObject = {
    title: "",
    time: "",
    id: "",
    checked: false
}
export const ToDoItem: React.FC<IToDoItemOwnProps> = ({ id, time, title, theme }) => {

    return <div className={cnToDoItem(`${theme}-taskList-item`)}>
        {/* {el.time}: */}
        {title}
        <div className={cnToDoItem(`${theme}-taskList-item ControllButtons`)}>
            <IconButton >
                <CheckIcon />
            </IconButton>
            <IconButton >
                <DeleteIcon />
            </IconButton>
        </div>
    </div>
}