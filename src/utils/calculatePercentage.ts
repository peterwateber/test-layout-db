import type { ReportItem, StatBoxType } from '../api/types';
import { calculateActivityPie } from './calculateActivityPie';

export const calculatePercentage = (entries: ReportItem[]): StatBoxType[] => {
    const data = calculateActivityPie(entries);

    // Calculate the total sum of all durations
    const totalDuration: number = data.reduce(
        (sum, item) => sum + item.duration,
        0
    );

    // Use a new type for the results that includes the percentage

    // Iterate and calculate the percentage for each item
    return data
        .map((item) => {
            const percentage: number = (item.duration / totalDuration) * 100;
            return {
                ...item,
                percentage: parseFloat(percentage.toFixed(2)),
            };
        })
        .sort((a, b) => b.percentage - a.percentage);
};
