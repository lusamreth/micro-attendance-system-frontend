"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define the form schema
const formSchema = z.object({
    location: z.string().min(1, "Location is required"),
    floor: z.string().optional(),
    classroom: z.string().min(1, "Classroom is required"),
    rtspLink: z.string().url("Invalid RTSP link"),
    cameraName: z.string().min(1, "Camera name is required"),
    cameraModel: z.string().optional(),
});
type CameraForm = typeof formSchema

const NewCameraForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            location: '',
            floor: '',
            classroom: '',
            rtspLink: '',
            cameraName: '',
            cameraModel: '',
        },
    });

    const onSubmit = (values: any) => {
        console.log(values);
        // Here you would typically send the data to your backend
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Add New Camera Device</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Building A" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="floor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Floor (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. 2nd Floor" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="classroom"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Classroom</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a classroom" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="class1">Class 1</SelectItem>
                                            <SelectItem value="class2">Class 2</SelectItem>
                                            <SelectItem value="class3">Class 3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rtspLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>RTSP Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="rtsp://example.com/stream" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The RTSP link for connecting to the camera backend
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cameraName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Camera Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Front Entrance Camera" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cameraModel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Camera Model</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Model XYZ-123" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Add Camera</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default NewCameraForm;
