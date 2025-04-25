import  {TaskResponse as Task} from './TaskResponse'
import {IPlanner} from '../IPLanner'

export interface PlannerResponse extends IPlanner{
    tasks: Task[];
}
