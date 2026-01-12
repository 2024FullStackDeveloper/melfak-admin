"use client";
import { IContact } from "@/types/Contact";
import { Trash2, Edit3, Plus, SearchIcon } from "lucide-react";
import TextInput from "@/components/core/TextInput";
import { TableColumn } from "react-data-table-component/dist/DataTable/types";
import ActionButtons from "@/components/core/table/components/ActionButtons";
import useLocalizer from "@/hooks/useLocalizer";
import ActiveBudge from "@/components/core/ActiveBudge";
import useGetContacts from "@/services/API/fetching/contacts/useGetContacts";
import useDeleteContact from "@/services/API/mutations/contacts/useDeleteContact";
import { useCallback, useState } from "react";
import DeleteModal from "@/components/core/modal/DeleteModal";
import { toast } from "sonner";
import { ApiResponse } from "@/services/API";
import AddContactModal from "@/components/organisms/contacts/AddContactModal";
import ImageViewer from "@/components/core/imageViewer/ImageViewer";
import UpdateContactModal from "@/components/organisms/contacts/UpdateContactModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty } from "@/components/core/Empty";
import ContactCard from "@/components/organisms/contacts/ContactCard";

export default function ContactsPage() {
  const { t } = useLocalizer();
  const [deleteContactModalIsOpen, setDeleteContactModalIsOpen] =
    useState(false);
  const { mutateAsync: deleteContact, isPending: isDeletingContact } =
    useDeleteContact();
  const [addContactModalIsOpen, setAddContactModalIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
  const [updateContactModalIsOpen, setUpdateContactModalIsOpen] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteContact = useCallback(async () => {
    if (!selectedContact) return;
    deleteContact(selectedContact?.id)
      .then((response) => {
        if (response?.success) {
          toast.success(response?.message);
          setDeleteContactModalIsOpen(false);
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
  }, [selectedContact]);

  const { data: contacts = [], isLoading } = useGetContacts();

  // Filtering
  const filteredContacts = contacts?.filter((contact) => {
    const query = searchQuery.toLowerCase();
    return contact.phoneNumber.toLowerCase().includes(query);
  });

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {t("titles.contacts")}
          </h1>
          <p className="text-muted-foreground">{t("paragraphs.contacts")}</p>
        </div>
        <Button onClick={() => setAddContactModalIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("buttons.add")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TextInput
          type="search"
          icon={SearchIcon}
          placeholder={t("placeholders.searchContacts")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading
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
          : filteredContacts?.length > 0 &&
            filteredContacts?.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEditContact={(contact) => {
                  setSelectedContact(contact);
                  setUpdateContactModalIsOpen(true);
                }}
                onDeleteContact={() => {
                  setSelectedContact(contact);
                  setDeleteContactModalIsOpen(true);
                }}
              />
            ))}
      </div>

      {filteredContacts?.length === 0 && (
        <Empty title={t("paragraphs.noContacts")} />
      )}

      <AddContactModal
        isOpen={addContactModalIsOpen}
        onClose={() => setAddContactModalIsOpen(false)}
      />

      {selectedContact && (
        <UpdateContactModal
          isOpen={updateContactModalIsOpen}
          onClose={() => setUpdateContactModalIsOpen(false)}
          contact={selectedContact}
        />
      )}
      <DeleteModal
        isOpen={deleteContactModalIsOpen}
        onClose={() => setDeleteContactModalIsOpen(false)}
        onDelete={handleDeleteContact}
        title={t("dialogs.delete.title")}
        subTitle={t("dialogs.delete.description")}
        isDeleting={isDeletingContact}
      />
    </div>
  );
}
