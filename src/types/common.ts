import * as z from 'zod';

export const paginationSchema = z.object({
  total_items: z.number(),
  total_pages: z.number(),
  current_page: z.number(),
  per_page: z.number(),
});
