"use client";
import React, { useMemo } from 'react';
import { Card, Title, AreaChart, BarChart } from '@tremor/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/seperator';
import { IconAlertTriangle, IconUsers, IconFall, IconFlag } from '@tabler/icons-react';
import { StatCard } from './_components/stat-card';
import { AbsentTeeTable } from './_components/absentee-table';
import { useStudentData, useClassroomData, useEnrollmentData, useAttendanceData } from '@/hooks/common';
import { calculateStatistics, findClassWithMostAbsentees } from './helpers';
import { Attendance } from '@/hooks/common-types';
import Heatmap from "./_components/heatmap"
import MiniSkeletonLoader from '@/components/mini-skeleton-loader';
// Helper function to get the next date as a string in 'MM/DD/YYYY' format
const getNextDate = (currentDate: string, daysToAdd: number): string => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString();
};

// Helper function to group and count attendance per date
const groupAttendanceByDate = (attendances: any[]) => {
    const grouped: Record<string, { date: string; absent: number; present: number; late: number }> = {};

    attendances.forEach((attendance) => {
        const date = new Date(attendance.entry_time * 1000).toLocaleDateString(); // Convert timestamp to readable date
        const status = attendance.punctuality;

        // Initialize the date in the grouped object if it doesn't exist
        if (!grouped[date]) {
            grouped[date] = { date, absent: 0, present: 0, late: 0 };
        }

        // Increment the appropriate attendance status count
        if (status === 'absent') {
            grouped[date].absent += 1;
        } else if (status === 'ontime') {
            grouped[date].present += 1;
        } else if (status === 'late') {
            grouped[date].late += 1;
        }
    });

    // Ensure at least two dates are present
    const groupedDates = Object.keys(grouped);
    if (groupedDates.length === 1) {
        const currentDate = groupedDates[0];

        // Add empty data for the next 2 days
        const nextDate1 = getNextDate(currentDate, 1);
        const nextDate2 = getNextDate(currentDate, 2);

        grouped[nextDate1] = { date: nextDate1, absent: 0, present: 0, late: 0 };
        grouped[nextDate2] = { date: nextDate2, absent: 0, present: 0, late: 0 };
    }

    // Convert grouped object to array of values
    return Object.values(grouped);
};

const Dashboard = () => {
    const { data: students, isLoading: studentLoading } = useStudentData();
    const { data: classrooms } = useClassroomData();
    const { attendances, isLoading } = useAttendanceData();

    // Process and format data for the BarChart
    const attendanceChartData = useMemo(() => {
        if (!attendances) return [];
        return groupAttendanceByDate(attendances); // Grouped data by date
    }, [attendances]);
    const statistics = useMemo(() => {
        if (students) {
            return calculateStatistics(students);
        }
        return {};
    }, [students]);

    const mostAbsentClass = useMemo(() => {
        if (students && classrooms) {
            return findClassWithMostAbsentees(students, classrooms);
        }
        return {};
    }, [students, classrooms]);

    if (studentLoading) {
        return (
            <div>
                <MiniSkeletonLoader />
            </div>
        )
    }
    console.log(students, attendanceChartData, attendances)
    return (
        <div className="min-h-screen bg-white p-6 mx-10 text-black">
            <Title className="text-3xl mb-6">Dashboard</Title>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <StatCard title="Total Absentees" value={statistics.totalAbsent} icon={<IconAlertTriangle className="text-red-500" />} />
                <StatCard title="Total Present" value={statistics.totalPresent} icon={<IconUsers className="text-green-500" />} />
                <StatCard title="Absentee Rate" value={`${isNaN(statistics.absenteeRate) ? 0 : statistics.absenteeRate}%`} icon={<IconFall className="text-yellow-500" />} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-10">
                <Card className="p-6 border rounded-lg shadow-sm">
                    <Title>Attendance Over Time</Title>
                    <BarChart
                        className="mt-4"
                        data={attendanceChartData} // Processed data for BarChart
                        index="date"
                        categories={['absent', 'present', 'late']} // Stacked categories
                        colors={['red', 'green', 'yellow']}
                        valueFormatter={(number: number) => `${number}`} // Optional formatter
                        stack // Stack the bars for better comparison
                    />
                </Card>

                {/* Absent Students Table */}
                <Card className="p-6 border rounded-lg shadow-sm">
                    <AbsentTeeTable data={students || []} title="Students with Most Absentees" />
                </Card>
            </div>
            {
                // <Card className="p-6">
                //     <Title>Most Absent Class</Title>
                //     <p>Class: {mostAbsentClass[0]}</p>
                //     <p>Total Absentees: {mostAbsentClass[1]}</p>
                // </Card>
            }
        </div>
    );
};

export default Dashboard;
