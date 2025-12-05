"use client";
import React from "react";
import { ColumnDef } from "@tanstack/table-core";
import useLocalizer from "@/hooks/useLocalizer";
import { IDashboardService } from "@/types/Dashboard";
import SortButton from "@/components/SortButton";
import DecorationBox from "@/components/DecorationBox";
import DataTable from "@/components/DataTable";
import ImageViewer from "@/components/core/imageViewer/ImageViewer";

interface DashboardServicesTableProps {
  isLoading: boolean;
  dataTable: IDashboardService[];
}

const DashboardServicesTable = ({
  isLoading,
  dataTable,
}: DashboardServicesTableProps) => {
  const { t, isRtl } = useLocalizer();

  const cols = React.useMemo<ColumnDef<IDashboardService>[]>(() => {
    return [
      {
        accessorKey: "thumbnailUrl",
        header: () => {
          return <span>{t("labels.thumbnailUrl")}</span>;
        },
        cell: ({ row }) => {
          return (
            <ImageViewer
              src={row.original.thumbnailUrl}
              alt={row.original.thumbnailUrl}
              className={"w-12 h-12 rounded-lg"}
            />
          );
        },
      },
      {
        accessorKey: isRtl ? "arTitle" : "enTitle",
        header: ({ column }) => {
          const isAcs = column.getIsSorted() === "asc";
          return (
            <SortButton
              isAcs={isAcs}
              label={isRtl ? t("labels.arTitle") : t("labels.enTitle")}
              onSort={() => column.toggleSorting(isAcs)}
            />
          );
        },
      },
      {
        accessorKey: isRtl ? "arSubTitle" : "enSubTitle",
        header: ({ column }) => {
          const isAcs = column.getIsSorted() === "asc";
          return (
            <SortButton
              isAcs={isAcs}
              label={isRtl ? t("labels.arSubTitle") : t("labels.enSubTitle")}
              onSort={() => column.toggleSorting(isAcs)}
            />
          );
        },
      },
    ];
  }, []);

  return (
    <DecorationBox
      headerContent={t("titles.lastFiveServices")}
      contentClassName="h-72 w-full"
    >
      <div className="overflow-y-auto w-full max-h-[400px]">
        <DataTable
          isLoading={isLoading}
          columns={cols}
          data={dataTable ?? []}
        />
      </div>
    </DecorationBox>
  );
};

export default DashboardServicesTable;
