import { createSlice } from '@reduxjs/toolkit'


export interface Task {
    title: string,
    date?: string,
    id: string,
    checked: boolean,
    plannerId: string
}
interface TasksState {
    tasksCollection: { [key: string]: Task };
    tasksIds: string[]
}

const initialState: TasksState = {
    tasksCollection: {},
    tasksIds: []
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasksCollection: {},
        tasksIds: []
    },
    reducers: {
        setTask: (state, action) => {
            let { listIds, collectionList } = action.payload
            state.tasksCollection = collectionList;
            state.tasksIds = listIds;
        },
        addTask: (state, action) => {
            let { id, item } = action.payload;
            state.tasksCollection[id] = item;
            if (!state.tasksIds.includes(id)) {
                state.tasksIds.push(id);
            }
        },
        checkTask: (state, action) => {
            let { id } = action.payload;
            state.tasksCollection[id] = { ...state.tasksCollection[id], checked: !state.tasksCollection[id].checked };

        },
        deleteTask: (state, action) => {
            let { id } = action.payload;
            state.tasksIds = state.tasksIds.filter((taskId) => taskId !== id)

        },
    }
})

// Функция действия генерируется на каждую функцию релюсера(reducer), определённую в createSlice
export const { setTask, addTask, checkTask, deleteTask } = tasksSlice.actions

export default tasksSlice.reducer;