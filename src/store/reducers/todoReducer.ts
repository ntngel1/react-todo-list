import { TodoState, TodoAction, TodoActionType, TodoFilter } from "../../types/todo"

const initialState: TodoState = {
    menu: {
        filterBy: TodoFilter.ALL,
        todosCount: 0
    },
    addTodo: {
        text: '',
        loading: false
    },
    todos: {
        loading: false,
        items: []
    },
    error: null
}

export const todoReducer = (state: TodoState = initialState, action: TodoAction): TodoState => {
    switch (action.type) {
        case TodoActionType.INPUT_TODO_TEXT: 
            return {
                menu: state.menu,
                todos: state.todos,
                error: state.error,
                addTodo: {
                    text: action.newText,
                    loading: state.addTodo.loading
                }
            }
        case TodoActionType.CREATE_TODO:
            return {
                menu: state.menu,
                todos: state.todos,
                error: null,
                addTodo: {
                    text: '',
                    loading: true
                }
            }
        case TodoActionType.CREATE_TODO_SUCCESS:
            return {
                menu: state.menu,
                error: null,
                todos: {
                    loading: false,
                    items: state.todos.items.concat(action.createdTodo)
                },
                addTodo: {
                    text: state.addTodo.text,
                    loading: false
                }
            }
        case TodoActionType.CREATE_TODO_ERROR:
            return {
                menu: state.menu,
                error: action.error,
                todos: {
                    loading: false,
                    items: state.todos.items
                },
                addTodo: {
                    text: state.addTodo.text,
                    loading: false
                }
            }
        default:
            return state
    }
}