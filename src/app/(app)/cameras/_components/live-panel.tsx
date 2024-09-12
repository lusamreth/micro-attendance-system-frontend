"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/seperator";
import { useForm } from "react-hook-form";

// Add more libraries as needed for WebRTC and backend streaming
import io from "socket.io-client"; // For backend communication


const CameraManagement = () => {
    let socket: WebSocket | null = null;
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [streaming, setStreaming] = useState(false);
    const { handleSubmit } = useForm();
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    const cameras = [
        { id: 1, name: "Camera 1", location: "Front Door", status: "Online" },
        { id: 2, name: "Camera 2", location: "Back Yard", status: "Offline" },
        { id: 3, name: "Camera 3", location: "Garage", status: "Online" },
    ];

    const startStreaming = async () => {
        try {
            // Request camera access
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setStreaming(true);

            // Initialize WebSocket connection
            wsRef.current = new WebSocket(`http://localhost:8001/ws`);

            // Create a new peer connection
            peerConnectionRef.current = new RTCPeerConnection();

            // Add tracks to the peer connection
            stream.getTracks().forEach((track) => {
                peerConnectionRef.current?.addTrack(track, stream);
            });

            // Handle ICE candidates
            peerConnectionRef.current.onicecandidate = (event) => {
                if (event.candidate && wsRef.current?.readyState === WebSocket.OPEN) {
                    wsRef.current.send(JSON.stringify({ type: "ice-candidate", candidate: event.candidate }));
                }
            };

            // WebSocket messages handling (signaling)
            wsRef.current.onmessage = async (event) => {
                const message = JSON.parse(event.data);
                console.log('me', message)
                if (message.type === "offer") {

                    // Set remote description with received offer
                    await peerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription(message.sdp));

                    // Create answer and send it to the backend
                    const answer = await peerConnectionRef.current?.createAnswer();
                    await peerConnectionRef.current?.setLocalDescription(answer);
                    wsRef.current?.send(JSON.stringify({ type: "answer", answer }));
                } else if (message.type === "ice-candidate") {
                    // Add received ICE candidate
                    await peerConnectionRef.current?.addIceCandidate(new RTCIceCandidate(message.candidate));
                }
            };

            // Create offer and send it to the backend
            const offer = await peerConnectionRef.current?.createOffer();
            await peerConnectionRef.current?.setLocalDescription(offer);
            if (wsRef) {
                wsRef.current.onopen = () => {
                    wsRef.current?.send(JSON.stringify({ type: "offer", offer }));
                };
            }


        } catch (err) {
            console.error("Error accessing camera", err);
        }
    };

    const stopStreaming = () => {
        // Close WebSocket and stop the media tracks
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current?.close();
        }

        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }

        setStreaming(false);
    };

    return (
        <div className="py-5">
            <div className="flex justify-between items-center mb-4 mx-auto px-10 max-w-full">
                <h1 className="text-2xl font-bold text-gray-500 ml-4">Camera Management</h1>
                <Button onClick={() => router.push("/cameras/create")}>Add New Camera</Button>
            </div>
            <div className="pb-8 w-full">
                <Separator />
            </div>

            <div className="flex flex-col items-center mt-10 justify-center w-full flex-1">
                {cameras.length > 0 ? (
                    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mx-10 grow max-w-[1600px] w-full px-10`}>
                        {cameras.map((camera, index) => (
                            <div
                                key={camera.id}
                                className={`col-span-1 ${cameras.length === 3 && index === 2 ? 'sm:col-span-2' : ''}`}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{camera.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="aspect-video bg-gray-200 mb-2">
                                            <video ref={videoRef} autoPlay muted className="w-full h-full" />
                                        </div>
                                        <p>Location: {camera.location}</p>
                                        <p>Status: {camera.status}</p>
                                        {!streaming ? (
                                            <Button onClick={startStreaming}>Start Streaming</Button>
                                        ) : (
                                            <Button onClick={stopStreaming}>Stop Streaming</Button>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-lg text-gray-500">No cameras available</p>
                        <Button className="mt-4" onClick={() => router.push("/cameras/create")}>
                            Add a Camera
                        </Button>
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
