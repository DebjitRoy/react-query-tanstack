import axios from 'axios';
import { Todo } from '../types/todo';

const BASE_URL = 'http://localhost:8080';
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getTodosIds = async () =>
  (await axiosInstance.get<Todo[]>('todos')).data.map((todo) => todo.id);

export const getTodo = async (id: number) => (await axiosInstance.get<Todo>(`todos/${id}`)).data;

export const addTodo = async (data: Todo) => {
  await axiosInstance.post('todos', data);
};
