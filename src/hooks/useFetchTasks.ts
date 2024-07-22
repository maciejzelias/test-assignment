import { useQuery } from 'react-query';
import { handleTasksFetch } from '../api/tasks/taskHandlers';
import { IGroupedTasks } from '../types/task';

const useFetchTasks = (query: string, page: number) => {
  // There was no information in the task about filtering bookmarking or changing page size so I am just using name and page as params.
  // query.toLowerCase() - Search in backend is non-sensitive so I make all react-query keys non-sensitive as well.
  const fetchTodosQuery = useQuery(['tasks', query.toLowerCase(), page], () => handleTasksFetch(query, page), {
    select: (data) => {
      const grouped = data.data.reduce<IGroupedTasks>(
        (acc, task) => {
          if (task.bookmarked) {
            acc.bookmarked.push(task);
          } else {
            acc.nonBookmarked.push(task);
          }
          return acc;
        },
        { bookmarked: [], nonBookmarked: [] },
      );

      return {
        meta: data.meta,
        tasks: grouped,
      };
    },
  });

  return fetchTodosQuery;
};

export default useFetchTasks;
