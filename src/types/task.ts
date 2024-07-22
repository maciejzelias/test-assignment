import * as z from 'zod';
import { paginationSchema } from './common';

export const TaskSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    bookmarked: z.boolean(),
  })
  .passthrough();

export const TaskListResponseSchema = z.object({
  data: z.array(TaskSchema),
  meta: z.object({
    pagination: paginationSchema,
  }),
});

export const TaskUpdateResponseSchema = z.object({
  data: TaskSchema,
});

const groupedTasks = z.object({
  bookmarked: z.array(TaskSchema),
  nonBookmarked: z.array(TaskSchema),
});

export type ITask = z.infer<typeof TaskSchema>;
export type ITaskListResponse = z.infer<typeof TaskListResponseSchema>;
export type IGroupedTasks = z.infer<typeof groupedTasks>;
