// src/components/StatusColumn.tsx

import React from 'react';
import { RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { status } from '@prisma/client';
import { getDataById } from '../hooks/hook';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '@/app/store/slices/user-slice';// Adjust the path to your userSlice

interface StatusColumnProps {
  Status: status;
  id: string;
}

function StatusColumn({ Status, id }: StatusColumnProps) {
  const dispatch = useDispatch();

  async function handleClick() {
    const response = await getDataById(id); // Fetch the user data by ID
    console.log(response);

    if (response.status === status.processed) {
      // Dispatch action to update user in the store
     console.log(response.data.user); // Ensure response contains the updated user object
    }
  }

  return (
    <div className='flex items-center justify-center gap-3'>
      <div>{Status}</div>
      <Button
        className='py-1'
        variant={'outline'}
        disabled={Status === status.processed}
        onClick={handleClick}
      >
        <RefreshCcw className='h-4 w-4' />
      </Button>
    </div>
  );
}

export default StatusColumn;
