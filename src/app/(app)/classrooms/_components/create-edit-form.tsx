import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker'; // Assuming this is your date picker component
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { classroomSchema, ClassroomSchema, Classroom } from './types';

export function CreateEditClassroomForm({ classroom, mutate, setOpen }: { classroom?: Classroom, mutate: () => void, setOpen: (open: boolean) => void }) {
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(classroomSchema),
        defaultValues: classroom || {
            lecturer_name: "",
            duration: 0,
            lecture_time: new Date().getTime(), // Default to current date and time
            late_penalty_duration: 0,
            subject_name: '',
        } as ClassroomSchema,
    });
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState('12');
    const [selectedMinute, setSelectedMinute] = useState('00');

    // Combining date and time into a single Unix timestamp
    const combineCurrentDateTime = (hour, minute) => {
        const now = new Date(); // Get current date and time
        const combinedDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);
        return Math.floor(combinedDate.getTime() / 1000); // Convert to Unix timestamp (seconds)
    };

    const onSubmit = async (_data) => {

        // const url = "https://micro-backend.rethlu.pro/classrooms"
        const url = 'http://localhost:8000/classrooms';
        const method = classroom ? 'PATCH' : 'POST';
        console.log("SELLL", selectedHour, selectedMinute)
        const data = form.getValues()
        const unixTimestamp = combineCurrentDateTime(selectedHour, selectedMinute);
        const body = classroom ? { id: classroom.id, ...data, lecture_time: unixTimestamp } : { ...data, lecture_time: unixTimestamp };
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify([body]),
            });

            if (response.ok) {
                mutate();
                toast({
                    title: `Classroom ${classroom ? 'updated' : 'created'}`,
                    description: `The classroom has been successfully ${classroom ? 'updated' : 'created'}.`,
                    variant: 'success',
                });
                setOpen(false);
            } else {
                throw new Error(`Failed to ${classroom ? 'update' : 'create'} classroom`);
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: `Failed to ${classroom ? 'update' : 'create'} classroom. Please try again.`,
                variant: 'destructive',
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-white text-black">
                {/* Lecturer Name Field */}
                <FormField
                    control={form.control}
                    name="lecturer_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lecturer Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Duration Field */}
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duration (minutes)</FormLabel>
                            <FormControl>
                                <Input {...field} type="number" min="0" step="1" onChange={(e) => field.onChange(parseInt(e.target.value))} className="w-full bg-white rounded-md" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Lecture Time Field - Using Date Picker */}
                {/* Time Picker Fields */}
                <FormField
                    control={form.control}
                    name="lecture_time"
                    render={() => (
                        <FormItem>
                            <FormLabel>Lecture Time</FormLabel>
                            <div className="flex space-x-2">
                                {/* Hour Selector */}
                                <select
                                    value={selectedHour}
                                    onChange={(e) => setSelectedHour(e.target.value)}
                                    className="w-full p-2 bg-white rounded-md border"
                                >
                                    {Array.from({ length: 24 }, (_, i) => (
                                        <option key={i} value={i}>
                                            {i.toString().padStart(2, '0')}
                                        </option>
                                    ))}
                                </select>
                                {/* Minute Selector */}
                                <select
                                    value={selectedMinute}
                                    onChange={(e) => setSelectedMinute(e.target.value)}
                                    className="w-full p-2 bg-white rounded-md border"
                                >
                                    {['00', '15', '30', '45'].map((minute) => (
                                        <option key={minute} value={minute}>
                                            {minute}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <FormMessage />
                        </FormItem>)} />

                {/* Late Penalty Duration Field */}
                <FormField
                    control={form.control}
                    name="late_penalty_duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Late Penalty Duration (minutes)</FormLabel>
                            <FormControl>
                                <Input {...field}
                                    type="number"
                                    min="0"
                                    step="1" onChange={(e) => field.onChange(parseInt(e.target.value))}
                                    className="w-full bg-white rounded-md" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Subject Name Field */}
                <FormField
                    control={form.control}
                    name="subject_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button type="submit">{classroom ? 'Update' : 'Create'} Classroom</Button>
            </form>
        </Form>
    );
}
