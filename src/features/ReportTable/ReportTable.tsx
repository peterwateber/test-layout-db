import { useVirtualizer } from '@tanstack/react-virtual';

import { Loader } from '@mantine/core';
import { type ColumnDef } from '@tanstack/react-table';
import { useRef, type FC } from 'react';
import { type ReportItem } from '../../api/postReport';
import { CustomTable } from '../../components/Table/CustomTable';
import { calculateHoursDuration } from '../../utils/calculateHoursDuration';

interface ReportTableProps {
    entries: ReportItem[];
    isLoading: boolean;
}

export const ReportTable: FC<ReportTableProps> = ({ entries, isLoading }) => {
    const parentRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
        count: entries.length ?? 0,
        estimateSize: () => 40, // Average row height
        getScrollElement: () => parentRef.current,
    });

    const virtualRows = virtualizer.getVirtualItems();
    const visibleRows = virtualRows
        .map((virtualRow) => entries[virtualRow.index])
        .filter(Boolean);

    if (isLoading) return <Loader color="blue" />;

    return (
        <CustomTable
            columns={tableColumns}
            data={visibleRows}
            parentRef={parentRef}
            virtualizer={virtualizer}
            virtualRows={virtualRows}
        />
    );
};

const tableColumns: ColumnDef<ReportItem | undefined>[] = [
    {
        accessorKey: 'user',
        header: () => <div>User</div>,
        cell: ({ row }) => <div>{row.original?.user.email}</div>,
    },
    {
        accessorKey: 'activity',
        header: () => <div>Activity</div>,
        cell: ({ row }) => <div>{row.original?.activity.name}</div>,
    },
    {
        accessorKey: 'project',
        header: () => <div>Project</div>,
        cell: ({ row }) => <div>{row.original?.folder.name}</div>,
    },
    {
        accessorKey: 'duration',
        header: () => <div>Duration</div>,
        cell: ({ row }) => (
            <div>
                {calculateHoursDuration(
                    row.original?.duration.startedAt || '',
                    row.original?.duration.stoppedAt || ''
                )}{' '}
                hours
            </div>
        ),
    },
];
