import { cn } from '@/lib/utils';
import Link from "next/link"
import {
    IconBuilding,
    IconChartPie,
    IconDeviceComputerCamera,
    IconNote,
    IconSchool,
    IconUser,
} from "@tabler/icons-react"
import { Button } from './ui/button';
import React, { useState } from 'react';
import Text from '@/components/ui/text';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';  // Hamburger and close icon

interface SidebarProps {
    isOpen: boolean;
    setOpen: (value: boolean) => void
}

const SIDEBAR_ITEMS = [
    { icon: IconChartPie, label: "Dashboard", href: "/dashboard" },
    { icon: IconSchool, label: "Student", href: "/students" },
    { icon: IconDeviceComputerCamera, label: "Cameras", href: "/cameras", disabled: true },
    { icon: IconNote, label: "Live Attendance", href: "/attendances", disabled: true },
    { icon: IconBuilding, label: "Classrooms", href: "/classrooms" },
]

export default function Sidebar({ isOpen, setOpen }: SidebarProps) {
    const [activeIndex, setActiveIndex] = useState(-1);

    const toggleSidebar = () => setOpen(!isOpen);

    return (
        <React.Fragment>
            {/* Animated Hamburger */}
            <div className="fixed top-6 left-6 z-50">
                <button onClick={toggleSidebar} className="focus:outline-none">
                    {isOpen ? (
                        <div></div>
                    ) : (
                        <motion.div
                            initial={{ rotate: 90 }}
                            animate={{ rotate: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Menu size={48} className="text-black border p-1 border-black rounded-lg" />
                        </motion.div>
                    )
                    }
                </button>
            </div>

            {/* Sidebar */}
            <motion.div
                className={cn(
                    "fixed inset-y-0 left-0 bg-gray-800 text-white w-72 transform",
                    "md:translate-x-0"
                )}
                initial={{ x: '-100%' }}
                animate={{ x: isOpen ? '0%' : '-100%' }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="h-full flex flex-col space-y-8">
                    <div className="flex items-center justify-between h-16 px-6 pt-8">
                        <span className="text-lg font-semibold">Dashboard</span>
                        <button className="text-lg font-semibold cursor-pointer " onClick={toggleSidebar}>
                            <X size={32} className="text-white" />
                        </button>
                    </div>
                    <nav className="flex-1 px-2 py-6">
                        {SIDEBAR_ITEMS.map((item, i) => (
                            <div key={item.label} onClick={() => setActiveIndex(i)}>
                                <SidebarItem
                                    icon={item.icon}
                                    label={item.label}
                                    active={i === activeIndex}
                                    href={item.href}
                                    isDisabled={item.disabled ?? false}
                                />
                            </div>
                        ))}
                    </nav>
                    <div className="border-t flex items-center justify-between px-2 py-3 rounded-lg text-white">
                        <div className="flex justify-between items-center text-md gap-3">
                            <div className="bg-gray-600 rounded-full p-1">
                                <IconUser />
                            </div>
                            <Text variant="title" className="pt-1">
                                Reth សខាខេត្តសៀមរាប
                            </Text>
                        </div>
                    </div>
                </div>
            </motion.div>
        </React.Fragment>
    );
}

interface SidebarItemProps {
    icon: React.ComponentType;
    label: string;
    active: boolean;
    href: string;
    isDisabled?: boolean;
}

function SidebarItem({
    icon: Icon,
    label,
    active,
    href,
    isDisabled = false,
}: SidebarItemProps) {
    const variant = active ? "secondary" : "ghost"

    return (
        <Button
            asChild
            variant={variant}
            disabled={isDisabled}
            className={cn(
                "w-full justify-start text-muted-foreground text-md py-4 h-12 text-white hover:bg-gray-700 hover:text-white",
                active && "text-primary font-semibold",
                isDisabled && "text-slate-400"
            )}
        >
            <Link href={!isDisabled ? href : "/dashboard"}>
                <Icon size={24} className="mr-4" />
                <Text className="text-md">{label}</Text>
            </Link>
        </Button>
    )
}
