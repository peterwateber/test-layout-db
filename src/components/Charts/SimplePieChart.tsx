import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import type { PieSectorData } from 'recharts/types/polar/Pie';
import type { ReportItem } from '../../api/types';
import { calculateActivityPie } from '../../utils/calculateActivityPie';

interface SimplePieChartProps {
    data?: ReportItem[];
}

export const SimplePieChart: React.FC<SimplePieChartProps> = ({ data }) => {
    const activityPie = calculateActivityPie(data || []);

    if (!data || !data.length) return null;

    return (
        <div className="w-[100%] h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={activityPie}
                        labelLine={false}
                        label={(props) => <PieLabel {...props} />}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="duration"
                    >
                        {activityPie.map((entry) => (
                            <Cell
                                key={`cell-${entry.name}`}
                                fill={entry.color}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

const RADIAN = Math.PI / 180;

// Pie chart has typescript issues with custom label
const PieLabel = (props: PieSectorData & any) => {
    const {
        cx = 0,
        cy = 0,
        midAngle = 0,
        innerRadius = 0,
        outerRadius = 0,
        percent = 0,
        // payload,
    } = props;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
