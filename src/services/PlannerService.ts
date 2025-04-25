import $api from "../http";
import { AxiosResponse } from "axios";
import { PlannerResponse } from "../models/response/PlannerResponse";
import { IPlanner } from '../models/IPLanner'


const PLANNER_URL = "/task/planner"

export default class PlannerService {
    static async createDay(dayId:string, planner: IPlanner): Promise<AxiosResponse<PlannerResponse>> {
        return $api.post<PlannerResponse>(`${PLANNER_URL}/${dayId}`, planner)
    }
    static async getAllPlannerDays(userId: string): Promise<AxiosResponse<PlannerResponse[]>> {
        return $api.get<PlannerResponse[]>(`${PLANNER_URL}/${userId}`)
    }

    static async getDayById(dayId: string): Promise<void> {
        return $api.post(`${PLANNER_URL}/${dayId}`)
    }
}