import {z} from 'zod';

export const createCourseSchema = z.object({
  title: z.string('Title is required'),
  prefix: z
    .string('Prefix is required')
    .min(2, 'Must be at least 2 characters'),
  // code: z.number('Code must be positive Number'),
  // credits: z.number('Credits must be positive Number'),
  code: z.preprocess(
    (value) => (typeof value === 'string' ? Number(value) : value),
    z.number('Course code must be a positive number')
  ),
  credits: z.preprocess(
    (value) => (typeof value === 'string' ? Number(value) : value),
    z.number('Course credits must be a positive number')
  ),
  preRequisiteCourses: z.array(z.string()).optional(),
});
