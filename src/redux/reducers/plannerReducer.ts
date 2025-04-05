import { createSlice } from '@reduxjs/toolkit'
import { Task } from './tasksReducer'

export interface Planner {
    id: string,
    date: string,
    tasks: Task[];
    taskIDS:string[]
}

export interface DayPlan extends Planner {
    taskIDS: string[]
}

interface PlannerState {
    plannerCollection: { [key: string]: Planner };
    plannerCollectionIds: string[];
  
}

const initialState: PlannerState = {
    plannerCollection: {},
    plannerCollectionIds: [],
}
const plannerSlice = createSlice({
    name: 'planner',
    initialState,
    reducers: {
        setPlanner: (state, action) => {
            let { listIds, collectionList } = action.payload
            state.plannerCollection = collectionList;
            state.plannerCollectionIds = listIds;

        },
        addItemToPlanner: (state, action) => {
            let { id, item } = action.payload;
            state.plannerCollection[id] = item;
            if (!state.plannerCollectionIds.includes(id)) {
                state.plannerCollectionIds.push(id);
            }
        },

    }
})

// Функция действия генерируется на каждую функцию релюсера(reducer), определённую в createSlice
export const { setPlanner, addItemToPlanner } = plannerSlice.actions

export default plannerSlice.reducer;