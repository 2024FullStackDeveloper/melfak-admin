"use client";

import VideoModalButton from "@/components/core/buttons/VideoButton";
import { Empty } from "@/components/core/Empty";
import DeleteModal from "@/components/core/modal/DeleteModal";
import TextInput from "@/components/core/TextInput";
import ServiceItemCard from "@/components/organisms/serviceItems/ServiceItemCard";
import ServiceItemModal from "@/components/organisms/serviceItems/ServiceItemModal";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useLocalizer from "@/hooks/useLocalizer";
import { cn } from "@/lib/utils";
import useGetItems from "@/services/API/fetching/serviceItems/useGetItems";
import useGetServices from "@/services/API/fetching/serviceItems/useGetServices";
import useCreateAttributes from "@/services/API/mutations/items/useCreateAttributes";
import useCreateServiceItem from "@/services/API/mutations/items/useCreateItem";
import useDeleteItem from "@/services/API/mutations/items/useDeleteItem";
import useUpdateServiceItem from "@/services/API/mutations/items/useUpdateItem";
import { IServiceItem } from "@/types/Section";
import { serviceItemSchema } from "@/validations/sections";
import dateFormat from "dateformat";
import { ArrowRight, Plus, SearchIcon, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import z from "zod";

export default function ServiceItemsPage() {
  const { t, isRtl } = useLocalizer();
  const params = useParams();
  const router = useRouter();
  const serviceId = params.serviceId as string;

  const { data: service, isLoading: serviceLoading } = useGetServices({
    id: serviceId,
  });

  const { data: serviceItems, isLoading: serviceItemsLoading } = useGetItems({
    serviceId: serviceId,
  });

  const serviceDetails = useMemo(() => {
    return service?.[0];
  }, [service, serviceId]);

  const { data: parentService, isLoading: parentServiceLoading } =
    useGetServices({
      id: serviceDetails?.parentServiceId ?? "",
    });

  const parentServiceDetails = useMemo(() => {
    if (parentService) {
      return parentService?.[0];
    }
    return null;
  }, [parentService]);

  const [searchQuery, setSearchQuery] = useState("");
  const [deleteServiceModalIsOpen, setDeleteServiceModalIsOpen] =
    useState(false);

  const [selectedServiceItem, setSelectedServiceItem] =
    useState<IServiceItem | null>(null);
  const { mutateAsync: deleteItem, isPending: deleteItemIsPending } =
    useDeleteItem();

  // Filtering
  const filteredItems = serviceItems?.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.arTitle.toLowerCase().includes(query) ||
      item.enTitle.toLowerCase().includes(query)
    );
  });

  const [isServiceItemModalOpen, setIsServiceItemModalOpen] = useState(false);

  const {
    mutateAsync: createServiceItem,
    isPending: createServiceItemIsPending,
  } = useCreateServiceItem();
  const {
    mutateAsync: updateServiceItem,
    isPending: updateServiceItemIsPending,
  } = useUpdateServiceItem();

  const handleViewItem = (item: IServiceItem) => {
    setSelectedServiceItem(item);
    setIsServiceItemModalOpen(true);
  };

  const handleEditItem = (item: IServiceItem) => {
    setSelectedServiceItem(item);
    setIsServiceItemModalOpen(true);
  };

  const {
    mutateAsync: createAttributes,
    isPending: createAttributesIsPending,
  } = useCreateAttributes();

  const handleCreateServiceItem = async (
    values: any,
    attributes: z.infer<serviceItemSchema>["attributes"]
  ) => {
    try {
      const response = await createServiceItem(values);
      if (response.data?.data?.success) {
        toast.success(
          response?.data?.data?.message || "Service created successfully"
        );
        if (response?.data?.data?.data?.id && attributes) {
          await createAttributes({
            itemId: response?.data?.data?.data?.id,
            attributes,
          }).catch((error) => {
            toast.error(error.message || "Failed to create attributes");
          });
        }
        setIsServiceItemModalOpen(false);
      } else {
        toast.error(response.data?.data?.message || "Failed to create service");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handleUpdateServiceItem = async (
    values: any,
    id: string,
    attributes: z.infer<serviceItemSchema>["attributes"]
  ) => {
    try {
      const response = await updateServiceItem({ id, body: values });
      if (response.data?.data?.success) {
        toast.success(
          response?.data?.data?.message || "Service updated successfully"
        );
        if (attributes) {
          await createAttributes({
            itemId: id,
            attributes,
          }).catch((error) => {
            toast.error(error.message || "Failed to create attributes");
          });
        }
        setIsServiceItemModalOpen(false);
        setSelectedServiceItem(null);
      } else {
        toast.error(response.data?.data?.message || "Failed to update service");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handleDeleteServiceItem = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      const response = await deleteItem(id);
      if (response.data?.data?.success) {
        toast.success(
          response?.data?.data?.message || "Service deleted successfully"
        );
        setDeleteServiceModalIsOpen(false);
        setSelectedServiceItem(null);
      } else {
        toast.error(response.data?.data?.message || "Failed to delete service");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto hover:bg-transparent!"
              onClick={() => router.back()}
            >
              <ArrowRight className={`h-4 w-4 ${!isRtl ? "rotate-180" : ""}`} />
              <span className="sr-only">Back</span>
            </Button>
            {serviceItemsLoading ? (
              <Skeleton className="h-6 w-20" />
            ) : (
              <h1 className="text-3xl font-bold tracking-tight">
                {isRtl
                  ? parentServiceDetails?.arTitle
                  : parentServiceDetails?.enTitle}
              </h1>
            )}
            <h1 className="text-3xl font-bold tracking-tight">
              {isRtl ? serviceDetails?.arTitle : serviceDetails?.enTitle}
            </h1>
          </div>
        </div>
        <Button onClick={() => setIsServiceItemModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("buttons.add")}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TextInput
          type="search"
          icon={SearchIcon}
          placeholder={t("placeholders.searchServiceItem")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="w-full rounded-lg shadow-sm border border-secondary bg-card p-6 min-h-[320px] flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium mb-2">{t("labels.thumbnailUrl")}</p>
          {serviceItemsLoading ? (
            <Skeleton className="relative rounded-lg shadow-sm w-52 h-52 border border-secondary flex items-center justify-center bg-muted" />
          ) : (
            <div className="relative rounded-lg shadow-sm w-52 h-52 border border-secondary flex items-center justify-center bg-muted">
              {serviceDetails?.thumbnailUrl ? (
                <Image
                  preload
                  fill
                  fetchPriority="auto"
                  src={serviceDetails.thumbnailUrl}
                  alt={
                    isRtl ? serviceDetails?.arTitle : serviceDetails?.enTitle
                  }
                  className="rounded-lg object-cover"
                />
              ) : (
                <ImageIcon className="w-12 h-12 text-muted-foreground" />
              )}
              {serviceDetails?.videoUrl && (
                <VideoModalButton
                  videoUrl={serviceDetails.videoUrl}
                  posterUrl={serviceDetails.thumbnailUrl}
                />
              )}
            </div>
          )}
        </div>
        {serviceItemsLoading ? (
          <Skeleton className="flex-1 flex flex-col gap-2 min-h-full border  p-6 rounded-lg" />
        ) : (
          <div className="flex-1 flex flex-col gap-2 min-h-full border  p-6 rounded-lg">
            <div className="flex flex-col">
              <p
                className={cn(
                  "text-sm md:text-lg font-medium mb-2 px-2 border-accent",
                  isRtl ? "border-r-2" : "border-l-2"
                )}
              >
                {isRtl ? t("labels.arSubTitle") : t("labels.enSubTitle")}
              </p>
              <p className="text-sm truncate mx-3">
                {(isRtl
                  ? serviceDetails?.arSubTitle
                  : serviceDetails?.arSubTitle) ??
                  t("placeholders.noDescription")}
              </p>
            </div>
            <div className="flex flex-col">
              <p
                className={cn(
                  "text-sm md:text-lg font-medium mb-2 px-2 border-accent",
                  isRtl ? "border-r-2" : "border-l-2"
                )}
              >
                {isRtl ? t("labels.arDescription") : t("labels.enDescription")}
              </p>
              <p className="text-sm  truncate mx-3">
                {(isRtl
                  ? serviceDetails?.arDescription
                  : serviceDetails?.enDescription) ??
                  t("placeholders.noDescription")}
              </p>
            </div>
            <Separator className="my-2" />
            <div className="grid xl:grid-cols-4 lg:grid-cols-3  grid-cols-1 gap-2">
              <div>
                <p
                  className={cn(
                    "text-sm md:text-lg font-medium mb-2 px-2 border-accent",
                    isRtl ? "border-r-2" : "border-l-2"
                  )}
                >
                  {t("labels.parentService")}
                </p>
                <p className="text-sm truncate mx-3">
                  {(isRtl
                    ? parentServiceDetails?.arSubTitle
                    : parentServiceDetails?.arSubTitle) ??
                    t("placeholders.noData")}
                </p>
              </div>
              <div>
                <p
                  className={cn(
                    "text-sm md:text-lg font-medium mb-2 px-2 border-accent",
                    isRtl ? "border-r-2" : "border-l-2"
                  )}
                >
                  {t("labels.displayOrder")}
                </p>
                <p className="text-sm truncate mx-3">{serviceDetails?.order}</p>
              </div>
              <div>
                <p
                  className={cn(
                    "text-sm md:text-lg font-medium mb-2 px-2 border-accent",
                    isRtl ? "border-r-2" : "border-l-2"
                  )}
                >
                  {t("labels.createdAt")}
                </p>
                <p className="text-sm truncate mx-3">
                  <bdi>
                    {serviceDetails?.createdAt
                      ? dateFormat(
                          serviceDetails?.createdAt,
                          "yyyy-MM-dd HH:mm:ss TT"
                        )
                      : ""}
                  </bdi>
                </p>
              </div>
              <div>
                <p
                  className={cn(
                    "text-sm md:text-lg font-medium mb-2 px-2 border-accent",
                    isRtl ? "border-r-2" : "border-l-2"
                  )}
                >
                  {t("labels.updatedAt")}
                </p>
                <p className="text-sm truncate mx-3">
                  <bdi>
                    {serviceDetails?.modifiedAt
                      ? dateFormat(
                          serviceDetails?.modifiedAt,
                          "yyyy-MM-dd HH:mm:ss TT"
                        )
                      : ""}
                  </bdi>
                </p>
              </div>
            </div>
            <Separator />
            {serviceDetails?.images && serviceDetails?.images?.length > 0 && (
              <div dir="ltr">
                <Carousel>
                  <CarouselContent>
                    {serviceDetails?.images?.map((image, index) => (
                      <CarouselItem
                        key={index}
                        className="basis-1/2 lg:basis-1/3 xl:basis-1/4"
                      >
                        <div className="relative h-[150px] ">
                          <Image
                            src={image.imageUrl}
                            alt="service image"
                            fill
                            loading="lazy"
                            className="object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {serviceItemsLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                className="h-14 w-full flex flex-row items-center justify-between px-2"
                key={index}
              >
                <div className="flex w-full flex-row items-center justify-between">
                  <Skeleton className="h-10 w-10 bg-primary" />
                  <div className="flex flex-col gap-1 items-center justify-center">
                    <Skeleton className="h-1 w-1 bg-primary rounded-full" />
                    <Skeleton className="h-1 w-1 bg-primary rounded-full" />
                    <Skeleton className="h-1 w-1 bg-primary rounded-full" />
                  </div>
                </div>
              </Skeleton>
            ))
          : filteredItems?.map((item) => (
              <ServiceItemCard
                key={item.id}
                item={item}
                onView={handleViewItem}
                onEdit={handleEditItem}
                onDelete={(item) => {
                  setSelectedServiceItem(item);
                  setDeleteServiceModalIsOpen(true);
                }}
              />
            ))}
      </div>

      {filteredItems?.length === 0 && (
        <Empty title={t("placeholders.noData")} />
      )}

      <ServiceItemModal
        isOpen={isServiceItemModalOpen}
        onClose={() => {
          setIsServiceItemModalOpen(false);
          setSelectedServiceItem(null);
        }}
        onAdd={handleCreateServiceItem}
        onEdit={handleUpdateServiceItem}
        initialData={selectedServiceItem}
        isLoading={
          createServiceItemIsPending ||
          updateServiceItemIsPending ||
          createAttributesIsPending
        }
        serviceId={serviceId}
      />

      <DeleteModal
        isOpen={deleteServiceModalIsOpen}
        onClose={() => setDeleteServiceModalIsOpen(false)}
        onDelete={() => handleDeleteServiceItem(selectedServiceItem?.id ?? "")}
        title={t("dialogs.delete.title")}
        subTitle={t("dialogs.delete.description")}
        isDeleting={deleteItemIsPending}
      />
    </div>
  );
}
