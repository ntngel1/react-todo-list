import { TodoState, TodoAction, TodoActionType, TodoFilter, TodoCompleteButtonState } from "../../types/todo"

const initialState: TodoState = {
    menu: {
        filterBy: TodoFilter.ALL
    },
    addTodo: {
        text: ''
    },
    todos: {
        items: []
    },
    editingTodo: null,
    error: {
        hideCloseButton: false,
        text: null,
        retryAction: undefined
    },
    loading: false
}

export const todoReducer = (state: TodoState = initialState, action: TodoAction): TodoState => {
    switch (action.type) {
        case TodoActionType.SELECTED_TODO_FILTER:
            return {
                ...state,
                menu: {
                    ...state.menu,
                    filterBy: action.filter
                }
            }
        case TodoActionType.INPUT_TODO_TEXT: 
            return {
                ...state,
                addTodo: {
                    ...state.addTodo,
                    text: action.newText
                }
            }
        case TodoActionType.CLOSE_ERROR_MODAL:
            return {
                ...state,
                error: {
                    text: null,
                    hideCloseButton: false
                }
            }
        case TodoActionType.GET_TODOS:
            return {
                ...state,
                loading: true,
                error: {
                    text: null,
                    hideCloseButton: false,
                    retryAction: undefined
                }
            }
        case TodoActionType.GET_TODOS_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: {
                    ...state.todos,
                    items: action.todos
                }
            }
        case TodoActionType.GET_TODOS_ERROR:
            return {
                ...state,
                loading: false,
                error: {
                    ...state.error,
                    text: action.error
                }
            }
        case TodoActionType.CREATE_TODO:
            return {
                ...state,
                loading: true
            }
        case TodoActionType.CREATE_TODO_SUCCESS:
            return {
                ...state,
                todos: {
                    ...state.todos,
                    items: [
                        ...state.todos.items,
                        action.createdTodo
                    ]
                },
                loading: false,
                addTodo: {
                    ...state.addTodo,
                    text: ''
                }
            }
        case TodoActionType.CREATE_TODO_ERROR:
            return {
                ...state,
                loading: false,
                error: {
                    ...state.error,
                    text: action.error 
                }
            }
        case TodoActionType.UPDATE_TODO: {
            const currentItem = state.todos.items[action.index]
            return {
                ...state,
                todos: {
                    ...state.todos,
                    items: [
                        ...state.todos.items.slice(0, action.index),
                        {id: currentItem.id, text: action.newText ?? currentItem.text, isCompleted: action.newIsCompleted ?? currentItem.isCompleted},
                        ...state.todos.items.slice(action.index + 1)
                    ]
                },
                editingTodo: state.editingTodo ?? currentItem
            }
        }
        case TodoActionType.POST_TODO_UPDATE: 
            return {
                ...state,
                loading: true
            }
        case TodoActionType.POST_TODO_UPDATE_SUCCESS: 
            return {
                ...state,
                loading: false,
                editingTodo: null,
                todos: {
                    ...state.todos,
                    items: [
                        ...state.todos.items.slice(0, action.index),
                        action.model,
                        ...state.todos.items.slice(action.index + 1)
                    ]
                }
            }
        case TodoActionType.POST_TODO_UPDATE_ERROR: 
            return {
                ...state,
                loading: false,
                error: {
                    hideCloseButton: false,
                    text: action.error,
                    retryAction: action.retryAction,
                    closeAction: action.closeAction
                }
            }
        case TodoActionType.POST_TODO_UPDATE_REVERT:
            return {
                ...state,
                todos: {
                    ...state.todos,
                    items: [
                        ...state.todos.items.slice(0, action.index),
                        state.editingTodo!!,
                        ...state.todos.items.slice(action.index + 1)
                    ]
                },
                editingTodo: null,
                error: {
                    hideCloseButton: false,
                    text: null,
                    retryAction: undefined,
                    closeAction: undefined
                }
            }
        case TodoActionType.REMOVE_TODO:
            return {
                ...state,
                loading: true
            }
        case TodoActionType.REMOVE_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: {
                    ...state.todos,
                    items: [
                        ...state.todos.items.slice(0, action.index),
                        ...state.todos.items.slice(action.index + 1)
                    ]
                }
            }
        case TodoActionType.REMOVE_TODO_ERROR: 
            return {
                ...state,
                loading: false,
                error: {
                    ...state.error,
                    text: action.error 
                }
            }
        case TodoActionType.REMOVE_TODOS:
            return {
                ...state,
                loading: true
            }
        case TodoActionType.REMOVE_TODOS_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: {
                    ...state.todos,
                    items: action.todos
                }
            }
        case TodoActionType.REMOVE_TODOS_ERROR:
            return {
                ...state,
                loading: false,
                error: {
                    ...state.error,
                    text: action.error 
                }
            }
        case TodoActionType.UPDATE_TODOS:
            return {
                ...state,
                loading: true
            }
        case TodoActionType.UPDATE_TODOS_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: {
                    ...state.todos,
                    items: action.todos
                }
            }
        case TodoActionType.UPDATE_TODOS_ERROR:
            return {
                ...state,
                loading: false,
                error: {
                    ...state.error,
                    text: action.error 
                }
            }
        default:
            return state
    }
}