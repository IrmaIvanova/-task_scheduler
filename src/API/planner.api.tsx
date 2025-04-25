
import PlannerService from '../services/PlannerService';


export const createDay = async function (dayId: string, dayItem: any) {
    try {
        const response = await PlannerService.createDay(dayId,dayItem);
    } catch (e) {
        console.log(e.response?.data?.message)
    }
}


