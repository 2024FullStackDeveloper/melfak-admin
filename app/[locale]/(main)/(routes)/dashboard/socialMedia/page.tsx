"use client";
import { Plus, SearchIcon } from "lucide-react";
import useLocalizer from "@/hooks/useLocalizer";
import { useState } from "react";
import DeleteModal from "@/components/core/modal/DeleteModal";
import { toast } from "sonner";
import { ApiResponse } from "@/services/API";
import { ISocialMedia } from "@/types/SocialMedia";
import useGetSocialMedias from "@/services/API/fetching/socialMedias/useGetSocialMedias";
import AddSocialMediaModal from "@/components/organisms/socialMedias/AddSocialMediaModal";
import useDeleteSocialMedia from "@/services/API/mutations/socialMedias/useDeleteSocialMedia";
import UpdateSocialMediaModal from "@/components/organisms/socialMedias/UpdateSocialMediaModal";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/core/TextInput";
import { Skeleton } from "@/components/ui/skeleton";
import SocialMediaCard from "@/components/organisms/socialMedias/SocialMediaCard";
import { Empty } from "@/components/core/Empty";

export default function SocialMediaPage() {
  const { t } = useLocalizer();
  const { mutateAsync: deleteSocialMedia, isPending: isDeleting } =
    useDeleteSocialMedia();
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteSocialMediaModalIsOpen, setDeleteSocialMediaModalIsOpen] =
    useState(false);
  const [selectedSocialMedia, setSelectedSocialMedia] =
    useState<ISocialMedia | null>(null);
  const [updateSocialMediaModalIsOpen, setUpdateSocialMediaModalIsOpen] =
    useState(false);

  const { data: contacts = [], isLoading, isFetching } = useGetSocialMedias();

  const filteredSocialMedias = contacts?.filter((socialMedia) => {
    const query = searchQuery.toLowerCase();
    return socialMedia.name.toLowerCase().includes(query);
  });

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {t("titles.socialMedia")}
          </h1>
          <p className="text-muted-foreground">{t("paragraphs.socialMedia")}</p>
        </div>
        <Button onClick={() => setAddModalIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("buttons.add")}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TextInput
          type="search"
          icon={SearchIcon}
          placeholder={t("placeholders.searchSocialMedia")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading || isFetching
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-[220px] w-full p-4">
                <div className="flex flex-col gap-4  justify-center">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-4">
                      <Skeleton className="h-[50px] w-[50px] rounded bg-primary" />
                      <Skeleton className="h-[50px] w-[100px] rounded bg-primary" />
                    </div>
                    <Skeleton className="h-[50px] w-[50px] rounded bg-primary" />
                  </div>
                  <Skeleton className="h-[50px] w-full rounded bg-primary" />
                  <Skeleton className="h-[50px] w-full rounded bg-primary" />
                </div>
              </Skeleton>
            ))
          : filteredSocialMedias?.length > 0 &&
            filteredSocialMedias?.map((socialMedia) => (
              <SocialMediaCard
                key={socialMedia.id}
                socialMedia={socialMedia}
                onEditSocialMedia={(socialMedia) => {
                  setSelectedSocialMedia(socialMedia);
                  setUpdateSocialMediaModalIsOpen(true);
                }}
                onDeleteSocialMedia={() => {
                  setSelectedSocialMedia(socialMedia);
                  setDeleteSocialMediaModalIsOpen(true);
                }}
              />
            ))}
      </div>
      {filteredSocialMedias?.length === 0 && (
        <Empty title={t("paragraphs.noSocialMedia")} />
      )}
      <AddSocialMediaModal
        isOpen={addModalIsOpen}
        onClose={() => setAddModalIsOpen(false)}
      />
      {selectedSocialMedia && (
        <UpdateSocialMediaModal
          isOpen={updateSocialMediaModalIsOpen}
          onClose={() => setUpdateSocialMediaModalIsOpen(false)}
          socialMedia={selectedSocialMedia!}
        />
      )}
      <DeleteModal
        isOpen={deleteSocialMediaModalIsOpen}
        onClose={() => setDeleteSocialMediaModalIsOpen(false)}
        onDelete={() => {
          if (!selectedSocialMedia) return;
          deleteSocialMedia(selectedSocialMedia?.id)
            .then((response) => {
              if (response?.success) {
                toast.success(response?.message);
                setDeleteSocialMediaModalIsOpen(false);
              } else {
                toast.error(response?.message);
              }
            })
            .catch((error) => {
              try {
                const result = error as ApiResponse<null>;
                toast.error(result?.message);
              } catch {
                toast.error(error.message);
              }
            });
        }}
        title={t("dialogs.delete.title")}
        subTitle={t("dialogs.delete.description")}
        isDeleting={isDeleting}
      />
    </div>
  );
}
