import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateTodo } from '../services/mutations';
import { useTodos, useTodosIds } from '../services/queries';
import { Todo as TTodo } from '../types/todo';

export default function Todo() {
  const todoIdsQuery = useTodosIds();
  const { data, isError, isPending, fetchStatus, status } = todoIdsQuery;

  const todosQueries = useTodos(data); // passing array of numbers

  const createTodoMutation = useCreateTodo();

  const { register, handleSubmit, reset } = useForm<TTodo>();
  const handleCreateTodoSubmit: SubmitHandler<TTodo> = (data) => {
    createTodoMutation.mutate({ ...data, checked: false });
    reset();
  };
  //   if (isPending) return <span>Loading...</span>;
  if (isError) return <span>Error! try again</span>;
  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h3>New Todo:</h3>
        <input placeholder="Title" {...register('title')} />
        <br />
        <input placeholder="Description" {...register('description')} />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? 'creating' : 'Create Todo'}
        />
      </form>
      <p>Query function status: {fetchStatus}</p>
      <p>Query data status: {status}</p>
      {data?.map((todo) => (
        <span key={todo}>{todo},</span>
      ))}
      {todosQueries.map(({ data }) => (
        <p key={data?.id}>{data?.title}</p>
      ))}
    </>
  );
}
