import {  z } from 'zod';

export const UserDataSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
    description: z.string().min(3, "Description must be at least 3 characters").max(500, "Description must be less than 500 characters"),
});