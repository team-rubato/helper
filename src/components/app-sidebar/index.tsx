"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import { GNB_MENU } from "./constants";
import { getMenu } from "./utils";

const AppSidebar = () => {
  const segment = useSelectedLayoutSegment();
  const menu = getMenu(segment);
  const { lnb } = menu;

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <menu.icon />
                  <span className="flex-1">{menu.title}</span>
                  <ChevronsUpDown />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="end"
                className="w-[--radix-popper-anchor-width] mt-4"
              >
                <DropdownMenuLabel>Team</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {GNB_MENU.map(({ id, url, title }) => {
                  return (
                    <DropdownMenuItem asChild key={id}>
                      <Link href={url}>
                        <span>{title}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {lnb.map((item) => {
                const { title, url } = item;
                return (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton asChild>
                      <Link href={url}>
                        <item.icon />
                        <span>{title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
