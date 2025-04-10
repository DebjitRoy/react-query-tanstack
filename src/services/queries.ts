import { useQueries, useQuery } from '@tanstack/react-query';
import { getTodo, getTodosIds } from './api';

export const useTodosIds = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodosIds,
    refetchOnWindowFocus: false,
  });
};

// all of the http requests were made in parallel - performant
export const useTodos = (ids: number[] = []) => {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ['todo', id],
      queryFn: () => getTodo(id),
    })),
  });
};
