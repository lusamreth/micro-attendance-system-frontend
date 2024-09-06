import Sidebar from "@/components/sidebar";
import { PropsWithChildren } from "react";

export default function AppLayout(props: PropsWithChildren) {
    return (
        <div>
            <div className="flex min-h-screen justify-between bg-white">
                <Sidebar isOpen={true} />
                {/* Content: Responsive width, with padding */}
                <div className="w-full md:ml-64 overflow-auto">
                    {props.children}
                </div>
            </div>
        </div>
    )
}
