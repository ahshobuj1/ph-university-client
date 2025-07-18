import {z} from 'zod';

export const createSemesterRegistrationSchema = z.object({
  semester: z.string().nonempty('Semester is required'),
  startDate: z.date().refine((v) => !!v, {message: 'Start date is required'}),
  endDate: z.date().refine((v) => !!v, {message: 'End date is required'}),
  minCredit: z.number().min(1, 'Minimum credit must be at least 1'),
  maxCredit: z.number().min(1, 'Maximum credit must be at least 1'),
});
