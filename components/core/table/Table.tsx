"use client";
import React, { useState, useImperativeHandle, forwardRef } from "react";
import DataTable, {
  TableColumn,
  TableStyles,
  TableProps,
} from "react-data-table-component";
import Text from "../text/Text";
import Col from "../template/col/Col";
import TableSubHeader from "./components/TableSubHeader";
import Row from "../template/row/Row";
import { ArrowLeftIcon, ArrowRightIcon, InfoIcon } from "lucide-react";
import LoadingLogo from "../spinnerLogo/LoadingLogo";
import colors from "../fonts";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/themeContext";
import Spinner from "../spinner/Spinner.tsx";

interface IToast {
  id?: string;
  title: string;
  type: "success" | "error" | "warning" | "info";
  duration: number;
}

interface IPaginationDataInterface {
  totalRows: number;
  pagesCount: number;
  page: number;
}

interface Props extends TableProps<any> {
  title?: string;
  addButtonTitle?: string;
  addButtonClassName?: string;
  addButtonIconClassName?: string;
  addButtonVariant?: React.ComponentProps<typeof Button>["variant"];
  onAddButtonClick?: () => void;
  hideAddButton?: boolean;
  columns: TableColumn<any>[];
  data: any[];
  paginationData: IPaginationDataInterface;
  limit: number;
  setLimit: (value: number) => void;
  page: number;
  setPage: (value: number) => void;
  isLoading?: boolean;
  isFetching?: boolean;
  isRefetching?: boolean;
  subHeaderComponents?: React.ReactNode;
  clickableRow?: boolean;
  onRowClicked?: (row: any) => void;
  onRowDoubleClicked?: (row: any) => void;
  className?: string;
}

type TableRef = {
  showMessage: (toast: IToast) => void;
};

const Table = forwardRef<TableRef, Props>(
  (
    {
      title,
      addButtonTitle,
      onAddButtonClick,
      addButtonClassName,
      addButtonVariant,
      addButtonIconClassName,
      hideAddButton = false,
      columns,
      data,
      paginationData,
      limit,
      setLimit,
      page,
      setPage,
      isLoading,
      isFetching,
      isRefetching,
      subHeaderComponents,
      clickableRow = false,
      onRowDoubleClicked,
      onRowClicked,
      className,
      ...rest
    },
    ref
  ) => {
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [toasts, setToasts] = useState<IToast[]>([]);

    const addNewToast = (toast: IToast) => {
      const id = Math.random().toString(36);
      setToasts((prevToasts) => [...prevToasts, { ...toast, id }]);
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
      }, toast.duration);
    };

    useImperativeHandle(ref, () => ({
      showMessage: addNewToast,
    }));

    const theme = useTheme();
    const customStyles: TableStyles = {
      subHeader: {
        style: {
          padding: 0,
        },
      },
      headRow: {
        style: {
          backgroundColor:
            theme.theme === "dark" ? colors.primary[800] : colors.grey[200],
          color: theme.theme === "dark" ? colors.white : colors.black,
          borderBottom: 0,
          borderRadius: "0.75rem 0.75rem 0 0",
          "&:first-child": {
            borderTopLeftRadius: "0.75rem",
            borderTopRightRadius: "0.75rem",
          },
        },
      },
      head: {
        style: {
          backgroundColor: colors.grey[100],
          position: "sticky",
          top: 0,
          zIndex: 1,
          // padding: "0.5rem 0.75rem",
          // "&:first-child": {
          //   borderTopLeftRadius: "0.75rem",
          // },
          // "&:last-child": {
          //   borderTopRightRadius: "0.75rem",
          // },
        },
      },
      table: {
        style: {
          minWidth: "100%",
          width: "100%",
          tableLayout: "auto",
          borderRadius: "0.75rem",
          overflow: "hidden",
        },
      },
      responsiveWrapper: {
        style: {
          position: "relative",
          overflowX: "auto",
          width: "100%",
          borderRadius: "0.75rem",
        },
      },
      rows: {
        style: {
          minWidth: "100%",
          width: "100%",
          backgroundColor:
            theme.theme == "dark" ? colors.primary[600] : colors.white,
          color: theme.theme == "dark" ? "white" : "black",
          "&:hover": {
            backgroundColor:
              theme.theme == "dark" ? colors.secondary[600] : colors.grey[200],
          },
          "&:last-child": {
            borderBottomLeftRadius: "0.75rem",
            borderBottomRightRadius: "0.75rem",
          },
        },
      },
      cells: {
        style: {
          whiteSpace: "normal",
          wordBreak: "break-word",
          padding: "0.5rem 0.75rem",
          "&:not(:last-child)": {
            // borderRight: `1px solid ${colors.primary[50]}`,
          },
        },
      },
    };

    const clickableRowStyles = {
      rows: {
        style: {
          cursor: "pointer",
          "&:hover": {
            backgroundColor: colors.grey[300],
          },
        },
      },
    };

    const styles = {
      ...customStyles,
      ...(clickableRow ? clickableRowStyles : {}),
    };

    const conditionalRowStyles = [
      {
        when: (row: any) => selectedRow?.id === row.id,
        style: {
          backgroundColor: colors.primary[50],
          "&:hover": {
            backgroundColor: colors.primary[100],
          },
        },
      },
    ];

    const renderPaginationButtons = () => {
      const totalPages = paginationData?.pagesCount || 1;
      const buttons = [];
      const maxButtons = 5;
      const halfMaxButtons = Math.floor(maxButtons / 2);

      let startPage = Math.max(1, page - halfMaxButtons);
      const endPage = Math.min(totalPages, startPage + maxButtons - 1);

      if (endPage - startPage + 1 < maxButtons) {
        startPage = Math.max(1, endPage - maxButtons + 1);
      }

      if (startPage > 1) {
        buttons.push(
          <Button
            key="first"
            onClick={() => setPage(1)}
            className="mx-1 px-3 py-1 rounded-md bg-card border border-primary-50 hover:bg-primary-50"
          >
            <Text type="bodyXSmallMedium">1</Text>
          </Button>
        );
        if (startPage > 2) {
          buttons.push(
            <span key="dots-start" className="mx-1">
              ...
            </span>
          );
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <Button key={i} onClick={() => setPage(i)} variant="default">
            <Text type="bodyXSmallMedium">{i}</Text>
          </Button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          buttons.push(
            <span key="dots-end" className="mx-1">
              ...
            </span>
          );
        }
        buttons.push(
          <Button
            key="last"
            onClick={() => setPage(totalPages)}
            variant="default"
          >
            <Text type="bodyXSmallMedium">{totalPages}</Text>
          </Button>
        );
      }

      return buttons;
    };

    return (
      <div
        className={`flex h-full flex-col rounded-lg border-primary-50 bg-card ${className}`}
      >
        <div className="px-4">
          <Col className="pb-6" fullWidth>
            <TableSubHeader
              title={title}
              variant={addButtonVariant}
              addButtonTitle={addButtonTitle}
              onAddButtonClick={onAddButtonClick}
              subHeaderComponents={subHeaderComponents}
              addButtonClassName={addButtonClassName}
              addButtonIconClassName={addButtonIconClassName}
              hideAddButton={hideAddButton}
            />
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className={`${
                  toast.type == "success"
                    ? "bg-success-100"
                    : toast.type == "error"
                    ? "bg-danger-100"
                    : toast.type == "warning"
                    ? "bg-warning-100"
                    : "bg-info-100"
                } mt-2 rounded-md px-2 py-3`}
              >
                <Row alignVertical={"center"}>
                  <InfoIcon
                    className={`${
                      toast.type == "success"
                        ? "text-success-900"
                        : toast.type == "error"
                        ? "text-danger-900"
                        : toast.type == "warning"
                        ? "text-warning-900"
                        : "text-info-900"
                    }`}
                    size={20}
                  />
                  <Text
                    type={"bodyXSmallBold"}
                    className={`mr-2 ${
                      toast.type == "success"
                        ? "text-success-900"
                        : toast.type == "error"
                        ? "text-danger-900"
                        : toast.type == "warning"
                        ? "text-warning-900"
                        : "text-info-900"
                    }`}
                  >
                    {toast.title}
                  </Text>
                </Row>
              </div>
            ))}
          </Col>
        </div>
        <div className="flex-1 overflow-auto w-full relative">
          <div className="absolute top-0 left-0 right-0 h-12 bg-grey-100 z-0"></div>
          <DataTable
            onRowClicked={
              clickableRow
                ? (row) => {
                    setSelectedRow(row);
                    onRowClicked?.(row);
                  }
                : undefined
            }
            onRowDoubleClicked={
              clickableRow
                ? (row) => {
                    setSelectedRow(row);
                    onRowDoubleClicked?.(row);
                  }
                : undefined
            }
            subHeader={false}
            columns={columns}
            data={data}
            pagination
            paginationServer
            paginationTotalRows={paginationData?.totalRows}
            customStyles={{
              ...styles,
            }}
            conditionalRowStyles={conditionalRowStyles}
            paginationComponent={() => null}
            paginationPerPage={limit}
            onChangeRowsPerPage={(value) => {
              const newLimit = value;
              const currentFirstItemIndex = (page - 1) * limit;
              const newPage = Math.floor(currentFirstItemIndex / newLimit) + 1;
              setLimit(newLimit);
              setPage(newPage);
            }}
            onChangePage={(value) => setPage(value)}
            paginationResetDefaultPage={false}
            paginationDefaultPage={page}
            fixedHeader
            fixedHeaderScrollHeight="100%"
            noDataComponent={
              <Col
                fullWidth
                alignVertical={"center"}
                alignHorizontal={"center"}
                className="h-[calc(80vh-10rem)] bg-background"
              >
                <Text type={"bodySmallMedium"} className="text-primary">
                  لا توجد بيانات !
                </Text>
              </Col>
            }
            progressComponent={
              <Col
                fullWidth
                alignVertical={"center"}
                alignHorizontal={"center"}
                className="h-[calc(60vh-10rem)] w-full"
              >
                <Spinner size="medium" />
              </Col>
            }
            progressPending={isLoading || isFetching || isRefetching}
            {...rest}
          />
        </div>

        <div className="px-4 py-6 border-t border-grey-200">
          <Row fullWidth alignHorizontal="between" alignVertical="center">
            <Row
              alignHorizontal="center"
              alignVertical="center"
              className="gap-4"
            >
              <Button
                variant="accent"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                <ArrowLeftIcon size={20} />
              </Button>

              <Row alignHorizontal="center" className="gap-2">
                {renderPaginationButtons()}
              </Row>

              <Button
                variant="accent"
                onClick={() => setPage(page + 1)}
                disabled={page === paginationData?.pagesCount}
              >
                <ArrowRightIcon size={20} />
              </Button>
            </Row>
            <Row
              alignHorizontal="center"
              alignVertical="center"
              className="gap-6"
            >
              <div className="flex items-center gap-3">
                <Text type="bodyXSmallMedium" className="text-grey-600">
                  عرض
                </Text>
                <div className="flex gap-2">
                  {[10, 25, 50, 100].map((value) => (
                    <button
                      key={value}
                      onClick={() => {
                        const newLimit = value;
                        const currentFirstItemIndex = (page - 1) * limit;
                        const newPage =
                          Math.floor(currentFirstItemIndex / newLimit) + 1;
                        setLimit(newLimit);
                        setPage(newPage);
                      }}
                      className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                        limit === value
                          ? "bg-primary/20 text-primary-foreground"
                          : "bg-primary/50 text-primary-foreground hover:bg-primary-50 border border-primary-50"
                      }`}
                    >
                      <Text
                        type="bodyXSmallMedium"
                        className={
                          limit === value ? "text-primary-foreground" : ""
                        }
                      >
                        {value}
                      </Text>
                    </button>
                  ))}
                </div>
                <Text type="bodyXSmallMedium" className="text-grey-600">
                  عنصر في الصفحة
                </Text>
              </div>
              <div className="px-4 py-2 bg-grey-50 rounded-lg">
                <Text type="bodyXSmallMedium" className="text-grey-600">
                  إجمالي العناصر: {paginationData?.totalRows || 0}
                </Text>
              </div>
            </Row>
          </Row>
        </div>
      </div>
    );
  }
);

export { Table, type TableRef };
