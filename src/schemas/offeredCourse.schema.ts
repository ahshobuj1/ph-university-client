import {z} from 'zod';

const timeStringValidation = z
  .string()
  .nonempty('Time is required')
  .regex(
    /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
    'Invalid time format! Use HH:MM in 24h format'
  );

export const createOfferedCourseSchema = z
  .object({
    academicFaculty: z.string().nonempty('Academic Faculty is required'),
    semesterRegistration: z
      .string()
      .nonempty('Semester Registration is required'),
    department: z.string().nonempty('Department is required'),
    course: z.string().nonempty('Course is required'),
    faculty: z.string().nonempty('Faculty is required'),
    maxCapacity: z.number().min(1, 'Max capacity must be at least 1'),
    section: z.number().min(1, 'Section must be at least 1'),
    days: z.array(z.string()).nonempty('At least one day must be selected'),
    startTime: timeStringValidation,
    endTime: timeStringValidation,
  })
  .refine(
    (data) => {
      const start = new Date(`1971-01-01T${data.startTime}:00`);
      const end = new Date(`1971-01-01T${data.endTime}:00`);
      return end > start;
    },
    {message: 'End time must be after start time'}
  );
