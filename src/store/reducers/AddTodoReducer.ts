const ADD_TODO = 'ADD_TODO'
const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
const ADD_TODO_ERROR = 'ADD_TODO_ERROR'

interface AddTodoState {
    text: string
    loading: boolean
    error: null | string
}

interface AddTodoAction {
    type: string
    payload?: any;
}

const initialState: AddTodoState = {
    text: '',
    loading: false,
    error: null
}

export const addTodoReducer = (state: AddTodoState = initialState, action: AddTodoAction): AddTodoState => {
    switch (action.type) {
        case ADD_TODO:
            return {loading: true, error: null, text: state.text}
        case ADD_TODO_SUCCESS:
            return {loading: false, error: null, text: ''}
        case ADD_TODO_ERROR:
            return {loading: false, error: action.payload, text: state.text}
        default:
            return state
    }
}