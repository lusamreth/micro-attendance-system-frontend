// EnrollmentForm.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { attendanceBackend } from '@/lib/axios/attendance-instance';
import { useToast } from '@/hooks/use-toast';
import { IconPlus } from '@tabler/icons-react';

interface EnrollmentFormProps {
    studentId: string;
    mutate: () => void;
}

interface Classroom {
    id: string;
    name: string;
}

const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ studentId, mutate }) => {
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [selectedClassroom, setSelectedClassroom] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { toast } = useToast();

    // Fetch classrooms from the backend
    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                const response = await attendanceBackend.get('/classrooms');
                setClassrooms(response.data.data); // Assuming the response has data in the correct format
            } catch (error) {
                toast({ title: "Error", description: "Failed to load classrooms.", variant: "destructive" });
            }
        };

        fetchClassrooms();
    }, [toast]);

    // Handle the form submission
    const handleSubmit = async () => {
        if (!selectedClassroom) {
            toast({ title: "Error", description: "Please select a classroom.", variant: "destructive" });
            return;
        }

        const payload = {
            student_id: studentId,
            class_id: selectedClassroom
        };

        try {
            await attendanceBackend.post('/students/enrollment', payload);
            toast({ title: "Success", description: "Enrollment created successfully.", variant: "success" });
            setIsOpen(false);
            mutate(); // Refresh the data after submission
        } catch (error) {
            toast({ title: "Error", description: "Failed to create enrollment.", variant: "destructive" });
        }
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)} size="sm" variant="ghost" className="p-1 rounded-full">
                <span className="text-xs">
                    <Button size="sm" variant="ghost" className="p-1 rounded-full">
                        <IconPlus className="h-4 w-4" />
                    </Button>
                </span>
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="bg-white text-gray-600">
                    <DialogHeader>
                        <DialogTitle>Enroll Student in Class</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Select onValueChange={(value) => setSelectedClassroom(value)} value={selectedClassroom}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Classroom" />
                            </SelectTrigger>
                            <SelectContent>
                                {classrooms.map((classroom) => (
                                    <SelectItem key={classroom.id} value={classroom.id} className="text-gray-600">
                                        {classroom.subject_name} ({classroom.lecturer_name})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSubmit}>Submit</Button>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EnrollmentForm;
