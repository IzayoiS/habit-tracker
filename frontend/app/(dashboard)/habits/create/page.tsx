"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  formHabitSchema,
  FormHabitSchemaDTO,
} from "@/utils/schemas/habit.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SpinnerCircularFixed } from "spinners-react";
import { useAddHabit } from "../hooks/use-habit";
import { useRouter } from "next/navigation";

export default function CreateHabitPage() {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const router = useRouter();

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
        router.push("/habits");
      },
    });
  };

  return (
    <div className="w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-md p-8 w-full max-w-md flex flex-col gap-6 border border-gray-100"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Add Habit</h1>

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
    </div>
  );
}
