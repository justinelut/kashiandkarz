"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavItems({
  projects,
  title,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
  title: string;
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden my-0 py-0">
      <h1>{title}</h1>
      <SidebarMenu className="my-0 py-0">
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
