import { useEffect, useState, type RefObject } from 'react';

// You'll need to define your own CSS for this
import { flexRender, type Table } from '@tanstack/react-table';

interface StickyHeaderTableProps<TData> {
    parentRef?: RefObject<HTMLDivElement | null>;
    tableRef: HTMLTableElement | null;
    table: Table<TData>;
}

export const StickyHeaderTable = <TData,>({
    table,
    tableRef,
}: StickyHeaderTableProps<TData>) => {
    const [cols, setCols] = useState<number[]>([]);
    useEffect(() => {
        if (!tableRef) return;
        const tableRect =
            tableRef.querySelectorAll('table > tbody > tr:first-child td') ||
            [];
        setCols(Array.from(tableRect).map((cell) => cell.scrollWidth));
    }, [tableRef]);

    return (
        <>
            {table.getHeaderGroups().map((headerGroup) => (
                <div
                    key={headerGroup.id}
                    className="flex bg-black/3 border-b border-black/5 rounded-sm"
                >
                    {headerGroup.headers.map((header, index) => (
                        <div
                            key={header.id}
                            className="px-2 py-2 text-md font-semibold text-black/80"
                            style={{
                                width:
                                    cols.length === headerGroup.headers.length
                                        ? cols[index]
                                        : 150,
                            }}
                        >
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                  )}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};
