import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import { StudentData } from '@/hooks/common-types';
import Link from 'next/link';

type AbsentTeeTableProps = {
    data: StudentData[];
    title: string;
};

export const AbsentTeeTable = ({ data, title }: AbsentTeeTableProps) => {
    return (
        <div>
            <h1 className="text-lg font-semibold mb-4">{title}</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Class</TableHeaderCell>
                        <TableHeaderCell>Absent</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((student) => (
                        <TableRow key={student.student.id}>
                            <Link href={`/students/${student.student.id}`} className="text-blue-500">
                                <TableCell>{`${student.student.firstname} ${student.student.lastname}`}</TableCell>
                            </Link>
                            <TableCell>{student.enrollments[0]}</TableCell>
                            <TableCell>{student.attendance.absent_count}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
