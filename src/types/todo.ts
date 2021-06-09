export interface TodoModel {
    id: string,
    text: string,
    isCompleted: boolean
}

export enum TodoFilter {
    ALL = 'ALL',
    COMPLETE = 'COMPLETE',
    INCOMPLETE = 'INCOMPLETE'
}

export enum TodoCompleteButtonState {
    COMPLETE = 'COMPLETE',
    INCOMPLETE = 'INCOMPLETE'
}

export interface TodoState {
    menu: {
        filterBy: TodoFilter
    },
    addTodo: {
        text: string
    },
    todos: {
        items: TodoModel[]
    },
    editingTodo: TodoModel | null
    error: {
        hideCloseButton: boolean,
        text: string | null,
        retryAction?: () => void,
        closeAction?: () => void
    },
    loading: boolean
}

export enum TodoActionType {
    GET_TODOS = 'GET_TODOS',
    GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS',
    GET_TODOS_ERROR = 'GET_TODOS_ERROR',

    INPUT_TODO_TEXT = 'INPUT_TODO_TEXT',
    SELECTED_TODO_FILTER = 'SELECTED_TODO_FILTER',
    CLOSE_ERROR_MODAL = 'CLOSE_ERROR_MODAL',

    CREATE_TODO = 'CREATE_TODO',
    CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS',
    CREATE_TODO_ERROR = 'CREATE_TODO_ERROR',

    UPDATE_TODO = 'UPDATE_TODO',

    UPDATE_TODOS = 'UPDATE_TODOS',
    UPDATE_TODOS_SUCCESS = 'UPDATE_TODOS_SUCCESS',
    UPDATE_TODOS_ERROR = 'UPDATE_TODOS_ERROR',

    POST_TODO_UPDATE = 'POST_TODO_UPDATE',
    POST_TODO_UPDATE_SUCCESS = 'POST_TODO_UPDATE_SUCCESS',
    POST_TODO_UPDATE_ERROR = 'POST_TODO_UPDATE_ERROR',
    POST_TODO_UPDATE_REVERT = 'POST_TODO_UPDATE_REVERT',

    REMOVE_TODO = 'REMOVE_TODO',
    REMOVE_TODO_SUCCESS = 'REMOVE_TODO_SUCCESS',
    REMOVE_TODO_ERROR = 'REMOVE_TODO_ERROR',

    REMOVE_TODOS = 'REMOVE_TODOS',
    REMOVE_TODOS_SUCCESS = 'REMOVE_TODOS_SUCCESS',
    REMOVE_TODOS_ERROR = 'REMOVE_TODOS_ERROR'
}

export interface GetTodosAction {
    type: TodoActionType.GET_TODOS
}

export interface GetTodosSuccessAction {
    type: TodoActionType.GET_TODOS_SUCCESS,
    todos: TodoModel[]
}

export interface GetTodosErrorAction {
    type: TodoActionType.GET_TODOS_ERROR,
    error: string
}

export interface SelectedTodoFilterAction {
    type: TodoActionType.SELECTED_TODO_FILTER,
    filter: TodoFilter
}

export interface InputTodoTextAction {
    type: TodoActionType.INPUT_TODO_TEXT
    newText: string
}

export interface CloseErrorModalAction {
    type: TodoActionType.CLOSE_ERROR_MODAL
}

export interface CreateTodoAction {
    type: TodoActionType.CREATE_TODO
}

export interface CreateTodoSuccessAction {
    type: TodoActionType.CREATE_TODO_SUCCESS
    createdTodo: TodoModel
}

export interface CreateTodoErrorAction {
    type: TodoActionType.CREATE_TODO_ERROR
    error: string
}

export interface UpdateTodoAction {
    type: TodoActionType.UPDATE_TODO,
    index: number,
    newText: string | null,
    newIsCompleted: boolean | null
}

export interface PostTodoUpdateAction {
    type: TodoActionType.POST_TODO_UPDATE
}

export interface PostTodoUpdateSuccessAction {
    type: TodoActionType.POST_TODO_UPDATE_SUCCESS
    index: number
    model: TodoModel
}

export interface PostTodoUpdateErrorAction {
    type: TodoActionType.POST_TODO_UPDATE_ERROR
    error: string
    retryAction: () => void,
    closeAction: () => void
}

export interface PostTodoUpdateRevertAction {
    type: TodoActionType.POST_TODO_UPDATE_REVERT
    index: number
}

export interface RemoveTodoAction {
    type: TodoActionType.REMOVE_TODO
}

export interface RemoveTodoSuccessAction {
    type: TodoActionType.REMOVE_TODO_SUCCESS
    index: number
}

export interface RemoveTodoErrorAction {
    type: TodoActionType.REMOVE_TODO_ERROR
    error: string
}

export interface RemoveTodosAction {
    type: TodoActionType.REMOVE_TODOS
}

export interface RemoveTodosSuccessAction {
    type: TodoActionType.REMOVE_TODOS_SUCCESS
    todos: TodoModel[]
}

export interface RemoveTodosErrorAction {
    type: TodoActionType.REMOVE_TODOS_ERROR
    error: string
}

export interface UpdateTodosAction {
    type: TodoActionType.UPDATE_TODOS
}

export interface UpdateTodosSuccessAction {
    type: TodoActionType.UPDATE_TODOS_SUCCESS
    todos: TodoModel[]
}

export interface UpdateTodosErrorAction {
    type: TodoActionType.UPDATE_TODOS_ERROR
    error: string
}

export type TodoAction = InputTodoTextAction | SelectedTodoFilterAction | CloseErrorModalAction |
    GetTodosAction | GetTodosSuccessAction | GetTodosErrorAction | 
    CreateTodoAction | CreateTodoSuccessAction | CreateTodoErrorAction | 
    UpdateTodoAction | 
    PostTodoUpdateAction | PostTodoUpdateSuccessAction | PostTodoUpdateErrorAction | PostTodoUpdateRevertAction |
    UpdateTodosAction | UpdateTodosSuccessAction | UpdateTodosErrorAction |
    RemoveTodoAction | RemoveTodoSuccessAction | RemoveTodoErrorAction |
    RemoveTodosAction | RemoveTodosSuccessAction | RemoveTodosErrorAction
