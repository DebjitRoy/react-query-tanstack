import { useState } from 'react';
import { useProjects } from '../services/queries';

export default function Projects() {
  const [page, setPage] = useState(1);
  const { data, error, isPending, isFetching, isError, isPlaceholderData } = useProjects(page);
  return (
    <div>
      {isPending ? (
        <div>loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <span>Current Page:{page}</span>
      <button
        disabled={page <= 1}
        onClick={() => {
          setPage(page - 1);
        }}
      >
        Prev
      </button>
      <button
        disabled={isPlaceholderData}
        onClick={() => {
          if (!isPlaceholderData) {
            setPage(page + 1);
          }
        }}
      >
        Next
      </button>
      {isFetching && <span>loading...</span>}
    </div>
  );
}
