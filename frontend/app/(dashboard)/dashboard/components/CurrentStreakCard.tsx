import { Habit } from "@/app/(dashboard)/habits/types/habit";
import React from "react";
import { useHabits } from "../../habits/hooks/use-habit";

export default function CurrentStreakCard() {
  const { data: habits = [] } = useHabits();

  const totalStreak = habits.reduce(
    (acc: number, habit: Habit) => acc + habit.current_streak,
    0
  );

  return (
    <div className="bg-white rounded-2xl p-4 shadow flex items-center gap-4">
      <div className="text-orange-500 font-bold md:text-3xl">{totalStreak}</div>
      <div>
        <p className="font-semibold md:text-xl">Total Current Streak</p>
        <p className="md:text-md text-gray-500">All habits combined</p>
      </div>
    </div>
  );
}
