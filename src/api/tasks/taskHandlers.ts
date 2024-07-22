import { TaskUpdateResponseSchema, TaskListResponseSchema } from '../../types/task';
import axios from '../axios/axios';

export const handleTasksFetch = async (name?: string, page?: number) => {
  const { data } = await axios.get('/tasks', {
    params: {
      name: name,
      page: page,
    },
  });
  return TaskListResponseSchema.parse(data);
};

export const handleCreateTask = async (name: string) => {
  const { data } = await axios.post('/tasks', {
    name: name,
  });

  return TaskUpdateResponseSchema.parse(data);
};

export const handleToggleBookmark = async ({ id, isBookmarked }: { id: string; isBookmarked: boolean }) => {
  const { data } = await axios.post(`/tasks/${id}/${isBookmarked ? 'un' : ''}bookmark`);
  return TaskUpdateResponseSchema.parse(data);
};
