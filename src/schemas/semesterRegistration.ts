import {z} from 'zod';

export const createSemesterRegistrationSchema = z.object({
  semester: z.string().nonempty('Semester is required'),
  startDate: z.string({message: 'Start date is required'}),
  endDate: z.string({message: 'End date is required'}),
  minCredit: z.string().min(1, 'Minimum credit must be at least 1'),
  maxCredit: z.string().min(1, 'Maximum credit must be at least 1'),
});
