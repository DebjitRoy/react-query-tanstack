import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';
import { getProjects, getTodo, getTodosIds } from './api';

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
      queryKey: ['todo', { id }],
      queryFn: () => getTodo(id),
    })),
  });
};

// ------------- projects api ---------------

export const useProjects = (page: number) => {
  return useQuery({
    queryKey: ['projects', { page }],
    queryFn: () => getProjects(page),
    placeholderData: keepPreviousData, // to avoid page flicker and cache prev page data
  });
};
