"use client";

import DashboardItemsTable from "@/components/organisms/dashboard/DashboardItemsTable";
import DashboardServicesTable from "@/components/organisms/dashboard/DashboardServicesTable";
import LogoBox from "@/components/organisms/dashboard/LogoBox";
import Welcome from "@/components/organisms/dashboard/Welcome";
import WidgetCard from "@/components/organisms/dashboard/WidgetCard";
import { Skeleton } from "@/components/ui/skeleton";
import useLocalizer from "@/hooks/useLocalizer";
import useGetDashboard from "@/services/API/fetching/dashboard/useGetDashboard";
import { Sparkles, Network, NotebookTabs, Share2 } from "lucide-react";

export default function DashboardPage() {
  const { data, isLoading } = useGetDashboard();
  const { t } = useLocalizer();
  return (
    <div className="space-y-8">
      <Welcome />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1">
          <LogoBox />
        </div>
        <div className="col-span-2 grid lg:grid-cols-2 gap-4">
          {isLoading ? (
            <Skeleton className="h-[160px] rounded-lg shadow" />
          ) : (
            <WidgetCard
              title={t("titles.servicesCount")}
              value={data?.servicesCount.toString() ?? ""}
              icon={Sparkles}
            />
          )}
          {isLoading ? (
            <Skeleton className="h-[160px] rounded-lg shadow" />
          ) : (
            <WidgetCard
              title={t("titles.itemsCount")}
              value={data?.itemsCount.toString() ?? ""}
              icon={Network}
            />
          )}
          {isLoading ? (
            <Skeleton className="h-[160px] rounded-lg shadow" />
          ) : (
            <WidgetCard
              title={t("titles.contactsCount")}
              value={data?.contactsCount.toString() ?? ""}
              icon={NotebookTabs}
            />
          )}

          {isLoading ? (
            <Skeleton className="h-[160px] rounded-lg shadow" />
          ) : (
            <WidgetCard
              title={t("titles.socialMediasCount")}
              value={data?.socialMediasCount.toString() ?? ""}
              icon={Share2}
            />
          )}
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <DashboardServicesTable
          isLoading={isLoading}
          dataTable={data?.lastFiveServices ?? []}
        />
        <DashboardItemsTable
          isLoading={isLoading}
          dataTable={data?.lastFiveItems ?? []}
        />
      </div>
    </div>
  );
}
