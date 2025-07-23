"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  formHabitSchema,
  FormHabitSchemaDTO,
} from "@/utils/schemas/habit.schema";
import { useAddHabit } from "../hooks/use-habit";
import { SpinnerCircularFixed } from "spinners-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export default function AddHabitModal() {
  const [open, setOpen] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const form = useForm<FormHabitSchemaDTO>({
    resolver: zodResolver(formHabitSchema),
    defaultValues: {
      name: "",
      description: "",
      start_date: "",
    },
  });

  const { mutate: addHabit, isPending } = useAddHabit();

  const onSubmit = (data: FormHabitSchemaDTO) => {
    addHabit(data, {
      onSuccess: () => {
        form.reset();
        setDate(undefined);
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="fixed bottom-8 right-8 bg-orange-500 text-white rounded-full w-14 h-14 text-2xl shadow hover:bg-orange-600 active:bg-orange-700">
          +
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Habit</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                              const iso = selectedDate
                                .toISOString()
                                .split("T")[0];
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
              {isPending ? (
                <SpinnerCircularFixed
                  size={20}
                  thickness={100}
                  speed={100}
                  color="rgba(0,0,0,1)"
                  secondaryColor="rgba(255,255,255,1)"
                />
              ) : (
                "Add Habit"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
