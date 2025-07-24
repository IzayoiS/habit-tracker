import React from "react";
import {
  useCheckInHabit,
  useDeleteHabit,
  useHabits,
} from "../../habits/hooks/use-habit";
import { Habit } from "@/app/(dashboard)/habits/types/habit";
import { SpinnerCircularFixed } from "spinners-react";
import { Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HabitCard() {
  const { data: habits = [], isLoading } = useHabits();
  const { mutate: checkInHabit } = useCheckInHabit();
  const { mutate: deleteHabit } = useDeleteHabit();

  const today = new Date().toLocaleDateString("sv-SE");

  const todayHabits = habits.filter(
    (habit: Habit) =>
      new Date(habit.start_date).toLocaleDateString("sv-SE") === today
  );

  let content;
  if (isLoading) {
    content = (
      <div className="flex justify-center py-4">
        <SpinnerCircularFixed
          size={30}
          thickness={100}
          speed={100}
          color="rgba(0,0,0,1)"
          secondaryColor="rgba(255,255,255,1)"
        />
      </div>
    );
  } else if (todayHabits.length === 0) {
    content = (
      <p className="text-center text-sm text-gray-500">No habits for today</p>
    );
  } else {
    content = todayHabits.map((habit: Habit) => (
      <div
        key={habit.id}
        className={`flex items-center justify-between p-3 rounded-xl border transition hover:shadow-md ${
          habit.checkedInToday
            ? "bg-green-50 border-green-200"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex flex-col gap-0.5">
          <h3 className="font-medium text-gray-800">{habit.name}</h3>
          <p className="text-xs text-gray-500">{habit.description}</p>
          <div className="flex gap-2 mt-0.5">
            <span className="text-xs bg-gray-100 text-gray-600 rounded px-1">
              🔥 Streak: {habit.current_streak}
            </span>
            <span className="text-xs bg-gray-100 text-gray-600 rounded px-1">
              🏆 Longest: {habit.longest_streak}
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => checkInHabit(habit.id)}
            variant="ghost"
            size="icon"
            className={`border rounded-full transition  cursor-pointer
      ${
        habit.checkedInToday
          ? "bg-green-500 border-green-500 text-white hover:bg-green-600"
          : "border-gray-300 text-gray-500 hover:bg-gray-100"
      }`}
            title="Check in"
          >
            <Check size={18} />
          </Button>
          <Button
            onClick={() => deleteHabit(habit.id)}
            variant="ghost"
            size="icon"
            className="border border-gray-300 text-red-500 cursor-pointer hover:text-red-600 hover:bg-red-50 rounded-full transition"
            title="Delete"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    ));
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow space-y-3">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-gray-800 md:text-xl">Today Habit</h2>
      </div>
      {content}
    </div>
  );
}
