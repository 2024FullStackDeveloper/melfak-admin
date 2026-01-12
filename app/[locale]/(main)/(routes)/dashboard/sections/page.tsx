"use client";

import TextInput from "@/components/core/TextInput";
import SectionCard from "@/components/organisms/sections/SectionCard";
import SectionModal from "@/components/organisms/sections/SectionModal";
import ServiceModal from "@/components/organisms/sections/ServiceModal";
import ServiceDetailsModal from "@/components/organisms/sections/ServiceDetailsModal";
import { Button } from "@/components/ui/button";
import useLocalizer from "@/hooks/useLocalizer";
import useGetSections from "@/services/API/fetching/sections/useGetSections";
import useCreateSection from "@/services/API/mutations/sections/useCreateSection";
import useDeleteSection from "@/services/API/mutations/sections/useDeleteSection";
import useUpdateSection from "@/services/API/mutations/sections/useUpdateSection";
import useCreateService from "@/services/API/mutations/services/useCreateService";
import useDeleteService from "@/services/API/mutations/services/useDeleteService";
import useUpdateService from "@/services/API/mutations/services/useUpdateService";
import { ISection, IService } from "@/types/Section";
import { Plus, SearchIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DeleteModal from "@/components/core/modal/DeleteModal";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/core/Empty";
import { Skeleton } from "@/components/ui/skeleton";
import ImagesModal from "@/components/organisms/sections/ImagesModal";
import useAddImages from "@/services/API/mutations/services/useAddImages";

export default function SectionsPage() {
  const { t } = useLocalizer();
  const { data: sections, isLoading } = useGetSections();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Section Modal State
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<ISection | null>(null);

  // Service Modal State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [deleteServiceModalIsOpen, setDeleteServiceModalIsOpen] =
    useState(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );

  // Service Details Modal State
  const [isServiceDetailsOpen, setIsServiceDetailsOpen] = useState(false);
  const [viewingService, setViewingService] = useState<IService | null>(null);

  // Service Images Modal State
  const [isServiceImagesOpen, setIsServiceImagesOpen] = useState(false);

  // Mutations
  const { mutateAsync: createSection, isPending: isCreatingSection } =
    useCreateSection();
  const { mutateAsync: addImages } = useAddImages();
  const { mutateAsync: updateSection, isPending: isUpdatingSection } =
    useUpdateSection();
  const { mutateAsync: deleteSection, isPending: isDeletingSection } =
    useDeleteSection();

  const { mutateAsync: createService, isPending: isCreatingService } =
    useCreateService();
  const { mutateAsync: updateService, isPending: isUpdatingService } =
    useUpdateService();
  const { mutateAsync: deleteService, isPending: isDeletingService } =
    useDeleteService();

  // Handlers
  const handleCreateSection = async (values: any, id?: string) => {
    try {
      const response = await createSection(values);
      if (response.data?.data?.success) {
        toast.success(
          response?.data?.data?.message || "Section created successfully"
        );
        setIsSectionModalOpen(false);
      } else {
        toast.error(response.data?.data?.message || "Failed to create section");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handleUpdateSection = async (values: any, id?: string) => {
    try {
      if (!id) {
        return;
      }
      const response = await updateSection([id!, values]);
      if (response.data?.data?.success) {
        toast.success(
          response?.data?.data?.message || "Section updated successfully"
        );
        setIsSectionModalOpen(false);
        setSelectedSection(null);
      } else {
        toast.error(response.data?.data?.message || "Failed to update section");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (!id) return;
    try {
      const response = await deleteSection(id);
      if (response.data?.data?.success) {
        toast.success(
          response?.data?.data?.message || "Section deleted successfully"
        );
        setDeleteModalIsOpen(false);
        setSelectedSection(null);
      } else {
        toast.error(response.data?.data?.message || "Failed to delete section");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handleCreateService = async (values: any) => {
    try {
      const response = await createService(values);
      if (response.data?.data?.success) {
        toast.success(
          response?.data?.data?.message || "Service created successfully"
        );
        setIsServiceModalOpen(false);
      } else {
        toast.error(response.data?.data?.message || "Failed to create service");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handleUpdateService = async (values: any, id: string) => {
    try {
      const response = await updateService({ id, body: values });
      if (response.data?.data?.success) {
        toast.success(
          response?.data?.data?.message || "Service updated successfully"
        );
        setIsServiceModalOpen(false);
        setSelectedService(null);
      } else {
        toast.error(response.data?.data?.message || "Failed to update service");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      const response = await deleteService(id);
      if (response.data?.data?.success) {
        toast.success(
          response?.data?.data?.message || "Service deleted successfully"
        );
        setDeleteServiceModalIsOpen(false);
        setSelectedService(null);
      } else {
        toast.error(response.data?.data?.message || "Failed to delete service");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handleUpdateServiceImages = async (values: any, id: string) => {
    try {
      const response = await addImages({ id, body: values });
      if (response.data?.data?.success) {
        toast.success(
          response?.data?.data?.message || "Service updated successfully"
        );
        setIsServiceImagesOpen(false);
        setSelectedService(null);
      } else {
        toast.error(response.data?.data?.message || "Failed to update service");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  // Filtering
  const filteredSections = sections?.filter((section) => {
    const query = searchQuery.toLowerCase();
    return (
      section.arTitle.toLowerCase().includes(query) ||
      section.enTitle.toLowerCase().includes(query) ||
      section?.services?.some(
        (service) =>
          service.arTitle.toLowerCase().includes(query) ||
          service.enTitle.toLowerCase().includes(query)
      )
    );
  });

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {t("titles.sectionsAndServices")}
          </h1>
          <p className="text-muted-foreground">
            {t("paragraphs.sectionsAndServices")}
          </p>
        </div>
        <Button disabled onClick={() => setIsSectionModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("buttons.add")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TextInput
          type="search"
          icon={SearchIcon}
          placeholder={t("placeholders.searchSectionOrService")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-[200px] w-full p-4">
                <div className="flex flex-col gap-4  justify-center">
                  <div className="flex flex-row justify-between">
                    <Skeleton className="h-[20px] w-[200px] rounded bg-primary" />
                    <Skeleton className="h-[20px] w-[50px] rounded bg-primary" />
                  </div>
                  <Skeleton className="h-[120px] w-full rounded bg-primary" />
                </div>
              </Skeleton>
            ))
          : filteredSections?.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                onEditSection={(section) => {
                  setSelectedSection(section);
                  setIsSectionModalOpen(true);
                }}
                onDeleteSection={handleDeleteSection}
                onAddService={(sectionId) => {
                  setSelectedSectionId(sectionId);
                  setSelectedService(null);
                  setIsServiceModalOpen(true);
                }}
                onViewService={(service) => {
                  router.push(`/dashboard/services/${service.id}`);
                }}
                onEditService={(service) => {
                  setSelectedService(service);
                  setSelectedSectionId(service.sectionId);
                  setIsServiceModalOpen(true);
                }}
                onDeleteService={(service) => {
                  setSelectedService(service);
                  setDeleteServiceModalIsOpen(true);
                }}
                onImagesService={(service) => {
                  setSelectedService(service);
                  setIsServiceImagesOpen(true);
                }}
              />
            ))}
      </div>

      {filteredSections?.length === 0 && (
        <Empty title={t("paragraphs.noSections")} />
      )}

      <SectionModal
        isOpen={isSectionModalOpen}
        onClose={() => {
          setIsSectionModalOpen(false);
          setSelectedSection(null);
        }}
        onSubmit={selectedSection ? handleUpdateSection : handleCreateSection}
        initialData={selectedSection}
        isLoading={isCreatingSection || isUpdatingSection}
      />

      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => {
          setIsServiceModalOpen(false);
          setSelectedService(null);
          setSelectedSectionId(null);
        }}
        onAdd={handleCreateService}
        onEdit={handleUpdateService}
        initialData={selectedService}
        sectionId={selectedSectionId ?? undefined}
        isLoading={isCreatingService || isUpdatingService}
      />

      <DeleteModal
        isOpen={deleteModalIsOpen}
        onClose={() => setDeleteModalIsOpen(false)}
        onDelete={() => handleDeleteSection(selectedSection?.id ?? "")}
        title={t("dialogs.delete.title")}
        subTitle={t("dialogs.delete.description")}
        isDeleting={isDeletingSection}
      />

      <DeleteModal
        isOpen={deleteServiceModalIsOpen}
        onClose={() => setDeleteServiceModalIsOpen(false)}
        onDelete={() => handleDeleteService(selectedService?.id ?? "")}
        title={t("dialogs.delete.title")}
        subTitle={t("dialogs.delete.description")}
        isDeleting={isDeletingService}
      />

      <ServiceDetailsModal
        isOpen={isServiceDetailsOpen}
        onClose={() => {
          setIsServiceDetailsOpen(false);
          setViewingService(null);
        }}
        service={viewingService}
      />

      {selectedService && (
        <ImagesModal
          isOpen={isServiceImagesOpen}
          onClose={() => {
            setIsServiceImagesOpen(false);
            setSelectedService(null);
          }}
          initialData={selectedService}
          onSubmit={handleUpdateServiceImages}
        />
      )}
    </div>
  );
}
