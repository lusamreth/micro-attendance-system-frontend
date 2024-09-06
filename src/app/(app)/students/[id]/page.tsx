import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MinusCircle } from 'lucide-react';

const students = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '2000-05-15',
        class: 'A',
        gender: 'Male',
        enrollments: ['Data Science', 'Machine Learning'],
        attendance: { present: 15, late: 2, absentWithPermission: 1, absentWithoutPermission: 0 }
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        birthDate: '2001-08-22',
        class: 'B',
        gender: 'Female',
        enrollments: ['Robotics', 'Machine Learning'],
        attendance: { present: 16, late: 1, absentWithPermission: 1, absentWithoutPermission: 1 }
    },
    // Add more student data as needed
];

export default function StudentInfoPage() {
    return (
        <div className="min-h-screen text-gray-600 p-8 text-black">
            <h1 className="text-3xl font-bold mb-6">Student Information</h1>

            <div className="mb-6 flex space-x-4">
                <Input placeholder="Search by name" className="bg-gray-700 text-gray-600" />
                <Select>
                    <SelectTrigger className="w-[180px] bg-gray-700 text-gray-600">
                        <SelectValue placeholder="Filter by class" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="A">Class A</SelectItem>
                        <SelectItem value="B">Class B</SelectItem>
                        <SelectItem value="C">Class C</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[180px] bg-gray-700 text-gray-600">
                        <SelectValue placeholder="Filter by gender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                </Select>
                <Button className="bg-blue-600 hover:bg-blue-700">Add New Student</Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300">Birth Date</TableHead>
                        <TableHead className="text-gray-300">Class</TableHead>
                        <TableHead className="text-gray-300">Gender</TableHead>
                        <TableHead className="text-gray-300">Enrollments</TableHead>
                        <TableHead className="text-gray-300">Attendance</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                            <TableCell>{student.birthDate || 'N/A'}</TableCell>
                            <TableCell>{student.class}</TableCell>
                            <TableCell>{student.gender || 'N/A'}</TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {student.enrollments.map((course, index) => (
                                        <Badge key={index} variant="secondary" className="bg-gray-700">
                                            {course}
                                        </Badge>
                                    ))}
                                    <Button size="sm" variant="ghost" className="p-1">
                                        <PlusCircle className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="space-y-1">
                                    <div>Present: {student.attendance.present}</div>
                                    <div>Late: {student.attendance.late}</div>
                                    <div>Absent (with permission): {student.attendance.absentWithPermission}</div>
                                    <div>Absent (without permission): {student.attendance.absentWithoutPermission}</div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
