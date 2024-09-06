"use client"

import React, { useMemo } from 'react';
import {
    Card, Title, Text, Tab, TabList, TabGroup, TabPanel, TabPanels, AreaChart,
    Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, TableFoot, TableFooterCell,

} from "@tremor/react";
import { BarChart } from "@/components/ui/bar-chart";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/seperator";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, ShoppingCart } from "lucide-react";
import { TableCaption } from '@/components/ui/table';
import Link from 'next/link';
import { IconAlertTriangle } from '@tabler/icons-react';

const categoryData = [
    { name: "Electronics", sales: 9800 },
    { name: "Clothing", sales: 4567 },
    { name: "Books", sales: 3908 },
    { name: "Home & Garden", sales: 2400 },
];

const studentData = [
    { date: "Jan 23", present: 18, absent: 8, late: 4 },
    { date: "Feb 23", present: 20, absent: 6, late: 4 },
    { date: "Mar 23", present: 15, absent: 10, late: 5 },
    { date: "Apr 23", present: 22, absent: 5, late: 3 },
    { date: "May 23", present: 25, absent: 3, late: 2 },
    { date: "Jun 23", present: 19, absent: 8, late: 3 },
];


type AbsentTeeTableData = {
    id: string
    name: string
    class: string,
    absent: number
}
type AbsentTeeTableProps = {
    title: string
    data: AbsentTeeTableData[]
}

const AbsentTeeTable = (props: AbsentTeeTableProps) => {
    return (
        <div className="max-h-32 no-scrollbar">
            <h1 className="text-tremor-content-strong 
            dark:text-dark-tremor-content-strong  text-lg
            capitalize
            font-semibold">
                {props.title}
            </h1>
            <div className="
                pt-2 pb-5 w-full
            ">
                <Separator />
            </div>
            <Table className="text-gray-600 scroll max-h-64 scrollbar-hide">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Class</TableHeaderCell>
                        <TableHeaderCell>Absent</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.data.map(item => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-blue-500">
                                        <Link href="/">
                                            {item.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="pl-8">{item.class}</TableCell>
                                    <TableCell className="pl-8">{item.absent}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

// Sample Data
const convertedData = studentData.map(({ date, present, absent, late }) => {
    const total = present + absent + late;
    return {
        date,
        present: ((present / total) * 100).toFixed(2), // Present percentage
        absent: ((absent / total) * 100).toFixed(2),   // Absent percentage
        late: ((late / total) * 100).toFixed(2),       // Late percentage
    };
});

type StatCardProps = {
    title: string
    value: string
    icon: JSX.Element
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
    return (
        <Card className="bg-white shadow-sm rounded-lg p-4 border">
            <Text className="text-gray-500">{title}</Text>
            <div className="flex items-center space-x-2">
                {icon}
                <Title className="text-2xl font-bold pt-1">{value}</Title>
            </div>
            {
                // <Badge className="mt-2 bg-blue-100 text-blue-800">
                //     <ArrowUpRight className="w-4 h-4 mr-1" />
                //     12% increase
                // </Badge>
            }
        </Card>
    )
}

// const filterByDateRange = (data, startDate, endDate) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     return data.filter(({ date }) => {
//         const currentDate = new Date(`${date} 01`); // Assuming the date is in "MMM YY" format
//         return currentDate >= start && currentDate <= end;
//     });
// };

export default function Dashboard() {
    const absenteeData = useMemo(() => {
        return studentData.map((data, i) => ({ id: i, date: data.date, absent: data.absent, class: "A", name: "Vy danith" }))
    }, [])
    return (
        <div className="min-h-screen bg-white">
            {/* Main Container */}
            <div className="p-6 max-w-7xl mx-auto">
                <Title className="mb-6 text-3xl font-bold text-gray-800">Dashboard</Title>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 mb-6">
                    <StatCard
                        title="Failing Attendance"
                        value="$ 34,743"
                        icon={<DollarSign className="text-blue-500" />}
                    />
                    <StatCard
                        title="Approach Failing"
                        value="1,274"
                        icon={<IconAlertTriangle className="text-yellow-500" />}
                    />
                    <StatCard
                        title="Active Attendee"
                        value="2,143"
                        icon={<Users className="text-green-500" />}
                    />
                </div>

                {/* Tabs for Sales and User Charts */}
                <TabGroup className="space-y-6">
                    <TabList className="mb-6">
                        <Tab className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none">Overview</Tab>
                        <Tab className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none">Detail</Tab>
                    </TabList>
                    <TabPanels>
                        {
                            <TabPanel >
                                {/* Charts */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10 ">
                                    <Card className="bg-white shadow-sm p-6 rounded-lg border">
                                        <Title className="text-lg font-semibold text-gray-600">Absentism Over Time</Title>
                                        <AreaChart
                                            className="h-72 text-black"
                                            data={absenteeData}
                                            index="date"
                                            categories={["absent"]}
                                            colors={["blue"]}
                                        />
                                    </Card>
                                    <Card className="bg-white shadow-sm p-6 rounded-lg border">
                                        <AbsentTeeTable data={absenteeData} title={"student with the most absent"} />
                                    </Card>
                                </div>
                            </TabPanel>
                        }
                        <TabPanel>
                            <Card className="bg-white shadow-sm p-4 bg-white rounded-lg border">
                                <Title className="text-lg font-semibold text-gray-600 pt-4 px-6">Attendance Rate (30 students)</Title>
                                <BarChart
                                    className="h-[400px] px-4"
                                    data={studentData}
                                    index="date"
                                    type="stacked"
                                    categories={["present", "absent", "late"]}
                                    colors={["blue", "amber", "violet"]} // <-- Custom color
                                    valueFormatter={(number: number) =>
                                        `${number}`
                                    }
                                    onValueChange={(v) => console.log(v)}
                                />
                                {
                                    // <BarChart
                                    //     className="h-72 mt-4 bg-white"
                                    //     data={userData}
                                    //     index="date"
                                    //     categories={["Active Users"]}
                                    //     colors={["green"]}
                                    // />
                                }
                            </Card>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>

                {/* Generate Report Button */}
                <div className="mt-6 flex justify-end">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">Generate Report</Button>
                </div>
            </div>
        </div>
    );
}
