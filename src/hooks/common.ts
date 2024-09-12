import { Attendance } from "./common-types"
import { attendanceBackend } from '@/lib/axios/attendance-instance';
import useSWR from 'swr';

// Fetcher function for SWR
const fetcher = (url: string) => attendanceBackend.get(url).then(res => res.data.data);

export const useStudentData = () => {
    const { data, error, isLoading, mutate } = useSWR('/students', fetcher);
    console.log(data)
    return { data: data ?? [], error, isLoading, mutate };
};

export const useClassroomData = () => {
    const { data, error, isLoading, mutate } = useSWR('/classrooms', fetcher);
    return { data: data?.data, error, isLoading, mutate };
};

export const useEnrollmentData = () => {
    const { data, error, isLoading, mutate } = useSWR('/enrollments', fetcher);
    return { data: data?.data, error, isLoading, mutate };
};


export const useAttendanceData = () => {
    const { data, error, isLoading, mutate } = useSWR<Attendance[]>('/attendances', fetcher, {
        // Limit to the latest 20 records
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    return {
        attendances: data ? data.slice(-20) : [], // Latest 20 entries
        error,
        isLoading,
        mutate,
    };
};
