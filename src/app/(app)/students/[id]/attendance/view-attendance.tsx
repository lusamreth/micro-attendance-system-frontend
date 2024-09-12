"use client";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { FC } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SmallErrorCard } from "@/components/mini-error-panel";
import { attendanceBackend } from "@/lib/axios/attendance-instance";

interface AttendanceData {
    id: string;
    enrollment_id: string;
    last_record: number;
    entry_time: number;
    punctuality: "absent" | "late" | "present" | "absent, permission";
}

export const Skeleton = () => (
    <div className="p-8 max-w-5xl mx-auto bg-white rounded-lg shadow-lg mt-8">
        <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-8 bg-gray-300 rounded w-full"></div>
            <div className="h-6 bg-gray-300 rounded w-2/3"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
        </div>
    </div>
);

const fetcher = (url: string) =>
    attendanceBackend.get(url).then((res) => res.data);

interface NotFoundProps {
    message: string;
}

export const NotFound = ({ message }: NotFoundProps) => (
    <div className="p-8 max-w-5xl mx-auto bg-white rounded-lg shadow-lg mt-8">
        <div className="text-gray-500 text-center">{message}</div>
    </div>
);

const AttendancePage: FC = () => {
    const router = useRouter();
    const { id: studentId } = useParams();
    const { data: result, error } = useSWR<{ data: AttendanceData[] }>(
        studentId ? `/attendances/student/${studentId}` : null,
        fetcher
    );

    const data = result ? result.data : []
    if (error)
        return (
            <div className="text-red-500 flex h-screen grow w-full justify-center">
                <SmallErrorCard
                    message={`Error loading attendance data : ${error.message}`}
                />
            </div>
        );
    if (!data) return <div className="text-gray-500"><Skeleton /></div>;

    const attendanceScore = (data.reduce((acc, record) => acc + (record.punctuality === 'present' || record.punctuality === 'ontime' ? 1 : 0), 0) / data.length) * 100;
    const date_options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

    return (
        <div className="p-8 max-w-5xl mx-auto bg-white rounded-lg mt-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Attendance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Attendance Score</p>
                            <p className="text-2xl font-bold text-gray-800">{attendanceScore.toFixed(2)}%</p>
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Punctuality</TableHead>
                                <TableHead>Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell>{new Date(record.entry_time * 1000).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            record.punctuality === 'present' ? 'success' :
                                                record.punctuality === 'late' ? 'warning' :
                                                    'danger'
                                        }>
                                            {record.punctuality}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(record.entry_time).toLocaleString("en-US", date_options)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default AttendancePage;
