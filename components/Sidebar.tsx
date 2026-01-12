"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Phone,
  Share2,
  ShoppingBag,
  Megaphone,
  ListCollapse,
  MailsIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import useLocalizer from "@/hooks/useLocalizer";
import Image from "next/image";
import { Link } from "@/i18n/routing";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
  isRtl?: boolean;
}

interface NavigationItem {
  title: string;
  href?: string;
  icon: any;
  soon?: boolean;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    title: "pages.dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "pages.lists",
    href: "/dashboard/lists",
    icon: ListCollapse,
    soon: true,
  },
  {
    title: "pages.sections",
    href: "/dashboard/sections",
    icon: ShoppingBag,
  },
  {
    title: "pages.contactUs",
    href: "/dashboard/contactUs",
    icon: Phone,
  },
  {
    title: "pages.socialMedia",
    href: "/dashboard/socialMedia",
    icon: Share2,
  },
  {
    title: "pages.news",
    href: "/dashboard/news",
    icon: Megaphone,
    soon: true,
  },
  {
    title: "pages.messages",
    href: "/dashboard/messages",
    icon: MailsIcon,
    soon: true,
  },
  {
    title: "pages.settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar({
  collapsed,
  onToggle,
  className,
  isRtl = false,
}: SidebarProps) {
  const pathname = usePathname();
  const { isRtl: hookIsRtl } = useLocalizer();
  const rtl = isRtl || hookIsRtl;
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { t } = useLocalizer();
  useEffect(() => {
    const itemsToExpand: string[] = [];
    navigationItems.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) =>
            child.href &&
            (pathname === child.href || pathname?.startsWith(child.href + "/"))
        );
        if (hasActiveChild) {
          itemsToExpand.push(item.title);
        }
      }
    });
    if (itemsToExpand.length > 0) {
      setExpandedItems(itemsToExpand);
    }
  }, [pathname]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isExpanded = (title: string) => expandedItems.includes(title);

  const renderNavItem = (item: NavigationItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = item.href
      ? pathname === item.href || pathname?.startsWith(item.href + "/")
      : false;
    const isParentActive =
      hasChildren &&
      item.children?.some(
        (child) =>
          child.href &&
          (pathname === child.href || pathname?.startsWith(child.href + "/"))
      );
    const expanded = isExpanded(item.title);
    const Icon = item.icon;

    if (hasChildren) {
      return (
        <div key={item.title}>
          <Button
            onClick={() => toggleExpanded(item.title)}
            className={cn(
              isParentActive
                ? "bg-accent/20 text-accent-foreground"
                : "text-muted-foreground",
              collapsed && "justify-center px-2",
              depth > 0 && !collapsed && "pl-6"
            )}
          >
            <Icon className={cn("h-5 w-5 shrink-0", collapsed && "h-6 w-6")} />
            {!collapsed && (
              <>
                <span className="flex-1 truncate text-left">
                  {t(item.title)}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    expanded && "rotate-180"
                  )}
                />
              </>
            )}
          </Button>
          {!collapsed && expanded && (
            <div className="ml-3 space-y-1 border-l-2 border-border pl-3 mt-1">
              {item.children?.map((child) => renderNavItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return item.soon ? (
      <Button
        key={item.title}
        variant="none"
        className={cn(
          "flex flex-row justify-between  items-center w-full text-muted-foreground",
          collapsed && "justify-center px-2",
          depth > 0 && !collapsed && "pl-6"
        )}
      >
        <Icon className={cn("h-5 w-5 shrink-0 ", collapsed && "h-6 w-6")} />
        {!collapsed && (
          <div className="truncate flex flex-row justify-between items-center w-full">
            {t(item.title)}
            <span className="text-xs font-bold text-accent animate-pulse">
              {t("titles.soon")}
            </span>
          </div>
        )}
      </Button>
    ) : (
      <Link
        key={item.title}
        href={item.href || "#"}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
          "hover:bg-accent/10 hover:text-accent-foreground",
          isActive
            ? "bg-accent/20 text-accent-foreground shadow-sm"
            : "text-muted-foreground",
          collapsed && "justify-center px-2",
          depth > 0 && !collapsed && "pl-6"
        )}
      >
        <Icon className={cn("h-5 w-5 shrink-0", collapsed && "h-6 w-6")} />
        {!collapsed && (
          <div className="truncate flex flex-row justify-between items-center w-full">
            {t(item.title)}
            {item.soon && (
              <span className="text-xs font-bold text-accent animate-pulse">
                {t("titles.soon")}
              </span>
            )}
          </div>
        )}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "fixed top-0 z-30 flex h-screen flex-col border-border bg-card ",
        rtl ? "right-0 border-l" : "left-0 border-r",
        collapsed ? "w-20" : "w-72",
        className
      )}
    >
      {/* Logo Area with Collapse Button */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <div
          className={cn(
            "flex items-center gap-2 transition-all duration-300",
            collapsed && "justify-center"
          )}
        >
          <div className="flex h-10 w-10 items-center justify-center relative rounded-lg bg-accent/70">
            <Image
              src={"/images/logo-black.png"}
              alt={"logo"}
              fill
              priority
              className="object-contain"
            />
          </div>
          {!collapsed && (
            <span className="text-xl font-bold tracking-tight">
              {t("app.name")}
            </span>
          )}
        </div>

        {/* Collapse Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="hover:bg-accent/10 shrink-0"
        >
          {collapsed ? (
            rtl ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )
          ) : rtl ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        {navigationItems.map((item) => renderNavItem(item))}
      </nav>
    </aside>
  );
}
