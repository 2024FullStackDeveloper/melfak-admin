"use client";

import ImageInput from "@/components/core/imgaeInput/ImageInput";
import Modal from "@/components/core/modal/Modal";
import SwitchBox from "@/components/core/SwitchBox";
import TextInput from "@/components/core/TextInput";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import useLocalizer from "@/hooks/useLocalizer";
import { ApiResponse } from "@/services/API";
import useUpdateSocialMedia from "@/services/API/mutations/socialMedias/useUpdateSocialMedia";
import { ISocialMedia } from "@/types/SocialMedia";
import { updateSocialMediaSchema } from "@/validations/socialMedia";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListOrdered, Share } from "lucide-react";
import { useDeferredValue, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface UpdateSocialMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  socialMedia: ISocialMedia;
}

const UpdateSocialMediaModal: React.FC<UpdateSocialMediaModalProps> = ({
  isOpen,
  onClose,
  socialMedia,
}) => {
  const socialMediaValue = useDeferredValue(socialMedia);
  const { t } = useLocalizer();
  const schema = updateSocialMediaSchema(t);
  const { mutateAsync: updateSocialMedia } = useUpdateSocialMedia();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      iconFile: undefined,
      unActive: false,
      displayOrder: undefined,
      name: undefined,
    },
  });

  useEffect(() => {
    form.reset({
      displayOrder: socialMediaValue?.displayOrder,
      name: socialMediaValue?.name,
      unActive: socialMediaValue?.unactive,
    });
  }, [socialMediaValue, form.reset]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    updateSocialMedia([socialMediaValue?.id, { body: values }])
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
      title={t("dialogs.updateSocialMedia.title")}
      subTitle={t("dialogs.updateSocialMedia.description")}
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
                      src={socialMediaValue?.iconUrl}
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
              name="name"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <TextInput
                      required
                      label={t("labels.name")}
                      placeholder={t("placeholders.name")}
                      icon={Share}
                      {...field}
                      error={fieldState?.error?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="displayOrder"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <TextInput
                      type="number"
                      min={1}
                      required
                      label={t("labels.displayOrder")}
                      placeholder={t("placeholders.displayOrder")}
                      icon={ListOrdered}
                      value={field.value.toString()}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
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

export default UpdateSocialMediaModal;
