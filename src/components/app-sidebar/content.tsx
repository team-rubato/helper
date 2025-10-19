"use client";

import Link from "next/link";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { PackageCheck, SquareKanban } from "lucide-react";
import { useSelectedLayoutSegment } from "next/navigation";

const TradingItems = [
  {
    title: "칸반",
    icon: SquareKanban,
    url: "/trading/",
  },
  {
    title: "AK Form",
    icon: PackageCheck,
    url: "/trading/akform",
  },
];

const ProcurementItems = [
  {
    title: "칸반",
    icon: SquareKanban,
    url: "/procurement",
  },
];

const getItems = (segment: string | null) => {
  if (!segment) return TradingItems;
  return segment === "trading" ? TradingItems : ProcurementItems;
};

const AppSidebarContent = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {getItems(segment).map((item) => {
              const { title, url } = item;
              return (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={{
                        pathname: url,
                      }}
                    >
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
  );
};

export default AppSidebarContent;
