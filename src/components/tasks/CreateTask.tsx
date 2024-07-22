import { Box, Button, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { handleCreateTask } from '../../api/tasks/taskHandlers';
import { toast } from 'react-toastify';

interface Props {
  query: string;
  handleChangePage: (newPage: number) => void;
}

const CreateTask = ({ query, handleChangePage }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation('createTask', handleCreateTask, {
    onSuccess: () => {
      // Assuming I don't know how backend handles tasks order
      // I will just reset all the tasks queries so fresh data are fetched,
      // If i was assured that new task will be first in order I could use cached data from page nr 1 and invalidate other cached pages
      // Otherwise new task could be on page nr 2 if someone create more than 10 task with same name.
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
        refetchActive: true,
        refetchInactive: false,
      });

      // Probably new task will land on first page so reseting to first page just in case
      handleChangePage(1);
      toast.success('Task created successfully');
    },
    onError: () => {
      toast.error('Failed to create task, please try again later');
    },
  });

  if (!query) {
    return null;
  }

  const createTaskHandler = () => {
    if (isLoading) {
      return;
    }
    mutate(query);
  };

  return (
    <Box>
      <Text fontSize="x-small" fontWeight="bold" color="gray">
        Create a new task
      </Text>
      <Button
        onClick={createTaskHandler}
        w="100%"
        size="xs"
        backgroundColor="transparent"
        mt={1}
        _hover={{
          bg: 'teal.100',
          color: 'teal',
        }}
        justifyContent="start"
        isDisabled={isLoading}>
        {isLoading ? 'Creating task...' : `Create new task - "${query}"`}
      </Button>
    </Box>
  );
};

export default CreateTask;
