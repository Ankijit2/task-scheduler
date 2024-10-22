import { ColumnDef } from '@tanstack/react-table';
import { UserData } from '@prisma/client';

export const Usercolumns: ColumnDef<UserData>[] = [
    {
      accessorKey: 'title', // This should match your UserData structure
      header: () => <div className='pl-4 text-left'>Title</div>,
      cell: ({ row }) => (
        <div className='max-w-56 break-words pl-4 font-semibold'>
          {row.getValue('title') || 'N/A'}
        </div>
      ),
    },
    {
      accessorKey: 'description',
      header: () => <div className='pl-4 text-left'>Description</div>,
      cell: ({ row }) => (
        <div className='max-w-56 break-words pl-4'>
          {row.getValue('description') || 'N/A'}
        </div>
      ),
    },
    {
      accessorKey: 'titleHash',
      header: () => <div className='pl-4 text-left'>Title Hash</div>,
      cell: ({ row }) => (
        <div className='max-w-56 break-words pl-4'>
          {row.getValue('titleHash') || 'N/A'}
        </div>
      ),
    },
    
    {
      accessorKey: 'wordCount',
      header: () => <div className='pl-4 text-left'>Word Count</div>,
      cell: ({ row }) => (
        <div className='max-w-56 break-words pl-4'>
          {row.getValue('wordCount') !== null ? row.getValue('wordCount') : 'N/A'}
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: () => <div className='pl-4 text-left'>Created At</div>,
      cell: ({ row }) => (
        <div className='max-w-56 break-words pl-4'>
          {row.getValue('createdAt') || 'N/A'}
        </div>
      ),
    },
    {
      accessorKey: 'updatedAt',
      header: () => <div className='pl-4 text-left'>Updated At</div>,
      cell: ({ row }) => (
        <div className='max-w-56 break-words pl-4'>
          {row.getValue('updatedAt') || 'N/A'}
        </div>
      ),
    }

  ];


