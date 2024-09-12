"use client"
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Separator } from '@/components/ui/seperator';
import { attendanceBackend } from '@/lib/axios/attendance-instance';
import MiniSkeletonLoader from '@/components/mini-skeleton-loader';

interface Student {
    id: string;
    firstname: string;
    lastname: string;
    birthDate: string;
    class: string;
    gender: string;
    major: string | null;
    email: string | null;
    phone_num: string | null;
    address: string | null;
}

interface Attendance {
    present_count: number;
    late_count: number;
    absent_with_permission: number;
    absent_count: number;
}

interface StudentData {
    student: Student;
    enrollments: string[];
    attendance: Attendance;
}

const StudentDetails = () => {
    const router = useRouter();
    const { id: student_id } = useParams();
    const studentId = student_id;
    const [studentData, setStudentData] = useState<StudentData | null>(null);
    const [loading, setLoading] = useState(true);

    console.log("EPOAII", studentId)
    useEffect(() => {
        const fetchStudentData = async () => {
            if (!studentId) return;

            try {
                const response = await attendanceBackend.get(`/students/${studentId}`);
                const fetchedData = response.data;
                console.log('fethcl', fetchedData)
                setStudentData(fetchedData.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [studentId]);

    if (loading) {
        return <MiniSkeletonLoader />
    }

    if (!studentData) {
        return <p>No student data available.</p>;
    }

    const { student, enrollments, attendance } = studentData;
    return (
        <div className="py-5 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800">Student Details</h1>
                <Button onClick={() => router.push("/students")}>Back to Student List</Button>
            </div>
            <Separator className="mb-8" />

            {/* Student Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Student Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p><strong>Name:</strong> {`${student.firstname} ${student.lastname}`}</p>
                            <p><strong>Birth Date:</strong> {student.birthDate || 'N/A'}</p>
                            <p><strong>Class:</strong> {student.class || 'N/A'}</p>
                            <p><strong>Gender:</strong> {student.gender || 'N/A'}</p>
                        </div>
                        <div>
                            <p><strong>Major:</strong> {student.major || 'N/A'}</p>
                            <p><strong>Email:</strong> {student.email || 'N/A'}</p>
                            <p><strong>Phone:</strong> {student.phone_num || 'N/A'}</p>
                            <p><strong>Address:</strong> {student.address || 'N/A'}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Enrollment Info */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Enrollments</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc ml-4">
                        {enrollments.map((subject, index) => (
                            <li key={index}>{subject}</li>
                        ))}

                        {enrollments.length === 0 ? (
                            <li>No enrollments</li>
                        ) : ""}
                    </ul>
                </CardContent>
            </Card>

            {/* Attendance Info */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Attendance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Present</TableCell>
                                <TableCell>{attendance.present_count}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Late</TableCell>
                                <TableCell>{attendance.late_count}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Absent (with permission)</TableCell>
                                <TableCell>{attendance.absent_with_permission}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Absent (without permission)</TableCell>
                                <TableCell>{attendance.absent_count}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentDetails;
