import axios from 'axios';
import {  UserDataSchema } from '@/types/Userdata';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
export const apiClient = axios.create({ baseURL: '/api/' });

export type UserType = z.infer<typeof UserDataSchema>;

export const getData = async () => {
    return (await apiClient.get('user')).data;
}
export const postData = async (data: UserType) => {
    return (await apiClient.post('user', data)).data;
  };
  
  export const deleteData = async (id: string) => {
    return (await apiClient.delete(`user/${id}`)).data;
  };
  
  
  export const updateData = async (data: Partial<UserType>) => {
    return (await apiClient.put('user', data)).data;
  };

  export function useGetData() {
    return useQuery({
      queryKey: ['userData'], 
      queryFn: () => getData(),
    });
  }

  export function usePostData() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: postData,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userData'] });
      },
    });
  }

  export function useDeleteData() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deleteData,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userData'] });
      },
    });
  }