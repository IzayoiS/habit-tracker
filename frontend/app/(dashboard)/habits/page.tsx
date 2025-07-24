"use client";

import { Habit } from "@/app/(dashboard)/habits/types/habit";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Check, Edit2, Loader2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useCheckInHabit, useDeleteHabit, useHabits } from "./hooks/use-habit";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map((habit: Habit) => (
          <div
            key={habit.id}
            className="flex flex-col gap-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{habit.name}</h3>
                <p className="text-xs text-gray-500">{habit.description}</p>
              </div>
              <div className="flex gap-1">
                <Link href={`/habits/edit/${habit.id}`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100"
                  >
                    <Edit2 size={16} className="text-gray-500" />
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
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpenDialogId(habit.id)}
                      className="hover:bg-red-50"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <p className="mb-4">
                      Are you sure you want to delete this habit?
                    </p>
                    <DialogFooter>
                      <Button
                        variant="ghost"
                        onClick={() => setOpenDialogId(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
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
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                🔥 Streak: {habit.current_streak ?? 0}
              </span>
              {habit.checkedInToday ? (
                <Button
                  size="sm"
                  disabled
                  className="gap-1 bg-green-500 text-white hover:bg-green-600 cursor-not-allowed"
                >
                  <Check size={14} /> Checked in
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => checkInHabit.mutate(habit.id)}
                  className="gap-1 cursor-pointer"
                >
                  <Check size={14} /> Check in
                </Button>
              )}
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
          <Button className="gap-2" size="lg">
            <Plus className="w-5 h-5" /> Add Habit
          </Button>
        </Link>
      </div>
      {content}
    </div>
  );
}
