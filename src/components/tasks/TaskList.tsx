import { ITask, ITaskListResponse } from '../../types/task';
import { Button, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { handleToggleBookmark } from '../../api/tasks/taskHandlers';

interface Props {
  tasks: ITask[];
  query: string;
  page: number;
}

const TaskList = ({ tasks, page, query }: Props) => {
  const queryClient = useQueryClient();

  // It wasn't clear in exercise - so I supposed only one mutation is needed at once
  // If multiple mutations were needed then I would use useMutation for each task so isLoading does not block other tasks from updating
  const { mutate, isLoading } = useMutation('bookmarkTask', handleToggleBookmark, {
    onError: () => {
      toast.error('Failed to bookmark task');
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData<ITaskListResponse | undefined>(['tasks', query, page], (data) => {
        if (data) {
          const taskIndex = data.data.findIndex((task) => task.id === updatedTask.data.id);
          if (taskIndex !== -1) {
            data.data[taskIndex] = updatedTask.data;
          }
        }

        return data;
      });

      toast.success('Task successfully bookmarked');
    },
  });

  if (tasks.length === 0) {
    return <Text fontSize="small">No tasks found</Text>;
  }

  const bookmarkToggleHandler = (id: number, isBookmarked: boolean) => {
    if (isLoading) {
      return;
    }
    mutate({
      id: id.toString(),
      isBookmarked: isBookmarked,
    });
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <Button
            onClick={() => bookmarkToggleHandler(task.id, task.bookmarked)}
            w="100%"
            size="xs"
            backgroundColor="transparent"
            mt={1}
            _hover={{
              bg: 'teal.100',
              color: 'teal',
            }}
            justifyContent="space-between"
            alignItems="center"
            isDisabled={isLoading}>
            {task.name}
            <ListIcon>
              <StarIcon color={task.bookmarked ? 'teal.500' : 'gray.300'} />
            </ListIcon>
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
