import { Box, VStack } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import SearchInput from '../components/tasks/SearchInput';
import Tasks from '../components/tasks/Tasks';

const TasksPage = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const handleChangeQuery = useCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, []);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" bg="gray.50" p={4}>
      <VStack spacing={1} width="100%" maxW="600px">
        <SearchInput handleChangeQuery={handleChangeQuery} />
        <Tasks page={page} query={query} handleChangePage={handleChangePage} />
      </VStack>
    </Box>
  );
};

export default TasksPage;
