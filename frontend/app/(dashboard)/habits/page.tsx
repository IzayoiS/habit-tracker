"use client";

import React from "react";
import { useHabits, useDeleteHabit, useCheckInHabit } from "./hooks/use-habit";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Plus, Trash2, Edit2 } from "lucide-react";
import Link from "next/link";
import { Habit } from "@/app/(dashboard)/habits/types/habit";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export default function HabitsPage() {
  const { data: habits, isLoading } = useHabits();
  const deleteHabit = useDeleteHabit();
  const checkInHabit = useCheckInHabit();
  const [openDialogId, setOpenDialogId] = React.useState<number | null>(null);

  let content;
  if (isLoading) {
    content = (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-8 h-8 text-gray-400" />
      </div>
    );
  } else if (habits && habits.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {habits.map((habit: Habit) => (
          <div
            key={habit.id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={habit.checkedInToday}
                  onCheckedChange={() => checkInHabit.mutate(habit.id)}
                />
                <div>
                  <div className="font-semibold text-lg text-gray-800">
                    {habit.name}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {habit.description}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/habits/edit/${habit.id}`}>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </Link>
                <Dialog
                  open={openDialogId === habit.id}
                  onOpenChange={(open) =>
                    setOpenDialogId(open ? habit.id : null)
                  }
                >
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => setOpenDialogId(habit.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="mb-4">
                      Are you sure you want to delete this habit?
                    </div>
                    <DialogFooter>
                      <Button
                        variant="ghost"
                        className="cursor-pointer"
                        onClick={() => setOpenDialogId(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={() => {
                          deleteHabit.mutate(habit.id);
                          setOpenDialogId(null);
                        }}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Streak: {habit.current_streak ?? 0}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col items-center justify-center h-40 text-gray-400">
        <span>No habits yet.</span>
      </div>
    );
  }

  return (
    <div className="w-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <SidebarTrigger />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight drop-shadow-sm">
          My Habits
        </h1>
        <Link href="/habits/create">
          <Button className="gap-2 cursor-pointer" size="lg">
            <Plus className="w-5 h-5" /> Add Habit
          </Button>
        </Link>
      </div>
      {content}
    </div>
  );
}
