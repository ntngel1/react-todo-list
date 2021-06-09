import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { todoReducer } from './todoReducer';

const persistConfig = {
    key: 'todo',
    storage,
    whitelist: ['todo']
}

const reducer = combineReducers({
    todo: todoReducer
})

export const rootReducer = persistReducer(persistConfig, reducer)

export type RootState = ReturnType<typeof rootReducer>