import {z} from 'zod';

export const createCourseSchema = z.object({
  title: z.string().nonempty('Title is required'),
  prefix: z.string().nonempty('Prefix is required'),
  code: z.number().min(1, 'Code must be positive'),
  credits: z.number().min(1, 'Credits must be at least 1'),
  preRequisiteCourses: z
    .array(
      z.object({
        course: z.string().nonempty('Course id is required'),
      })
    )
    .optional(),
});
