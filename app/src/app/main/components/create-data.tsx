'use client';

import { CirclePlus as Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription, // Add DialogDescription
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserDataSchema } from '@/types/Userdata';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostData } from '../hooks/hook';

export function CreateData() {

  const [toggleMenu, setToggleMenu] = useState(false);
  const { mutate, isPending } = usePostData();
  const form = useForm<z.infer<typeof UserDataSchema>>({
    resolver: zodResolver(UserDataSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });
  const handleToggleMenu = useCallback(() => {
    setToggleMenu((prev) => !prev);
  }, []);

  function handleOnSaveClicked(
    values: z.infer<typeof UserDataSchema>
  ) {
    const formValues = form.getValues();
    mutate(formValues, {
      onSuccess: () => {
        setToggleMenu(false);
      },
    });
  }

  return (
    <Dialog open={toggleMenu}>
      <Button variant='outline' onClick={handleToggleMenu}>
        New campaign
      </Button>

      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleOnSaveClicked)}>
            <DialogHeader>
              <DialogTitle>Create a new UserData</DialogTitle>
              {/* Adding DialogDescription */}
              <DialogDescription>
                Please fill out the form below to create a new user data entry.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter the Title'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter the Description'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className='mt-4'>
              <Button type='submit' disabled={isPending}>
                {isPending ? 'Creating...' : 'Create'}
              </Button>
              <Button
                onClick={handleToggleMenu}
                variant={'outline'}
                type='button'
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
