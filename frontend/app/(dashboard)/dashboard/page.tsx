"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import AddHabitModal from "./components/AddHabit";
import CurrentStreakCard from "./components/CurrentStreakCard";
import HabitCard from "./components/HabitCard";
import Header from "./components/Header";
import ProgressCard from "./components/ProgressCard";

export default function Dashboard() {
  return (
    <div className="flex-1 min-w-0 p-4 w-full space-y-4">
      <SidebarTrigger />
      <Header />
      <ProgressCard />
      <CurrentStreakCard />
      <HabitCard />
      <AddHabitModal />
    </div>
  );
}
