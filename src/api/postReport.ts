import { getToken } from '../utils/tokenStorage';
import type { ReportItem } from './types';

interface CustomResponse extends Response {
    json: () => Promise<{
        timeEntries: ReportItem[];
    }>;
}

export const postReport = async (
    start: string,
    end: string
): Promise<ReportItem[]> => {
    if (!start || !end) return [];
    const rows = await fetch('/proxy/api/v4/report', {
        method: 'POST',
        body: JSON.stringify({
            date: {
                start,
                end,
            },
            fileType: 'json',
        }),
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
        },
    }).then((res: CustomResponse) => res.json());

    return rows.timeEntries;
};
