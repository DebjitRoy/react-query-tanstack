import axios from 'axios';
import { Todo } from '../types/todo';
import { TProject } from '../types/projects';

const BASE_URL = 'http://localhost:8080';
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getTodosIds = async () =>
  (await axiosInstance.get<Todo[]>('todos')).data.map((todo) => todo.id);

export const getTodo = async (id: number) => (await axiosInstance.get<Todo>(`todos/${id}`)).data;

export const addTodo = async (data: Todo) => {
  await axiosInstance.post('todos', data);
};

export const updateTodo = async (data: Todo) => {
  await axiosInstance.put(`todos/${data.id}`, data);
};
export const deleteTodo = async (id: number) => {
  await axiosInstance.delete(`todos/${id}`);
};
export const getProjects = async (page = 1) => {
  return (await axiosInstance.get<TProject[]>(`projects?_page=${page}&_limit=3`)).data;
};
