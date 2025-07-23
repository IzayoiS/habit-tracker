import { useHabits } from "../hooks/use-habit";

export default function ProgressCard() {
  const { data: habits = [] } = useHabits();

  const completedHabits = habits.filter(
    (h: { current_streak: number }) => h.current_streak > 0
  ).length;
  const progressPercentage =
    habits.length > 0 ? Math.round((completedHabits / habits.length) * 100) : 0;

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-2xl p-4 flex items-center gap-4">
      <div className="relative">
        <svg className="w-16 h-16">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            opacity="0.3"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${
              (progressPercentage / 100) * 2 * Math.PI * 28
            } ${2 * Math.PI * 28}`}
            strokeLinecap="round"
            transform="rotate(-90 32 32)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
          {progressPercentage}%
        </div>
      </div>
      <div>
        <p className="font-semibold">
          {completedHabits} of {habits.length} habits
        </p>
        <p className="text-sm">completed today!</p>
      </div>
    </div>
  );
}
