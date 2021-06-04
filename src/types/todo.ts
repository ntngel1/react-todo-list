export enum TodoFilter {
    ALL = 'ALL',
    COMPLETE = 'COMPLETE',
    INCOMPLETE = 'INCOMPLETE',
}

export interface TodoState {
    menu: {
        filterBy: TodoFilter,
        todosCount: number
    },
    addTodo: {
        text: string,
        loading: boolean
    },
    todos: {
        loading: boolean,
        items: any[]
    },
    error: string | null
}

export enum TodoActionType {
    INPUT_TODO_TEXT = 'INPUT_TODO_TEXT',
    CREATE_TODO = 'CREATE_TODO',
    CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS',
    CREATE_TODO_ERROR = 'CREATE_TODO_ERROR'
}

export interface InputTodoTextAction {
    type: TodoActionType.INPUT_TODO_TEXT
    newText: string
}

export interface CreateTodoAction {
    type: TodoActionType.CREATE_TODO
}

export interface CreateTodoSuccessAction {
    type: TodoActionType.CREATE_TODO_SUCCESS
    createdTodo: any
}

export interface CreateTodoErrorAction {
    type: TodoActionType.CREATE_TODO_ERROR
    error: string
}

export type TodoAction = InputTodoTextAction | CreateTodoAction | CreateTodoSuccessAction | CreateTodoErrorAction
