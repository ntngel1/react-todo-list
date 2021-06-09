import { Dispatch } from "react"
import { TodoAction, TodoActionType, TodoCompleteButtonState, TodoFilter, TodoModel } from "../../types/todo"
import { RootState } from "../reducers/rootReducer"
import { removeTodos as removeTodosApi, updateTodos as updateTodosApi, createTodo as createTodoApi, updateTodo as updateTodoApi, getTodos as getTodosApi, removeTodo as deleteTodoApi } from '../../data/todo'

export const getTodos = () => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            dispatch({type: TodoActionType.GET_TODOS})
            const response = await getTodosApi()
            if (response.data.ok) {
                dispatch({type: TodoActionType.GET_TODOS_SUCCESS, todos: response.data.content!!})
            } else {
                dispatch({type: TodoActionType.GET_TODOS_ERROR, error: response.data.errorMessage!!})
            }
        } catch (e) {
            dispatch({type: TodoActionType.GET_TODOS_ERROR, error: e.response.data.errorMessage})
        }
    } 
}

export const inputTodoText = (newText: string) => {
    return (dispatch: Dispatch<TodoAction>) => {
        dispatch({type: TodoActionType.INPUT_TODO_TEXT, newText: newText})
    }
}

export const closeErrorModal = () => {
    return (dispatch: Dispatch<TodoAction>) => {
        dispatch({type: TodoActionType.CLOSE_ERROR_MODAL})
    }
}

export const createTodo = (text: string) => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            dispatch({type: TodoActionType.CREATE_TODO})
            const response = await createTodoApi(text)
            if (response.data.ok) {
                dispatch({type: TodoActionType.CREATE_TODO_SUCCESS, createdTodo: response.data.content!!})
            } else {
                dispatch({type: TodoActionType.CREATE_TODO_ERROR, error: response.data.errorMessage!!})
            }
        } catch (e) {
            dispatch({type: TodoActionType.CREATE_TODO_ERROR, error: e.response.data.errorMessage})
        }
    }
}

export const updateTodo = (id: string, text: string | null, isCompleted: boolean | null) => {
    return (dispatch: Dispatch<TodoAction>, getState: () => RootState) => {
        const {todo} = getState()
        const index = todo.todos.items.findIndex((item) => item.id === id)
        dispatch({type: TodoActionType.UPDATE_TODO, index: index, newText: text, newIsCompleted: isCompleted})
    }
}

export const postUpdateTodo = (id: string) => {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        try {
            console.log('postUpdateTodo with id = ' + id)
            dispatch({type: TodoActionType.POST_TODO_UPDATE})
            const {todo} = getState()
            const index = todo.todos.items.findIndex((item) => item.id == id)
            const todoItem = todo.todos.items[index]
            const response = await updateTodoApi(todoItem.id, todoItem.text, todoItem.isCompleted)
            if (response.data.ok) {
                dispatch({type: TodoActionType.POST_TODO_UPDATE_SUCCESS, index: index, model: response.data.content!!})
            } else {
                dispatch({
                    type: TodoActionType.POST_TODO_UPDATE_ERROR, 
                    error: response.data.errorMessage!!,
                    retryAction: () => dispatch(postUpdateTodo(id)),
                    closeAction: () => dispatch({type: TodoActionType.POST_TODO_UPDATE_REVERT, index: index})
                })
            }
        } catch (e) {
            const {todo} = getState()
            const index = todo.todos.items.findIndex((item) => item.id == id)
            dispatch({
                type: TodoActionType.POST_TODO_UPDATE_ERROR,
                error: e.response.data.errorMessage,
                retryAction: () => dispatch(postUpdateTodo(id)),
                closeAction: () => dispatch({type: TodoActionType.POST_TODO_UPDATE_REVERT, index: index})
            })
        }
    }
}

export const removeTodo = (id: string) => {
    return async (dispatch: Dispatch<TodoAction>, getState: () => RootState) => {
        try {
            dispatch({type: TodoActionType.REMOVE_TODO})
            const {todo} = getState()
            const index = todo.todos.items.findIndex((item) => item.id === id)
            const response = await deleteTodoApi(id)
            if (response.data.ok) {
                dispatch({type: TodoActionType.REMOVE_TODO_SUCCESS, index: index})
            } else {
                dispatch({type: TodoActionType.REMOVE_TODO_ERROR, error: response.data.errorMessage!!})
            }
        } catch (e) {
            dispatch({type: TodoActionType.REMOVE_TODO_ERROR, error: e.response.data.errorMessage})
        }
    }
}

export const removeTodos = (filterByIsCompleted: boolean | null) => {
    return async (dispatch: Dispatch<TodoAction>, getState: () => RootState) => {
        try {
            dispatch({type: TodoActionType.REMOVE_TODOS})
            const response = await removeTodosApi(filterByIsCompleted)
            if (response.data.ok) {
                const {todo} = getState()
                const todos = todo.todos.items.filter((item) => filterByIsCompleted != null ? item.isCompleted != filterByIsCompleted : false)
                dispatch({type: TodoActionType.REMOVE_TODOS_SUCCESS, todos: todos})
            } else {
                dispatch({type: TodoActionType.REMOVE_TODOS_ERROR, error: response.data.errorMessage!!})
            }
        } catch (e) {
            dispatch({type: TodoActionType.REMOVE_TODOS_ERROR, error: e.response.data.errorMessage})
        }
    }
}

export const updateTodosIsCompleted = (filterByIsCompleted: boolean | null, newIsCompleted: boolean) => {
    return async (dispatch: Dispatch<TodoAction>, getState: () => RootState) => {
        try {
            dispatch({type: TodoActionType.UPDATE_TODOS})
            const response = await updateTodosApi(filterByIsCompleted, newIsCompleted)
            if (response.data.ok) {
                const {todo} = getState()
                const todos = todo.todos.items.map((item) => {
                    return {
                        id: item.id,
                        isCompleted: newIsCompleted,
                        text: item.text
                    }
                })

                dispatch({type: TodoActionType.UPDATE_TODOS_SUCCESS, todos: todos})
            } else {
                dispatch({type: TodoActionType.UPDATE_TODOS_ERROR, error: response.data.errorMessage!!})
            }
        } catch (e) {
            dispatch({type: TodoActionType.UPDATE_TODOS_ERROR, error: e.response.data.errorMessage})
        }
    }
}

export const selectedTodoFilter = (filter: TodoFilter) => {
    return (dispatch: Dispatch<TodoAction>) => {
        dispatch({type: TodoActionType.SELECTED_TODO_FILTER, filter: filter})
    }
}