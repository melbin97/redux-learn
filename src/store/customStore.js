import reducer from "./reducer"

function createStore (reducer) {
  let state = []
  let listeners = []
  const getState = () => ({state})
  const subscribe = (listener) => {
    listeners.push(listener)
  }
  const dispatch = (action) => { 
    //call the reducer to get new state
    state = reducer(state, action)
    //notify the subscribers 
    for(let i = 0; i < listeners.length; i++) {
      listeners[i]()
    }
  }
  return  {
    getState,
    dispatch,
    subscribe
  }
}
export default createStore(reducer)