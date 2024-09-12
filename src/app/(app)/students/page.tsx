import { Metadata } from 'next'
import StudentTable from './_components/student-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from "axios"
import { StudentTableBlock } from './student-table'
export const metadata: Metadata = {
    title: 'Students',
    description: 'List of students',
}


export default async function StudentsPage() {
    // const students = await getStudents()
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4 ">
                <h1 className="text-2xl font-bold text-gray-800">Student List</h1>
                <div className="flex items-center space-x-4">
                    <Button className="text-white bg-blue-500 font-semibold">
                        <Link href="/students/create">New Student</Link>
                    </Button>
                </div>
            </div>
            <StudentTableBlock />
        </div>
    )
}
