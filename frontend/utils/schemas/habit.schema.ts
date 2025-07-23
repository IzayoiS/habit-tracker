import { z } from "zod";

export const formHabitSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  start_date: z.string().min(1, "Start date is required"),
  longest_streak: z.number().optional(),
  current_streak: z.number().optional(),
  user_id: z.number().optional(),
});

export type FormHabitSchemaDTO = z.infer<typeof formHabitSchema>;
