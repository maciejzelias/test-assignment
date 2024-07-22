import { Box, Spinner, Text } from '@chakra-ui/react';
import ErrorAlert from '../common/ErrorAlert';
import useFetchTasks from '../../hooks/useFetchTasks';
import CreateTask from './CreateTask';
import TaskList from './TaskList';
import Pagination from '../common/Pagination';

interface Props {
  query: string;
  page: number;
  handleChangePage: (newPage: number) => void;
}

const Tasks = ({ query, page, handleChangePage }: Props) => {
  const { data, isLoading, error } = useFetchTasks(query, page);

  if (error) {
    return <ErrorAlert mt={2} />;
  }

  if (isLoading || !data) {
    return <Spinner m="auto" />;
  }

  return (
    <Box width="100%" backgroundColor="white" padding={3} borderRadius={12}>
      <Text fontSize="x-small" fontWeight="bold" color="gray" my={2}>
        Bookmarked tasks
      </Text>
      <TaskList tasks={data.tasks.bookmarked} query={query} page={page} />
      <Text fontSize="x-small" fontWeight="bold" color="gray" my={2}>
        Tasks
      </Text>
      <TaskList tasks={data.tasks.nonBookmarked} query={query} page={page} />
      <Pagination
        callback={handleChangePage}
        currentPage={data.meta.pagination.current_page}
        totalPages={data.meta.pagination.total_pages}
      />
      <CreateTask query={query} handleChangePage={handleChangePage} />
    </Box>
  );
};

export default Tasks;
