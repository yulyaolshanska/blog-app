import { z } from 'zod';

import { ErrorMessages } from '../shared/enums/ErrorMessages';

export const postSchema = z.object({
  title: z
    .string()
    .min(3, ErrorMessages.TITLE_TOO_SHORT)
    .max(100, ErrorMessages.TITLE_TOO_LONG),
  content: z
    .string()
    .min(10, ErrorMessages.CONTENT_TOO_SHORT)
    .max(1000, ErrorMessages.CONTENT_TOO_LONG)
});

export type PostSchema = z.infer<typeof postSchema>;
