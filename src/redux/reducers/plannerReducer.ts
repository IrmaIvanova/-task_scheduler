import { createSlice } from '@reduxjs/toolkit'
import { Task } from './tasksReducer'

export interface Planner {
    id: string,
    date: string,
    day: number;
    month: number;
    year: number;
    tasks: Task[]
}



interface PlannerState {
    plannerCollection: { [key: string]: Planner };
    plannerCollectionIds: string[];
    dayPlan: Planner | undefined
}

const initialState: PlannerState = {
    plannerCollection: {},
    plannerCollectionIds: [],
    dayPlan: undefined

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

        setDayPlan: (state, action) => {
            let { item } = action.payload;
            state.dayPlan = item
        }

    }
})

// Функция действия генерируется на каждую функцию релюсера(reducer), определённую в createSlice
export const { setPlanner, addItemToPlanner,  setDayPlan } = plannerSlice.actions

export default plannerSlice.reducer;