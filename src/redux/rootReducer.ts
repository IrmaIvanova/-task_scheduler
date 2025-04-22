
import { combineReducers } from 'redux';
import plannerReducer  from './reducers/plannerReducer';
import  tasksReducer from './reducers/tasksReducer';
import  userReducer from './reducers/userReducer';



export default combineReducers({
  planner: plannerReducer,
  tasks: tasksReducer,
  user:userReducer
});