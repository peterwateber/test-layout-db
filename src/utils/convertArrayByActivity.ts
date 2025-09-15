import type { ReportItem } from '../api/types';
import { calculateHoursDuration } from './calculateHoursDuration';

interface ActivityDetails {
    id: string;
    duration: number;
    color: string;
}

interface ActivityReport {
    activityName: string;
    details: ActivityDetails;
}

/**
 * Converts an array of report items into a summary of total duration and color per activity.
 * The color for each activity is taken directly from the input data.
 */
export const convertArrayByActivity = (
    data: ReportItem[]
): ActivityReport[] => {
    const activityDurations = data.reduce(
        (
            accumulator: Record<string, ActivityDetails>,
            currentRecord: ReportItem
        ) => {
            const { id, name, color } = currentRecord.activity;

            const duration = calculateHoursDuration(
                currentRecord.duration.startedAt,
                currentRecord.duration.stoppedAt
            );

            if (accumulator[name]) {
                accumulator[name].duration += duration;
            } else {
                accumulator[name] = {
                    id,
                    duration,
                    color,
                };
            }

            return accumulator;
        },
        {}
    );

    return Object.entries(activityDurations).map(([activityName, details]) => ({
        activityName,
        details,
    }));
};
