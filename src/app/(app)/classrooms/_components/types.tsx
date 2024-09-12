
import * as z from 'zod';

export const classroomSchema = z.object({
    lecturer_name: z.string().min(1, 'Lecturer name is required'),
    duration: z.number().int().positive('Duration must be a positive integer'),
    lecture_time: z.number().positive('Lecture time must be a positive number'),
    late_penalty_duration: z.number().nonnegative('Late penalty duration must be a non-negative number'),
    subject_name: z.string().min(1, 'Subject name is required'),
});


export type ClassroomSchema = z.infer<typeof classroomSchema>
export type Classroom = z.infer<typeof classroomSchema> & { id: string }

