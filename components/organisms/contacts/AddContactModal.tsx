"use client";

import ImageInput from "@/components/core/imgaeInput/ImageInput";
import Modal from "@/components/core/modal/Modal";
import SwitchBox from "@/components/core/SwitchBox";
import TextInput from "@/components/core/TextInput";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import useLocalizer from "@/hooks/useLocalizer";
import { ApiResponse } from "@/services/API";
import useAddContact from "@/services/API/mutations/contacts/useAddContact";
import { addContactSchema, createContactSchema } from "@/validations/contacts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface AddSocialMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSocialMediaModal: React.FC<AddSocialMediaModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useLocalizer();
  const contactSchema = createContactSchema(t);
  const { mutateAsync: addContact } = useAddContact();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      iconFile: undefined,
      phoneNumber: "",
      isPrimary: false,
      unActive: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof addContactSchema>) => {
    addContact(values)
      .then((response) => {
        if (response?.data?.data?.success) {
          toast.success(response?.data?.data?.message);
          form.reset();
          onClose();
        } else {
          toast.error(response?.data?.data?.message);
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
  };

  return (
    <Modal
      title={t("dialogs.addContact.title")}
      subTitle={t("dialogs.addContact.description")}
      isOpen={isOpen}
      onRequestClose={onClose}
      body={
        <Form {...form}>
          <form
            id="add-contact-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="iconFile"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <ImageInput
                      required
                      label={t("labels.iconFile")}
                      placeholder={t("placeholders.iconFile")}
                      onChange={(files) => {
                        field.onChange(files?.[0]);
                      }}
                      value={field.value ? [field.value] : []}
                      error={fieldState?.invalid}
                      errorMessage={fieldState?.error?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <TextInput
                      required
                      label={t("labels.phone")}
                      placeholder={t("placeholders.phone")}
                      icon={Phone}
                      {...field}
                      error={fieldState?.error?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPrimary"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <SwitchBox
                      subTitle={t("placeholders.isPrimary")}
                      label={t("labels.isPrimary")}
                      checked={field.value}
                      onCheckedChange={(value) => {
                        field.onChange(value);
                      }}
                      error={fieldState?.error?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unActive"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <SwitchBox
                      subTitle={t("placeholders.unactive")}
                      label={t("labels.unactive")}
                      checked={field.value}
                      onCheckedChange={(value) => {
                        field.onChange(value);
                      }}
                      error={fieldState?.error?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      }
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={form.formState?.isSubmitting}
          >
            {t("buttons.cancel")}
          </Button>
          <Button
            type="submit"
            form="add-contact-form"
            disabled={form.formState?.isSubmitting}
          >
            {t("buttons.save")}
          </Button>
        </div>
      }
    />
  );
};

export default AddSocialMediaModal;
