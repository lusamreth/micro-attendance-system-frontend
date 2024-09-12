"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useSWR from 'swr';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { attendanceBackend } from '@/lib/axios/attendance-instance';
import { useToast } from '@/hooks/use-toast';
import { Classroom, ClassroomSchema, classroomSchema } from './types';
import { CreateEditClassroomForm } from "./create-edit-form"
import { IconEdit, IconTrash } from '@tabler/icons-react';

const fetcher = (url: string) => attendanceBackend.get("/classrooms");

// Main page component
export default function ClassroomManagement() {
    const router = useRouter();
    const { data: classroomsResult, mutate } = useSWR('/classrooms/abcc', fetcher);
    // State to control both dialogs
    const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);

    const handleCreateDialogChange = (open: boolean) => {
        setCreateDialogOpen(open);
    };

    const handleEditDialogChange = (open: boolean) => {
        setEditDialogOpen(open);
    };

    const { toast } = useToast();
    const classrooms = classroomsResult ? classroomsResult.data.data : []

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8000/classrooms/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                mutate();
                toast({
                    title: 'Classroom deleted',
                    description: 'The classroom has been successfully deleted.',
                    variant: 'success',
                });
            } else {
                throw new Error('Failed to delete classroom');
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete classroom. Please try again.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>Classroom List</CardTitle>
                    <Dialog open={isCreateDialogOpen} onOpenChange={handleCreateDialogChange}>
                        <DialogTrigger asChild>
                            <Button>Create Classroom</Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white text-gray-600">
                            <DialogHeader>
                                <DialogTitle>Create Classroom</DialogTitle>
                            </DialogHeader>
                            <CreateEditClassroomForm
                                mutate={mutate}
                                setOpen={handleCreateDialogChange}
                            />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Lecturer Name</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Lecture Time</TableHead>
                                <TableHead>Late Penalty Duration</TableHead>
                                <TableHead>Subject Name</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {classrooms?.map((classroom: Classroom) => (
                                <TableRow key={classroom.id}>
                                    <TableCell>{classroom.lecturer_name}</TableCell>
                                    <TableCell>{classroom.duration}</TableCell>
                                    <TableCell>
                                        {new Date(classroom.lecture_time * 1000).getHours()}:{new Date(classroom.lecture_time * 1000).getMinutes()}
                                    </TableCell>
                                    <TableCell>{classroom.late_penalty_duration}</TableCell>
                                    <TableCell>{classroom.subject_name}</TableCell>
                                    <TableCell className="flex flex-row">
                                        <Dialog open={isEditDialogOpen} onOpenChange={handleEditDialogChange}>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" className="mr-2">
                                                    <IconEdit />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="bg-white text-gray-600">
                                                <DialogHeader>
                                                    <DialogTitle>Edit Classroom</DialogTitle>
                                                </DialogHeader>
                                                <CreateEditClassroomForm
                                                    classroom={classroom}
                                                    mutate={mutate}
                                                    setOpen={handleEditDialogChange}
                                                />
                                            </DialogContent>
                                        </Dialog>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(classroom.id)}>
                                            <IconTrash />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

