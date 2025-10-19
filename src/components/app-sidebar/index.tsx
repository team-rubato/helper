import React from "react";
import { Sidebar } from "../ui/sidebar";
import AppSidebarHeader from "./header";
import AppSidebarContent from "./content";

const AppSidebar = () => {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <AppSidebarHeader />
      <AppSidebarContent />
    </Sidebar>
  );
};

export default AppSidebar;
