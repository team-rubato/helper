import {
  type LucideIcon,
  Annoyed,
  PackageCheck,
  Plane,
  SquareKanban,
  Wallet,
} from "lucide-react";

export type MenuType = {
  id: string;
  icon: LucideIcon;
  title: string;
  url: string;
  lnb: {
    id: string;
    icon: LucideIcon;
    title: string;
    url: string;
  }[];
};

const TRADING: MenuType = {
  id: "trading",
  icon: Plane,
  title: "무역팀",
  url: "/trading",
  lnb: [
    {
      id: "kanban",
      icon: SquareKanban,
      title: "Kanban",
      url: "/trading",
    },
    {
      id: "akform",
      icon: PackageCheck,
      title: "AK Form",
      url: "/trading/akform",
    },
  ],
} as const;

const PROCUREMENT: MenuType = {
  id: "procurement",
  icon: Wallet,
  title: "구매팀",
  url: "/procurement",
  lnb: [
    {
      id: "kanban",
      icon: SquareKanban,
      title: "Kanban",
      url: "/procurement",
    },
  ],
} as const;

export const NOT_FOUND: MenuType = {
  id: "notfound",
  icon: Annoyed,
  title: "Not Found",
  url: "/",
  lnb: [],
} as const;

export const MENU = {
  trading: TRADING,
  procurement: PROCUREMENT,
} as const;

export type MenuKey = keyof typeof MENU;

export const GNB_MENU = Object.values(MENU).map(({ id, icon, title, url }) => ({
  id,
  icon,
  title,
  url,
}));
