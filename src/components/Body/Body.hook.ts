import * as React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { setPlanner } from '../../redux/reducers/plannerReducer'
import { RootState } from '../../redux/store'
import { setTask } from '../../redux/reducers/tasksReducer'
import PlannerService from '../../RestAPI/services/PlannerService';


export const useGetPlannerHook = () => {
    const planIDS = useSelector((state: RootState) => state.planner.plannerCollectionIds)
    const userID = useSelector((state: RootState) => state.user.user.id)
    const dispatch = useDispatch()

    const getPlanner = async function (userID: any) {
        try {
            const response = await PlannerService.getAllPlannerDays(userID);
            let taskArr = [];
            let dayCollection = response?.data?.reduce((acc, dayItem) => {
                if (dayItem.tasks.length > 0) { taskArr.push(dayItem.tasks) }
                return {
                    ...acc, [dayItem.date]: {
                        ...dayItem,
                        taskIDS: dayItem?.tasks?.map((el) => { return el.id }) || [],
                    }
                }
            }, {}) || {};

            let dayCollectionIds = Object.keys(dayCollection) || []
            dispatch(setPlanner({ listIds: dayCollectionIds, collectionList: dayCollection }))

            let tasksCollection = taskArr.flat()?.reduce((acc, taskItem) => {
                return {
                    ...acc, [taskItem.id]: {
                        ...taskItem,
                    }
                }
            }, {}) || {};

            dispatch(setTask({
                listIds: Object.keys(tasksCollection) || [],
                collectionList: tasksCollection
            }))

        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    React.useEffect(() => {
        getPlanner(userID)
    }, [])

    return planIDS
}

