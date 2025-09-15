import { useMemo } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import type { ContentType } from 'recharts/types/component/Tooltip';
import type { ReportItem } from '../../api/types';
import { convertArrayByActivity } from '../../utils';

interface SimpleBarChartProps {
    data: ReportItem[];
}

export function SimpleBarChart({ data }: SimpleBarChartProps) {
    const activities = useMemo(() => convertArrayByActivity(data), [data]);

    return (
        <div className="h-[390px] w-[100%]">
            <ResponsiveContainer>
                <BarChart data={activities} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="category" dataKey="activityName" width={100} />
                    <YAxis type="number" unit="h" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="details.duration" radius={[8, 8, 0, 0]}>
                        {activities.map((act) => (
                            <Cell
                                key={act.details.id}
                                fill={act.details.color}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

const CustomTooltip = ({
    active,
    payload,
    label,
}: ContentType<any, any> & any) => {
    const isVisible = active && payload && payload.length;
    return (
        <div
            className="bg-white p-2 border-1 border-gray-400 rounded-sm"
            style={{ visibility: isVisible ? 'visible' : 'hidden' }}
        >
            {isVisible && (
                <>
                    <p>{payload[0].value} hours</p>
                    <p>{label}</p>
                </>
            )}
        </div>
    );
};
