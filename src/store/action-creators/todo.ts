import { Dispatch } from "react"
import { TodoAction, TodoActionType } from "../../types/todo"

export const inputTodoText = (newText: string) => {
    return (dispatch: Dispatch<TodoAction>) => {
        dispatch({type: TodoActionType.INPUT_TODO_TEXT, newText: newText})
    }
}