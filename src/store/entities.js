import { combineReducers } from "redux";
import bugReducer from "./enitities/bugs"
import projectReducer from "./enitities/projects"
import usersReducer from "./enitities/users"

export default combineReducers({
  bugs: bugReducer,
  projects: projectReducer,
  users: usersReducer
})