// types.ts
export interface Student {
    id: string;
    firstname: string;
    lastname: string;
    generation: number;
    gender: string;
    major?: string | null;
    phone_num?: string | null;
    address?: string | null;
}

export interface AttendanceStat {
    id: string;
    absent_count: number;
    absent_with_permission: number;
    present_count: number;
    late_count: number;
    student_id: string;
}

export interface Attendance {
    id: string;
    enrollment_id: string;
    last_record: number;
    entry_time: number; // timestamp
    punctuality: 'ontime' | 'late' | 'absent';
}
export interface Enrollment {
    id: string;
    name: string;
    classroom_id: string;
}

export interface StudentData {
    student: Student;
    attendance: Attendance;
    enrollments: string[]; // class names
}

export interface Classroom {
    id: string;
    name: string;
    capacity: number;
}
