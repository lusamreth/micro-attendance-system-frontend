"use client"
import React, { useMemo, useState } from 'react';
import EnrollmentForm from './enrollment-form';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { IconDots, IconPencil, IconTrash, IconPlus, IconCheck, IconCheckbox, IconEye } from '@tabler/icons-react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import Text from '@/components/ui/text';
import { useRouter } from 'next/navigation';
import { attendanceBackend } from '@/lib/axios/attendance-instance';
import { useToast } from '@/hooks/use-toast';

// Define interfaces for the backend response structure
interface Student {
    id: string;
    firstname: string;
    lastname: string;
    generation: number;
    gender: string;
    major: string | null;
    phone_num: string | null;
    address: string | null;
    birthDate?: string; // Add optional birthDate field
    class?: string; // Add optional class field
}

interface Attendance {
    id: string;
    absent_count: number;
    absent_with_permission: number;
    present_count: number;
    late_count: number;
    student_id: string;
}

interface StudentData {
    student: Student;
    attendance: Attendance;
    enrollments: string[];
}

// Define the props with proper typing
type StudentsDataProps = {
    data: StudentData[]; // Use the StudentData interface
    mutate: () => void; // Add mutate prop for refreshing data
};

// Define action types for the popover
const PopoverActionFields = [
    { label: "View", icon: <IconEye />, actionMap: "view" },
    { label: "Edit", icon: <IconPencil />, actionMap: "edit" },
    { label: "Delete", icon: <IconTrash />, actionMap: "delete" },
    { label: "View Attendances", icon: <IconCheckbox />, actionMap: "view-attendance" }
];

// Define the PopoverField component with action mappings
const PopoverField: React.FC<{ actionMaps: Record<string, (a: string) => void>, id: string }> = ({ actionMaps, id }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost">
                    <IconDots />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-48 py-2 px-1">
                <div className="w-full">
                    {PopoverActionFields.map((field, index) => (
                        <span
                            key={index}
                            className="flex items-center hover:bg-gray-100 w-full px-2 rounded-lg"
                            onClick={() => actionMaps[field.actionMap](id)}
                        >
                            {field.icon}
                            <Button variant="link" className="flex w-full justify-start">
                                <Text variant="body">
                                    {field.label}
                                </Text>
                            </Button>
                        </span>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};

const StudentTable: React.FC<StudentsDataProps> = ({ data, mutate }) => {
    const students = data
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(5);
    const router = useRouter();
    const [filter, setFilter] = useState<string>('All');
    const { toast } = useToast()
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredStudents = students.filter(student =>
        student.student.firstname.toLowerCase().includes(searchTerm.toLowerCase()) && (filter === 'All' || student.student.class === filter)
    );
    const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleDeleteStudent = async (id: string) => {
        try {
            await attendanceBackend.delete(`/students/${id}`);
            toast({ title: "Success", description: "Student deleted successfully.", variant: "success" });
            await mutate()
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete student.", variant: "destructive" });
        }
    };

    const actionMaps = {
        "view": (stud_id: string) => router.push(`/students/${stud_id}`),
        "edit": (id: string) => console.log("Edit student"),
        "delete": (id: string) => handleDeleteStudent(id),
        "view-attendance": (id: string) => router.push(`/students/${id}/attendance`)
    }

    return (
        <div className="container mx-auto p-4 text-black">
            <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow-md flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex space-x-4">
                    <Button className="bg-gray-100 text-white bg-gray-800 font-semibold capitalize">Event filter</Button>
                    <Input
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-xs bg-white"
                    />
                    <Select onValueChange={(value) => setFilter(value)} defaultValue="All">
                        <SelectTrigger className="w-[180px] bg-white">
                            <SelectValue placeholder="Filter by Class" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All</SelectItem>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center space-x-2">
                    <Button onClick={handlePreviousPage} disabled={currentPage === 1} variant="ghost" size="icon">
                        <ChevronLeftIcon className="h-5 w-5" />
                    </Button>
                    <span>{currentPage} / {totalPages}</span>
                    <Button onClick={handleNextPage} disabled={currentPage === totalPages} variant="ghost" size="icon">
                        <ChevronRightIcon className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <Table className="shadow-sm">
                <TableHeader>
                    <TableRow className="border rounded-lg bg-gray-100">
                        <TableHead className="font-bold">Name</TableHead>
                        <TableHead className="font-bold">Birth Date</TableHead>
                        <TableHead className="font-bold">Class</TableHead>
                        <TableHead className="font-bold">Gender</TableHead>
                        <TableHead className="font-bold">Major</TableHead>
                        <TableHead className="font-bold">Enrollments</TableHead>
                        <TableHead className="font-bold">Attendance</TableHead>
                        <TableHead className="font-bold text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="border">
                    {currentStudents.map((student) => (
                        <TableRow key={student.student.id}>
                            <TableCell>{`${student.student.firstname} ${student.student.lastname}`}</TableCell>
                            <TableCell>{student.student.birthDate || 'N/A'}</TableCell>
                            <TableCell>{student.student.class || 'N/A'}</TableCell>
                            <TableCell>{student.student.gender || 'N/A'}</TableCell>
                            <TableCell>{student.student.major || 'N/A'}</TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {student.enrollments.map((course, index) => (
                                        <Badge key={index} variant="secondary" className="bg-gray-200">
                                            {course}
                                        </Badge>
                                    ))}

                                    <EnrollmentForm studentId={student.student.id} mutate={mutate} />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="space-y-1">
                                    <Badge variant="outline">Present: {student.attendance.present_count}</Badge>
                                    <Badge variant="secondary">Late: {student.attendance.late_count}</Badge>
                                    <Badge variant="default">Absent (w/ permission): {student.attendance.absent_with_permission}</Badge>
                                    <Badge variant="destructive" className="bg-red-500">Absent (w/o permission): {student.attendance.absent_count}</Badge>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <PopoverField actionMaps={actionMaps} id={student.student.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default StudentTable;
