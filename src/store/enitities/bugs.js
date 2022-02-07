import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { createSelector } from "reselect"
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload)
    },
    bugRemoved: (bugs, action) => {
      bugs.list.filter(bug => bug.id !== action.payload.id)
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id)
      bugs.list[index].resolved = true
    },
    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload
      const index = bugs.list.findIndex(bug => bug.id === bugId)
      bugs.list[index].userId = userId
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload
      bugs.loading = false
      bugs.lastFetch = Date.now()
    },
    bugsRequested: (bugs, action) => {
      bugs.loading = true
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false
    }
  }
})
export const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssignedToUser,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed
} = slice.actions
export default slice.reducer

//action creators
const url = "/bugs"

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
  if (diffInMinutes < 10) return;
  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type
    })
  )
}

export const addBug = (bug) => apiCallBegan({
  url,
  method: "post",
  data: bug,
  onSuccess: bugAdded.type,
  onError: bugsRequestFailed.type
})

export const assignBugToUser = (id, userId) => apiCallBegan({
  url: url + `/${id}`,
  method: "patch",
  data: { userId },
  onSuccess: bugAssignedToUser.type,
  onError: bugsRequestFailed.type
})

export const resolveBug = (id) => apiCallBegan({
  url: url + `/${id}`,
  method: "patch",
  data: { resolved: true },
  onSuccess: bugResolved.type,
  onError: bugsRequestFailed.type
})

export const unResolvedBugsSelector = createSelector(
  state => state.entities.bugs,
  bugs => bugs.list.filter(bug => !bug.resolved)
)
export const bugsPerAssigneeSelector = (userId) => createSelector(
  state => state.entities.bugs,
  bugs => bugs.list.filter(bug => bug.userId === userId)
)

//#region actual reducer code without toolkit

//Actual implementation without createReducer
// export default function reducer(state = [], action) {
  // switch (action.type) {
  //   case bugAdded.type:
  //     return [
  //       ...state,
  //       {
  //         id: ++lastId,
  //         description: action.payload.description,
  //         resolved: false
  //       }
  //     ]
  //   case bugRemoved.type:
  //     return state.filter(bug => bug.id !== action.payload.id)
  //   case bugResolved.type:
  //     return state.map(bug => bug.id !== action.payload.id ? bug : { ...bug, resolved: true })
  //   default:
  //     return state
  // }
// }

//#endregion