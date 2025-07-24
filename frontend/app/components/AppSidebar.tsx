"use client";
import { Home, List } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useAuth } from "@/store/user";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Habits",
    url: "/habits",
    icon: List,
  },
];

export function AppSidebar() {
  const logout = useAuth((state) => state.logout);
  const router = useRouter();
  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex flex-col h-full">
          <SidebarGroup>
            <SidebarGroupLabel className="!text-2xl !font-bold">
              Habit Tracker
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="text-3xl mt-3">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <Button
            className="mt-auto w-full py-5 cursor-pointer mb-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
