import React from "react";
import { useCheckInHabit, useDeleteHabit, useHabits } from "../hooks/use-habit";
import { Habit } from "@/types/habit";
import { SpinnerCircularFixed } from "spinners-react";

export default function HabitCard() {
  const { data: habits = [], isLoading } = useHabits();
  const { mutate: checkInHabit } = useCheckInHabit();
  const { mutate: deleteHabit } = useDeleteHabit();
  return (
    <div className="bg-white rounded-2xl p-4 shadow space-y-2">
      <div className="flex justify-between mb-1">
        <h2 className="font-semibold">Today Habit</h2>
        <button className="text-orange-500 text-xs hover:underline">
          See all
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <SpinnerCircularFixed
            size={30}
            thickness={100}
            speed={100}
            color="rgba(0,0,0,1)"
            secondaryColor="rgba(255,255,255,1)"
          />
        </div>
      ) : habits.length === 0 ? (
        <p className="text-center text-sm text-gray-500">No habits yet</p>
      ) : (
        habits.map((habit: Habit) => (
          <div
            key={habit.id}
            className={`flex justify-between items-center p-2 rounded-xl ${
              habit.current_streak > 0 ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <div>
              <span
                className={`text-sm ${
                  habit.current_streak > 0 ? "text-green-700" : "text-gray-800"
                }`}
              >
                {habit.name}
              </span>
              <p className="text-xs text-gray-500">{habit.description}</p>
              <p className="text-xs">Streak: {habit.current_streak}</p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => checkInHabit(habit.id)}
                className={`w-5 h-5 rounded border ${
                  habit.current_streak > 0
                    ? "bg-green-500 border-green-500"
                    : "border-gray-400"
                }`}
              ></button>
              <button
                onClick={() => deleteHabit(habit.id)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
