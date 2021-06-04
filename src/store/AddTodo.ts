import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'

export const addTodoStore = createStore({}, applyMiddleware(thunk))