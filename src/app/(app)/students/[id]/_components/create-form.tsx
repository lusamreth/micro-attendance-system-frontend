import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/seperator';
import { useToast } from '@/hooks/use-toast';
import { attendanceBackend } from '@/lib/axios/attendance-instance';

// Define the form validation schema using Zod
const formSchema = z.object({
    firstname: z.string().min(1, 'First name is required'),
    lastname: z.string().optional().default(""),
    generation: z.string(),
    birthDate: z.string().optional(),
    gender: z.enum(['Male', 'Female']).optional(),
    major: z.string().optional(),
    phone_num: z.string().optional(),
    address: z.string().optional(),
});

// Define the TypeScript interface for the form data
interface StudentFormInputs {
    firstname: string;
    lastname: string;
    generation: number | string;
    gender: 'Male' | 'Female';
    major?: string;
    phone_num?: string;
    address?: string;
    birthDate?: string;
}

const InsertStudent = () => {
    const router = useRouter();
    const { toast } = useToast()
    // React Hook Form setup
    const form = useForm<StudentFormInputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: '',
            lastname: ' ',
            generation: "2020",
            gender: 'Male',
            major: '',
            phone_num: '',
            address: '',
            birthDate: '',




        },
    });

    // Submit handler
    const onSubmit = async (data: StudentFormInputs) => {
        try {
            console.log("BBBBBBBB ", form.getValues())
            const values = form.getValues()
            // Redirect back to student list
            const result = await attendanceBackend.post("/students", [values])
            console.log(result.status)

            if (result.status !== 200) {
                toast({ description: result.data.message, variant: "destructive" })
            } else {
                toast({ title: "Success", description: 'Student successfully added!', variant: "default" });
                router.push('/students');
            }

        } catch (error) {
            console.error(error);
            toast({ description: 'Error adding student. Please try again.', variant: 'destructive' });
        }
    };

    return (
        <div className="py-5 max-w-3xl mx-auto text-black">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800">Add New Student</h1>
                <Button onClick={() => router.push('/students')}>Back</Button>
            </div>
            <Separator className="mb-8" />

            {/* Form Component from shadcn */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Birth Date</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="date" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <FormControl>
                                        <select
                                            {...field}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="generation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Generation</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="major"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Major</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone_num"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="tel" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="mt-6 px-6 ">
                        Add Student
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default InsertStudent;
