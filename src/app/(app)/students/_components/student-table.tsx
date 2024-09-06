"use client"
import React, { useState } from 'react'
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { IconDots, IconPencil, IconTrash, IconPlus } from '@tabler/icons-react'
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import Text from '@/components/ui/text'

const studentsData = [
    {
        id: 1,
        name: "John Doe",
        firstName: "John",
        lastName: "Doe",
        age: 20,
        birthDate: "2003-05-15",
        class: "A",
        gender: "Male",
        major: "Computer Science",
        enrollments: ["Data Science", "Machine Learning"],
        attendance: { present: 15, late: 2, absentWithPermission: 1, absentWithoutPermission: 0 }
    },
    {
        id: 2,
        name: "Jane Smith",
        firstName: "Jane",
        lastName: "Smith",
        age: 22,
        birthDate: "2001-08-22",
        class: "B",
        gender: "Female",
        major: "Mathematics",
        enrollments: ["Robotics", "Machine Learning"],
        attendance: { present: 16, late: 1, absentWithPermission: 1, absentWithoutPermission: 1 }
    },
    // Add more data here
]

const PopoverActionFields = [
    { label: "Edit", icon: <IconPencil />, actionMap: "edit" },
    { label: "Delete", icon: <IconTrash />, actionMap: "delete" },
    { label: "Mark permission", icon: <CheckIcon />, actionMap: "delete" }
]

const PopoverField = () => {
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
                        <span key={index} className="flex items-center hover:bg-gray-100 w-full px-2 rounded-lg">
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
    )
}

export default function StudentTable() {
    const [students, setStudents] = useState(studentsData)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)
    const [filter, setFilter] = useState('All')

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filter === 'All' || student.class === filter)
    )
    const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1)
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
                        <TableRow key={student.id}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.birthDate || 'N/A'}</TableCell>
                            <TableCell>{student.class}</TableCell>
                            <TableCell>{student.gender || 'N/A'}</TableCell>
                            <TableCell>{student.major}</TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {student.enrollments.map((course, index) => (
                                        <Badge key={index} variant="secondary" className="bg-gray-200">
                                            {course}
                                        </Badge>
                                    ))}
                                    <Button size="sm" variant="ghost" className="p-1 rounded-full">
                                        <IconPlus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="space-y-1 text-sm">
                                    <div>Present: {student.attendance.present}</div>
                                    <div>Late: {student.attendance.late}</div>
                                    <div>Absent (permission): {student.attendance.absentWithPermission}</div>
                                    <div>Absent (no-permission): {student.attendance.absentWithoutPermission}</div>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <PopoverField />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
