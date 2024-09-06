"use client"
import { cn } from '@/lib/utils';
import Link from "next/link"
import {
    Icon,
    IconBook,
    IconBurger,
    IconChartPie,
    IconChevronDownLeft,
    IconDeviceComputerCamera,
    IconFileInvoice,
    IconFilePencil,
    IconLogout,
    IconMenu,
    IconNote,
    IconReportAnalytics,
    IconSchool,
    IconSettings,
    IconUser,
} from "@tabler/icons-react"
import { Button } from './ui/button';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Text from '@/components/ui/text';
import { ChevronDown } from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
}

const SIDEBAR_ITEMS = [
    { icon: IconChartPie, label: "Dashboard", href: "/dashboard" },
    { icon: IconSchool, label: "Student", href: "/students" },
    { icon: IconDeviceComputerCamera, label: "Cameras", href: "/cameras" },
    { icon: IconNote, label: "Live Attendance", href: "/attendances" },
    { icon: IconBook, label: "Subjects", href: "/clients" },
]

export default function Sidebar({ isOpen }: SidebarProps) {
    const [currentPathname, setCurrentPathname] = useState("")
    const [activeIndex, setActiveIndex] = useState(-1);
    // useEffect(() => {
    //     const active = window.location.href
    //     const url = new URL(active)
    //     setCurrentPathname(url.pathname);
    // }, [])

    // const activeIndex = useMemo(() => {
    //     const index = SIDEBAR_ITEMS.findIndex((item) => currentPathname.indexOf(item.href) > -1)
    //     return index
    // }, [currentPathname])

    console.log(activeIndex)

    return (
        <React.Fragment
        >
            <div
                className={cn(
                    "fixed inset-y-0 left-0 bg-gray-800 text-white w-72 transform",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                    "transition-transform duration-300 ease-in-out md:translate-x-0"
                )}
            >

                <div className="h-full flex flex-col space-y-8">
                    <div className="flex items-center justify-between h-16 px-6 pt-8">
                        <span className="text-lg font-semibold">Dashboard</span>
                        <span className="text-lg font-semibold cursor-pointer">
                            <IconMenu />
                        </span>
                    </div>
                    <nav className="flex-1 px-2 py-6">
                        {
                            SIDEBAR_ITEMS.map((item, i) => (
                                <div onClick={() => setActiveIndex(i)} className="">
                                    <SidebarItem
                                        icon={item.icon}
                                        label={item.label}
                                        active={i === activeIndex}
                                        href={item.href}
                                    />
                                </div>
                            ))
                        }
                    </nav>
                    <div className="border-t flex items-center justify-between px-4 py-4 rounded-lg text-white pb-6 ">
                        <div className="flex justify-between items-center text-md gap-3">
                            <div className="bg-gray-600 rounded-full p-3">
                                <IconUser />
                            </div>
                            <Text variant="title" className="pt-1">
                                User #1
                            </Text>
                        </div>
                        <div className="rounded-full hover:bg-gray-600">
                            <ChevronDown className="w-7 h-7" />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

interface SidebarItemProps {
    icon: Icon
    label: string
    active: boolean
    href: string
    isDisabled?: boolean
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
            className={cn(
                "w-full justify-start text-muted-foreground text-md py-4 h-12 text-white hover:bg-gray-700 hover:text-white",
                active && "text-primary font-semibold"
            )}
        >
            <Link href={!isDisabled ? href : "/pricing"}>
                <Icon size={24} className="mr-4" />
                <Text className="text-md">{label}</Text>
            </Link>
        </Button>
    )
}
