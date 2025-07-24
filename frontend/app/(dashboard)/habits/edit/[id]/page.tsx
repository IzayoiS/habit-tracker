"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateHabit, useHabits } from "../../hooks/use-habit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  formHabitSchema,
  FormHabitSchemaDTO,
} from "@/utils/schemas/habit.schema";
import { useParams, useRouter } from "next/navigation";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { Habit } from "@/app/(dashboard)/habits/types/habit";

export default function EditHabitPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: habits } = useHabits();
  const { mutate: updateHabit, isPending } = useUpdateHabit();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [openCalendar, setOpenCalendar] = useState(false);

  const form = useForm<FormHabitSchemaDTO>({
    resolver: zodResolver(formHabitSchema),
    defaultValues: {
      name: "",
      description: "",
      start_date: "",
    },
  });

  // Load existing habit data when habits are loaded
  useEffect(() => {
    if (habits && id) {
      const habitId = Array.isArray(id) ? id[0] : id;
      const habit = habits.find((h: Habit) => h.id === Number(habitId));
      if (habit) {
        form.reset({
          name: habit.name,
          description: habit.description,
          start_date: habit.start_date,
        });
        if (habit.start_date) {
          setDate(new Date(habit.start_date));
        }
      }
    }
  }, [habits, id, form]);

  const onSubmit = (data: FormHabitSchemaDTO) => {
    updateHabit(
      { id: Number(id), data },
      {
        onSuccess: () => router.push("/habits"),
      }
    );
  };

  return (
    <div className="w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-md p-8 w-full max-w-md flex flex-col gap-6 border border-gray-100"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Edit Habit</h1>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full cursor-pointer justify-between font-normal"
                      >
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(selectedDate) => {
                          setDate(selectedDate);
                          setOpenCalendar(false);
                          if (selectedDate) {
                            const iso =
                              selectedDate.toLocaleDateString("sv-SE");
                            field.onChange(iso);
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Updating..." : "Update Habit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
