'use client';

import { ScrollArea } from '@radix-ui/react-scroll-area';
import { flexRender } from '@tanstack/react-table';
import React from 'react';


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Table as TTable } from '@tanstack/react-table';


interface DataTableProps<TData> {
  table: TTable<TData>;
  loading: boolean;
  onClick?: (id: string) => void;
}

export function DataTable<TData>({
  table,
  loading,
  onClick,
}: DataTableProps<TData & { id?: string }>) {
  return (
    <ScrollArea className='no-visible-scrollbar flex flex-1 overflow-scroll rounded-md border'>
      <Table>
        <TableHeader className='sticky top-0 bg-background'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className='bg-background'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className='h-56 w-full text-center'
              >
                {!loading ? 'No results' : 'loading...'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
