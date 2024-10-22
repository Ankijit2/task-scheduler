import { ColumnDef } from '@tanstack/react-table';
import { status, UserData } from '@prisma/client';
import StatusColumn from './status';

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
          {new Date(row.getValue('createdAt')).toDateString() || 'N/A'}
        </div>
      ),
    },
    {
      accessorKey: 'updatedAt',
      header: () => <div className='pl-4 text-left'>Updated At</div>,
      cell: ({ row }) => (
        <div className='max-w-56 break-words pl-4'>
          {new Date(row.getValue('updatedAt')).toDateString() || 'N/A'}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: () => <div className='pl-4 text-left'>Status</div>,
      cell: ({ row }) => {
        const status = row.original.status;
        const id = row.original.id;
        return (
        <div className='max-w-56 break-words pl-4'>
          <StatusColumn Status= {status} id={id}/>
        </div>
        )
       
      },
    }

  ];


