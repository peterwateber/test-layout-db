import type { ReportItem } from '../api/types';
import { calculateHoursDuration } from './calculateHoursDuration';

export const calculateActivityPie = (data: ReportItem[]) => {
    const m = new Map<string, { duration: number; color: string }>();
    for (const e of data || []) {
        if (Object.values(e).length) {
            const duration = calculateHoursDuration(
                e.duration.startedAt,
                e.duration.stoppedAt
            );
            m.set(e.activity.name, {
                duration: (m.get(e.activity.name)?.duration || 0) + duration,
                color: e.activity.color,
            });
        }
    }
    return Array.from(m.entries()).map(([name, obj]) => ({
        ...obj,
        name,
    }));
};
