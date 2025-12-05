"use client";

import ImageInput from "@/components/core/imgaeInput/ImageInput";
import Modal from "@/components/core/modal/Modal";
import SwitchBox from "@/components/core/SwitchBox";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import useLocalizer from "@/hooks/useLocalizer";
import { ApiResponse } from "@/services/API";
import useUpdateContact from "@/services/API/mutations/contacts/useUpdateContact";
import { IContact } from "@/types/Contact";
import { updateContactSchema } from "@/validations/contacts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeferredValue, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface UpdateContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: IContact;
}

const UpdateContactModal: React.FC<UpdateContactModalProps> = ({
  isOpen,
  onClose,
  contact,
}) => {
  const contactValue = useDeferredValue(contact);
  const { t } = useLocalizer();
  const contactSchema = updateContactSchema(t);
  const { mutateAsync: updateContact } = useUpdateContact();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      iconFile: undefined,
      isPrimary: false,
      unActive: false,
    },
  });

  useEffect(() => {
    form.reset({
      isPrimary: contactValue?.isPrimary,
      unActive: contactValue?.unactive,
    });
  }, [contactValue, form.reset]);

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    updateContact([contactValue?.id, { body: values }])
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
          const result = error?.data?.data as ApiResponse<null>;
          toast.error(result?.message);
        } catch {
          toast.error(error.message);
        }
      });
  };

  return (
    <Modal
      title={t("dialogs.updateContact.title")}
      subTitle={t("dialogs.updateContact.description")}
      isOpen={isOpen}
      onRequestClose={onClose}
      body={
        <Form {...form}>
          <form
            id="update-contact-form"
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
                      src={contactValue?.iconUrl}
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
            form="update-contact-form"
            disabled={form.formState?.isSubmitting}
          >
            {t("buttons.update")}
          </Button>
        </div>
      }
    />
  );
};

export default UpdateContactModal;
