import * as React from "react"
import { IToDoItem, cnToDoItem, IToDoItemOwnProps } from './ToDoItem.index'
import "./ToDoItem.scss"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'


export const ToDoItem: React.FC<IToDoItemOwnProps> = ({
    id,
    theme,
    // checked,
    onCheckClick,
    onDelClick }) => {

    const item = useSelector((state: RootState) => {
        return state.tasks.tasksCollection[id]
    });

    if (!item) return;

    return <div className={cnToDoItem(`${theme}-taskList-item`)}>
        {/* {el.time}: */}
        {item.title}
        <div className={cnToDoItem(`${theme}-taskList-item ControllButtons`)}>
            <IconButton
                onClick={() => onCheckClick(id, item)}
            >
                {item.checked ? <CheckIcon /> : <RemoveDoneIcon />}
            </IconButton>
            <IconButton
                onClick={() => onDelClick(id)}>
                <DeleteIcon />
            </IconButton>
        </div>
    </div>
}