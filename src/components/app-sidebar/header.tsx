"use client";

import { ChevronsUpDown, Plane, Wallet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const getHeader = (segment: string | null) => {
  if (!segment)
    return {
      icon: Plane,
      title: "무역팀",
    };
  return segment === "trading"
    ? {
        icon: Plane,
        title: "무역팀",
      }
    : {
        icon: Wallet,
        title: "구매팀",
      };
};

const AppSidebarHeader = () => {
  const segment = useSelectedLayoutSegment();
  const header = getHeader(segment);

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <header.icon />
                <span className="flex-1">{header.title}</span>
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
              <DropdownMenuItem asChild>
                <Link href={"/trading"}>
                  <span>무역팀</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/procurement"}>
                  <span>구매팀</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default AppSidebarHeader;
