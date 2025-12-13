"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, Bell, User } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import useLocalizer from "@/hooks/useLocalizer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useCallback, useState } from "react";
import useAuthState from "@/services/zustand/authState";
import { useRouter, usePathname, Link } from "@/i18n/routing";
import useLogout from "@/services/API/mutations/user/useLogout";
import { toast } from "sonner";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  className?: string;
}

export function DashboardHeader({
  onMenuClick,
  className,
}: DashboardHeaderProps) {
  const { t, isRtl } = useLocalizer();
  const { logout } = useAuthState();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  //const paths = pathname.split("/").filter((path) => path);

  const handleSignOut = useCallback(() => {
    setIsLogoutDialogOpen(true);
  }, []);

  const { mutateAsync: logoutMutation } = useLogout();

  const confirmSignOut = useCallback(() => {
    logoutMutation()
      .then((response) => {
        if (response.data?.data?.success) {
          toast.success(response?.data?.data?.message);
        }
      })
      .finally(() => {
        logout();
        setIsLogoutDialogOpen(false);
        router.replace("/");
      });
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0  z-40 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 lg:px-6",
        className
      )}
    >
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Page Title / Breadcrumb */}
      {/* Page Title / Breadcrumb */}
      <div className="flex-1" />

      {/* Right Side Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Notifications */}
        {/* <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
          <span className="sr-only">Notifications</span>
        </Button> */}

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
                <User className="h-4 w-4" />
              </div>
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isRtl ? "start" : "end"}>
            <DropdownMenuLabel>{t("titles.myAccount")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/dashboard/profile">{t("pages.profile")}</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-destructive"
            >
              {t("buttons.signOut")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("dialogs.logout.title")}</DialogTitle>
            <DialogDescription>
              {t("dialogs.logout.description")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsLogoutDialogOpen(false)}
            >
              {t("dialogs.logout.cancel")}
            </Button>
            <Button variant="destructive" onClick={confirmSignOut}>
              {t("dialogs.logout.confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
