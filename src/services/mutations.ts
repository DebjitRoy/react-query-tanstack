import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '../types/todo';
import { addTodo } from './api';

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
