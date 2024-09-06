import { Metadata } from 'next'
import StudentTable from './_components/student-table'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: 'Students',
    description: 'List of students',
}

// Simulating data fetch (this could be from an API or database)
export async function getStudents() {
    return [
        { id: 1, name: "John Doe", age: 20, grade: "A", major: "Computer Science" },
        { id: 2, name: "Jane Smith", age: 22, grade: "B", major: "Mathematics" },
        { id: 3, name: "Bob Johnson", age: 21, grade: "A-", major: "Physics" },
        { id: 4, name: "Alice Brown", age: 23, grade: "B+", major: "Chemistry" },
        { id: 5, name: "Charlie Davis", age: 19, grade: "A", major: "Biology" },
    ]
}

export default async function StudentsPage() {
    const students = await getStudents()

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Student List</h1>
                <div className="flex items-center space-x-4">
                    <Button className="text-white bg-blue-500 font-semibold">New Student</Button>
                </div>
            </div>
            <StudentTable students={students} />
        </div>
    )
}
