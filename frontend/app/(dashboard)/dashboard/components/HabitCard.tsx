import React from "react";
import {
  useCheckInHabit,
  useDeleteHabit,
  useHabits,
} from "../../habits/hooks/use-habit";
import { Habit } from "@/app/(dashboard)/habits/types/habit";
import { SpinnerCircularFixed } from "spinners-react";
import { Check, Trash2 } from "lucide-react";

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
        className={`flex justify-between items-center p-3 rounded-xl border transition hover:shadow ${
          habit.current_streak > 0
            ? "bg-green-50 border-green-200"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <div>
          <h3
            className={`text-sm font-medium ${
              habit.current_streak > 0 ? "text-green-700" : "text-gray-800"
            }`}
          >
            {habit.name}
          </h3>
          <p className="text-xs text-gray-500">{habit.description}</p>
          <p className="text-xs text-gray-500">
            Current Streak: {habit.current_streak} | Longest:{" "}
            {habit.longest_streak}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => checkInHabit(habit.id)}
            title="Check in"
            className={`p-1 rounded-full border hover:scale-110 transition ${
              habit.checkedInToday
                ? "bg-green-500 border-green-500 text-white"
                : "border-gray-400 text-gray-500"
            }`}
          >
            <Check size={16} />
          </button>
          <button
            onClick={() => deleteHabit(habit.id)}
            title="Delete"
            className="p-1 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 transition"
          >
            <Trash2 size={16} />
          </button>
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
