import * as React from "react"
import { useAppContext } from '../../../context/AppContext/AppContextProvider'
import { v4 as uuidv4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/store'
import { addItemToPlanner } from '../../../redux/reducers/plannerReducer'
import { Task, addTask as addTastToRedux, checkTask as checkTaskToRedux, deleteTask as deleteTaskToRedux } from '../../../redux/reducers/tasksReducer'
import { APIList } from '../../../RestAPI/requests/index.api'
import { TaskResponse } from "../../../RestAPI/models/response/TaskResponse"
import debounce from 'lodash.debounce'

interface ErrorState {
    title?: {
        error: boolean
        message: string
    }
}

export const useDayScheduleHook = () => {
    const {
        showDayPlan,
        toggleShowDayPlan,
        toggleOpen,
        open,
        theme,
        darkTheme
    } = useAppContext()

    const { createDay, saveTaskToDB, changeTaskInDB, deleteTaskFromDB } = APIList

    const selectedDay = React.useMemo(() => {
        const month = showDayPlan.getMonth() < 9 
            ? `0${showDayPlan.getMonth() + 1}` 
            : `${showDayPlan.getMonth() + 1}`
        return `${showDayPlan.getDate()}.${month}.${showDayPlan.getFullYear()}`
    }, [showDayPlan])

    const userId = useSelector((state: RootState) => state.user.user.id) || undefined

    const baseDayList = React.useMemo(() => ({
        id: selectedDay,
        date: selectedDay,
        userId
    }), [selectedDay, userId])

    const baseTodoItem = React.useMemo(() => ({
        title: "",
        id: "",
        date: selectedDay,
        checked: false,
        plannerId: selectedDay,
    }), [selectedDay])

    const [shownInput, setShowInput] = React.useState(false)
    const [error, setError] = React.useState<ErrorState>({})
    const [toDoItem, setToDoItem] = React.useState<Task>(baseTodoItem)

    const dayPlan = useSelector((state: RootState) => 
        state.planner.plannerCollection[selectedDay]
    ) || undefined

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
        }
    }, [dayPlan, baseDayList, createDay, dispatch])

    // Debounced title update
    const debouncedUpdateTitle = React.useMemo(
        () => debounce((title: string) => {
            setToDoItem(prev => ({ ...prev, title }))
        }, 1000),
        []
    )

    // Cleanup debounce on unmount
    React.useEffect(() => {
        return () => {
            debouncedUpdateTitle.cancel()
        }
    }, [debouncedUpdateTitle])

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        // Clear error if user starts typing
        if (error.title?.error && value.trim()) {
            setError(prev => ({ ...prev, title: undefined }))
        }
        debouncedUpdateTitle(value)
    }


    

    // TODO fix  multiple rerender 
    console.log("dayPlan", dayPlan)

    const addTask = React.useCallback(() => {
        setShowInput(true)
        setToDoItem(prev => ({
            ...prev,
            plannerId: dayPlan?.id || selectedDay,
            date: dayPlan?.id || selectedDay,
            id: uuidv4()
        }))
    }, [dayPlan, selectedDay])

    const saveTask = React.useCallback(() => {
        if (!toDoItem.title.trim()) {
            return setError({
                title: {
                    error: true,
                    message: "Поле обязательно для заполнения"
                }
            })
        }

        setShowInput(false)
        
        if (!dayPlan) return

        const taskToSave = { ...toDoItem }
        saveTaskToDB(taskToSave)

        dispatch(addItemToPlanner({
            id: dayPlan.date,
            item: {
                ...dayPlan,
                tasks: [...dayPlan.tasks, taskToSave],
                taskIDS: [...dayPlan.taskIDS, taskToSave.id]
            }
        }))

        dispatch(addTastToRedux({
            id: taskToSave.id,
            item: taskToSave
        }))

        setToDoItem(baseTodoItem)
        setError({})
    }, [toDoItem, dayPlan, saveTaskToDB, dispatch, baseTodoItem])

    const checkTask = React.useCallback((id: string, task: TaskResponse) => {
        dispatch(checkTaskToRedux({ id }))
        changeTaskInDB(id, { ...task, checked: !task.checked })
    }, [dispatch, changeTaskInDB])

    const deleteTask = React.useCallback((id: string) => {
        if (!dayPlan) return

        const filteredTodoListIDS = dayPlan.taskIDS.filter(todoItemID => todoItemID !== id)
        const filteredTodoList = dayPlan.tasks.filter(todoItem => todoItem.id !== id)

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
    }, [dayPlan, deleteTaskFromDB, dispatch])

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
        error,
        setToDoItem,
        setShowInput,
        handleTitleChange, // Добавлен новый обработчик
        addTask,
        saveTask,
        checkTask,
        deleteTask
    }
}