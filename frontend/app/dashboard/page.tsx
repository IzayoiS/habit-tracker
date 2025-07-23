"use client";

import AddHabitModal from "./components/AddHabit";
import CurrentStreakCard from "./components/CurrentStreakCard";
import HabitCard from "./components/HabitCard";
import Header from "./components/Header";
import ProgressCard from "./components/ProgressCard";

export default function Dashboard() {
  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <Header />
      <ProgressCard />
      <CurrentStreakCard />
      <HabitCard />
      <AddHabitModal />
    </div>
  );
}
