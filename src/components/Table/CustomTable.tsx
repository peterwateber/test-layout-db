'use client';

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
} from '@tanstack/react-table';

import { Alert, Table } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import { useState, type RefObject } from 'react';
import { StickyHeaderTable } from './StickyHeaderTable';

interface DataTableProps<TData, TValue> {
    parentRef: RefObject<HTMLDivElement | null>;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    virtualizer: Virtualizer<HTMLDivElement, Element>;
    virtualRows?: VirtualItem[];
}

export function CustomTable<TData, TValue>({
    columns,
    data,
    parentRef,
    virtualizer,
    virtualRows,
}: DataTableProps<TData, TValue>) {
    const [tableRef, setTableRef] = useState<HTMLTableElement | null>(null);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <StickyHeaderTable
                table={table}
                parentRef={parentRef}
                tableRef={tableRef}
            />
            <div
                className="relative h-[400px] overflow-y-auto rounded-md"
                ref={parentRef}
            >
                <div
                    style={{
                        height: virtualizer.getTotalSize(),
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            transform: `translateY(${virtualRows?.[0]?.start ?? 0}px)`,
                        }}
                    >
                        <div className="rounded-md overflow-x-auto">
                            <Table ref={(newRef) => setTableRef(newRef)}>
                                <Table.Tbody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <Table.Tr key={row.id}>
                                                {row
                                                    .getVisibleCells()
                                                    .map((cell) => (
                                                        <Table.Td
                                                            key={cell.id}
                                                            className="pt-8 px-4"
                                                            style={{
                                                                width: 150,
                                                            }}
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </Table.Td>
                                                    ))}
                                            </Table.Tr>
                                        ))
                                    ) : (
                                        <Table.Tr>
                                            <Table.Td
                                                colSpan={columns.length}
                                                className="h-24 text-center"
                                            >
                                                <Alert
                                                    variant="light"
                                                    color="yellow"
                                                    radius="lg"
                                                    title="Unable to load data. Sorry 😔"
                                                    icon={<IconInfoCircle />}
                                                />
                                            </Table.Td>
                                        </Table.Tr>
                                    )}
                                </Table.Tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
