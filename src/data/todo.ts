import axios, { AxiosResponse } from "axios"
import { ServerResponse } from "../types/server"
import { TodoModel } from '../types/todo'

const baseUrl = 'http://localhost:9000'

export const getTodos = async (): Promise<AxiosResponse<ServerResponse<TodoModel[]>>> => {
    return axios.get(`${baseUrl}/todos`)
}

export const getTodoById = async (id: String): Promise<AxiosResponse<ServerResponse<TodoModel>>> => {
    return axios.get(`${baseUrl}/todos/${id}`)
}

export const createTodo = async (text: string): Promise<AxiosResponse<ServerResponse<TodoModel>>> => {
    return axios.post(`${baseUrl}/todos`, {'text': text})
}

export const updateTodo = async (id: string, text: string | null, isCompleted: boolean | null): Promise<AxiosResponse<ServerResponse<TodoModel>>> => {
    const body = {'text': text, 'isCompleted': isCompleted}

    return axios.patch(`${baseUrl}/todos/${id}`, body)
}

export const updateTodos = async (filterByIsCompleted: boolean | null, isCompleted: boolean): Promise<AxiosResponse<ServerResponse<undefined>>> => {
    const queryParams = {'filterByIsCompleted': filterByIsCompleted}
    const body = {'isCompleted': isCompleted}

    return axios.patch(`${baseUrl}/todos`, body, {params: queryParams})
}

export const removeTodo = async (id: string): Promise<AxiosResponse<ServerResponse<undefined>>> => {
    return axios.delete(`${baseUrl}/todos/${id}`)
}

export const removeTodos = async (filterByIsCompleted: boolean | null): Promise<AxiosResponse<ServerResponse<undefined>>> => {
    const body = {'isCompleted': filterByIsCompleted}
    return axios.delete(`${baseUrl}/todos`, {data: body})
}