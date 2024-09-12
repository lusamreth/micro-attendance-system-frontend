"use client"

import Sidebar from "@/components/sidebar";
import { PropsWithChildren, useState } from "react";

export default function AppLayout(props: PropsWithChildren) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-white max-w-screen overflow-x-hidden">
            {/* Sidebar Section */}
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-0'} `}>
                <Sidebar isOpen={isSidebarOpen} setOpen={setIsSidebarOpen} />
            </div>

            {/* Main Content Section */}
            <div className={`transition-all duration-300 flex-1 ${isSidebarOpen ? 'ml-0' : 'ml-0'} overflow-auto mt-10 ml-7`}>
                {props.children}
            </div>
        </div>
    );
}
