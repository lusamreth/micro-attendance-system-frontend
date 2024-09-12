import React from 'react';
import {
    ComposedChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

type AttendanceData = {
    date: string;
    present: number;
    absent: number;
    late: number;
};

type HeatMapProps = {
    data: AttendanceData[];
};

const RechartsHeatMap: React.FC<HeatMapProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" stackId="a" fill="#82ca9d" />
                <Bar dataKey="absent" stackId="a" fill="#ff6347" />
                <Bar dataKey="late" stackId="a" fill="#ffcc00" />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default RechartsHeatMap;
