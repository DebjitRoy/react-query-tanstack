import { useTodosIds } from '../services/queries';

export default function Todo() {
  const todoIdsQuery = useTodosIds();
  if (todoIdsQuery.isPending) return <span>Loading...</span>;
  if (todoIdsQuery.isError) return <span>Error! try again</span>;
  return (
    <>
      {todoIdsQuery.data.map((todo) => (
        <p key={todo}>{todo}</p>
      ))}
    </>
  );
}
