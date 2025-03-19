import * as React from "react"
import { IToDoItem, cnToDoItem, IToDoItemOwnProps } from './ToDoItem.index'
import "./ToDoItem.scss"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';

export const BaseToDoItemObject = {
    title: "",
    time: "",
    id: "",
    checked: false,

}
export const ToDoItem: React.FC<IToDoItemOwnProps> = ({ id,
    time,
    title,
    theme,
    checked,
    onCheckClick,
    onDelClick}) => {

    return <div className={cnToDoItem(`${theme}-taskList-item`)}>
        {/* {el.time}: */}
        {title}
        <div className={cnToDoItem(`${theme}-taskList-item ControllButtons`)}>
            <IconButton
                onClick={() => onCheckClick(id)}
            >
                {checked ? <CheckIcon /> : <RemoveDoneIcon />}
            </IconButton>
            <IconButton 
            onClick={()=>onDelClick(id)}>
                <DeleteIcon />
            </IconButton>
        </div>
    </div>
}