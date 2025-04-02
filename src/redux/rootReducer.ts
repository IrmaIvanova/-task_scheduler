
import { combineReducers } from 'redux';
import plannerReducer  from './reducers/plannerReducer';
import  tasksReducer from './reducers/tasksReducer';



export default combineReducers({
  planner: plannerReducer,
  tasks: tasksReducer,
});