"use client";

import * as React from "react";
import {
  Car,
  ShoppingCart,
  Users,
  CreditCard,
  BarChart,
  Settings,
  Truck,
  Building,
  Store,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavItems } from "./nav-items";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    teams: [
      {
        name: "Kashi & Karz",
        logo: Car,
        plan: "Enterprise",
      },
    ],
    navMain: [
      {
        title: "My cars",
        url: "/dashboard/cars",
        icon: Car,
        items: [
          {
            title: "All Cars",
            url: "/dashboard/cars",
          },
          {
            title: "Add Car",
            url: "/cars/new",
          },
        ],
      },
      {
        title: "Bookings",
        url: "/bookings",
        icon: ShoppingCart,
        items: [
          {
            title: "All Bookings",
            url: "/bookings/all",
          },
          {
            title: "Pending",
            url: "/bookings/pending",
          },
        ],
      },
      {
        title: "Customers",
        url: "/customers",
        icon: Users,
        items: [
          {
            title: "All Customers",
            url: "/customers/all",
          },
        ],
      },
      {
        title: "Payments",
        url: "/payments",
        icon: CreditCard,
        items: [
          {
            title: "Transactions",
            url: "/payments/transactions",
          },
        ],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
        items: [
          {
            title: "General",
            url: "/settings/general",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Luxury Car Sales",
        url: "/projects/luxury",
        icon: Store,
      },
      {
        name: "Fleet Leasing",
        url: "/projects/fleet",
        icon: Truck,
      },
      {
        name: "Used Cars Market",
        url: "/projects/used",
        icon: ListChecks,
      },
    ],
    dashboard: [
      {
        name: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavItems projects={data.dashboard}  title="" />
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
