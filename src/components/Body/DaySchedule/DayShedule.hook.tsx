import * as React from "react"
import { useAppContext } from '../../../context/AppContext/AppContextProvider'
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/store'
import {
    addItemToPlanner,
} from '../../../redux/reducers/plannerReducer'
import {
    Task,
    addTask as addTastToRedux,
    checkTask as checkTaskToRedux,
    deleteTask as deleteTaskToRedux,

} from '../../../redux/reducers/tasksReducer'




import { APIList } from '../../../API/index.api'
import { TaskResponse } from "../../../models/response/TaskResponse";

export const useDayScheduleHook = () => {

    const {
        showDayPlan,
        toggleShowDayPlan,
        toggleOpen,
        open,
        theme,
        darkTheme
    } = useAppContext();

    const { createDay, saveTaskToDB, changeTaskInDB, deleteTaskFromDB } = APIList;

    let month = showDayPlan.getMonth() < 9 ? `0${showDayPlan.getMonth() + 1}` : `${showDayPlan.getMonth() + 1}`


    let selectedDay = `${showDayPlan.getDate()}.${month}.${showDayPlan.getFullYear()}`;
    const userId = useSelector((state: RootState) => {
        return state.user.user.id
    }) || undefined;

    const baseDayList = {
        id: selectedDay,
        date: selectedDay,
        userId
    }

    const baseTodoItem = {
        title: "",
        id: "",
        date: selectedDay,
        checked: false,
        plannerId: selectedDay,
    }


    const [shownInput, setShowInput] = React.useState(false)

    const [toDoItem, setToDoItem] = React.useState<Task>(baseTodoItem)

    const dayPlan = useSelector((state: RootState) => {
        return state.planner.plannerCollection[selectedDay]
    }) || undefined;




    const dispatch = useDispatch()

    React.useEffect(() => {

        if (!dayPlan) {
            createDay(baseDayList.date, baseDayList)
            dispatch(addItemToPlanner({
                id: baseDayList.date,
                item: {
                    ...baseDayList,
                    tasks: [],
                    taskIDS: [],
                }
            }))
        };

    }, [dayPlan])



    // TODO fix  multiple rerender 
    // console.log("dayPlan", dayPlan)



    const addTask = () => {
        setShowInput(true)

        setToDoItem({ ...toDoItem, plannerId: dayPlan.id, date: dayPlan.id, id: uuidv4() })

    }

    const saveTask = () => {
        setShowInput(false)

        saveTaskToDB(toDoItem)


        dispatch(addItemToPlanner({
            id: dayPlan.date,
            item: {
                ...dayPlan,
                tasks: [...dayPlan.tasks, toDoItem],
                taskIDS: [...dayPlan.taskIDS, toDoItem.id]
            }
        }))


        dispatch(addTastToRedux({
            id: toDoItem.id,
            item: toDoItem
        }))


        setToDoItem(baseTodoItem)
    }



    const checkTask = (id: string, task: TaskResponse) => {


        dispatch(checkTaskToRedux({ id }))

        changeTaskInDB(id, { ...task, checked: !task.checked })

    };

    const deleteTask = (id: string) => {

        const filteredTodoListIDS = dayPlan.taskIDS.filter((todoItemID) => todoItemID !== id);
        const filteredTodoList = dayPlan.tasks.filter((todoItem) => todoItem.id !== id);

        deleteTaskFromDB(id)

        dispatch(addItemToPlanner({
            id: dayPlan.date,
            item: {
                ...dayPlan,
                tasks: filteredTodoList,
                taskIDS: filteredTodoListIDS
            }
        }))

        dispatch(deleteTaskToRedux({ id }))

    };


    return {
        showDayPlan,
        toggleShowDayPlan,
        toggleOpen,
        open,
        theme,
        darkTheme,
        dayPlan,
        shownInput,
        toDoItem,
        setToDoItem,
        setShowInput,
        addTask,
        saveTask,
        checkTask,
        deleteTask
    }
}