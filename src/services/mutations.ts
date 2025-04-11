import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '../types/todo';
import { addTodo, deleteTodo, updateTodo } from './api';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Todo) => addTodo(data),
    // mutation intercepting middlewares
    onMutate: () => {
      console.log('Mutation request - before api call');
    },
    onError: (error) => {
      console.log('Mutation failed', { error });
    },
    onSettled: async (data, error) => {
      console.log('Mutation settled', { data, error });
      if (error) {
        console.log('Error!', error);
        return;
      }
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),
    onSettled: async (_, error, data) => {
      if (error) {
        console.log(error);
        return;
      }
      // revalidate both todo list and the single todo that has been updated
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
      await queryClient.invalidateQueries({ queryKey: ['todo', { id: data.id }] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSettled: async (_, error, id) => {
      if (error) {
        console.log(error);
        return;
      }
      // revalidate both todo list and the single todo that has been updated
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
      await queryClient.invalidateQueries({ queryKey: ['todo', { id }] });
    },
  });
};
