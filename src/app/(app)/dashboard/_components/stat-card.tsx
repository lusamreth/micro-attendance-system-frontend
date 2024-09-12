import { Card, Text, Title } from '@tremor/react';

type StatCardProps = {
    title: string;
    value: string | number;
    icon: JSX.Element;
};

export const StatCard = ({ title, value, icon }: StatCardProps) => {
    return (
        <Card className="p-4 shadow-sm rounded-lg border">
            <Text>{title}</Text>
            <div className="flex items-center mt-2">
                {icon}
                <Title className="text-2xl ml-2">{value}</Title>
            </div>
        </Card>
    );
}
