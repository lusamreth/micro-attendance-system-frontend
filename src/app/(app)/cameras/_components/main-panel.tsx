"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/seperator';

const CameraManagement = () => {
    // Mock data for demonstration
    const router = useRouter();
    const cameras = [
        { id: 1, name: "Camera 1", location: "Front Door", status: "Online" },
        { id: 2, name: "Camera 2", location: "Back Yard", status: "Offline" },
        { id: 3, name: "Camera 3", location: "Garage", status: "Online" },
    ];

    return (
        <div className="py-5">
            <div className="flex justify-between items-center mb-4 mx-auto px-10 max-w-full">
                <h1 className="text-2xl font-bold text-gray-500 ml-4">Camera Management</h1>
                <Button onClick={() => router.push("/cameras/create")}>Add New Camera</Button>
            </div>
            <div className="pb-8 w-full">
                <Separator />
            </div>

            <div className="flex flex-col items-center mt-10 justify-center w-full flex-1 ">
                {cameras.length > 0 ? (
                    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mx-10 grow max-w-[1600px] w-full px-10`}>
                        {cameras.map((camera, index) => (
                            <div
                                key={camera.id}
                                className={`col-span-1 ${cameras.length === 3 && index === 2 ? 'sm:col-span-2' : ''
                                    }`}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{camera.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="aspect-video bg-gray-200 mb-2">
                                            {/* Placeholder for video stream */}
                                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                Video Stream
                                            </div>
                                        </div>
                                        <p>Location: {camera.location}</p>
                                        <p>Status: {camera.status}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-lg text-gray-500">No cameras available</p>
                        <Button className="mt-4" onClick={() => router.push("/cameras/create")}>Add a Camera</Button>
                    </div>
                )}

                <Card className="mt-8 w-full max-w-[1400px] mx-10 px-12">
                    <CardHeader>
                        <CardTitle>Camera Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cameras.map((camera) => (
                                    <TableRow key={camera.id}>
                                        <TableCell>{camera.name}</TableCell>
                                        <TableCell>{camera.location}</TableCell>
                                        <TableCell>{camera.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CameraManagement;
