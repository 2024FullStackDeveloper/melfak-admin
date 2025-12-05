import ImageInput from "@/components/core/imgaeInput/ImageInput";
import VideoInput from "@/components/core/videoInput/VideoInput";
import SwitchBox from "@/components/core/SwitchBox";
import TextAreaInput from "@/components/core/TextAreaInput";
import TextInput from "@/components/core/TextInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useLocalizer from "@/hooks/useLocalizer";
import { IService } from "@/types/Section";
import { createServiceSchema, serviceSchema } from "@/validations/sections";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Hash } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ServiceSelect from "@/components/selects/serviceSelect";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (values: z.infer<serviceSchema>) => void;
  onEdit: (values: z.infer<serviceSchema>, id: string) => void;
  initialData?: IService | null;
  sectionId?: string;
  isLoading?: boolean;
}

export default function ServiceModal({
  isOpen,
  onClose,
  onAdd,
  onEdit,
  initialData,
  sectionId,
  isLoading,
}: ServiceModalProps) {
  const { t } = useLocalizer();
  const schema = createServiceSchema(t);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      sectionId: sectionId ?? "",
      arTitle: "",
      enTitle: "",
      arSubTitle: "",
      enSubTitle: "",
      arDescription: "",
      enDescription: "",
      unactive: false,
      order: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        sectionId: initialData.sectionId,
        arTitle: initialData.arTitle,
        enTitle: initialData.enTitle,
        arSubTitle: initialData.arSubTitle ?? "",
        enSubTitle: initialData.enSubTitle ?? "",
        arDescription: initialData.arDescription ?? "",
        enDescription: initialData.enDescription ?? "",
        unactive: initialData.unactive,
        order: initialData.order,
        parentServiceId: initialData.parentServiceId,
      } as any);
    } else if (sectionId) {
      form.reset({
        sectionId: sectionId,
        arTitle: "",
        enTitle: "",
        arSubTitle: "",
        enSubTitle: "",
        arDescription: "",
        enDescription: "",
        unactive: false,
        order: 0,
      });
    }
  }, [initialData, sectionId, isOpen, form]);

  const handleSubmit = (values: any) => {
    const submissionValues = {
      ...values,
      parentServiceId: values.parentServiceId || null,
    };

    if (initialData) {
      onEdit(submissionValues, initialData.id);
    } else {
      if (form.getValues("thumbnailFile")) {
        onAdd(submissionValues);
        onClose();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? t("titles.editService") : t("titles.addService")}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="arTitle"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        label={t("labels.arTitle")}
                        placeholder={t("placeholders.arTitle")}
                        icon={FileText}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        error={fieldState.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="enTitle"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        label={t("labels.enTitle")}
                        placeholder={t("placeholders.enTitle")}
                        icon={FileText}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value ?? "")}
                        error={fieldState.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="parentServiceId"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <ServiceSelect
                      label={t("labels.parentService")}
                      placeholder={t("placeholders.parentService")}
                      noOptionsMessage={t("placeholders.noOptions")}
                      value={field.value}
                      onChange={(value: string | null) =>
                        field.onChange(value ?? "")
                      }
                      error={fieldState.invalid}
                      errorMessage={fieldState.error?.message}
                      allowWithoutSelection
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="arSubTitle"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        label={t("labels.arSubTitle")}
                        placeholder={t("placeholders.arSubTitle")}
                        icon={FileText}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value ?? "")}
                        error={fieldState.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="enSubTitle"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        label={t("labels.enSubTitle")}
                        placeholder={t("placeholders.enSubTitle")}
                        icon={FileText}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value ?? "")}
                        error={fieldState.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="arDescription"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <TextAreaInput
                        label={t("labels.arDescription")}
                        placeholder={t("placeholders.arDescription")}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value ?? "")}
                        error={fieldState.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="enDescription"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <TextAreaInput
                        label={t("labels.enDescription")}
                        placeholder={t("placeholders.enDescription")}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value ?? "")}
                        error={fieldState.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="thumbnailFile"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <ImageInput
                        required
                        src={initialData?.thumbnailUrl}
                        label={t("labels.thumbnailFile")}
                        placeholder={t("placeholders.thumbnailFile")}
                        value={field.value ? [field.value] : []}
                        onChange={(files) =>
                          field.onChange(files ? files[0] : null)
                        }
                        error={fieldState.invalid}
                        errorMessage={fieldState.error?.message}
                        multiple={false}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageFile"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <ImageInput
                        src={initialData?.imageUrl ?? undefined}
                        label={t("labels.imageFile")}
                        placeholder={t("placeholders.imageFile")}
                        value={field.value ? [field.value] : []}
                        onChange={(files) =>
                          field.onChange(files ? files[0] : null)
                        }
                        multiple={false}
                        error={fieldState.invalid}
                        errorMessage={fieldState.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="videoFile"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <VideoInput
                        src={initialData?.videoUrl ?? undefined}
                        label={t("labels.videoFile")}
                        placeholder={t("placeholders.videoFile")}
                        value={field.value ? [field.value] : []}
                        onChange={(files) =>
                          field.onChange(files ? files[0] : null)
                        }
                        multiple={false}
                        error={fieldState.invalid}
                        errorMessage={fieldState.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="posterFile"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <ImageInput
                        src={initialData?.posterUrl ?? undefined}
                        label={t("labels.posterFile")}
                        placeholder={t("placeholders.posterFile")}
                        value={field.value ? [field.value] : []}
                        onChange={(files) =>
                          field.onChange(files ? files[0] : null)
                        }
                        multiple={false}
                        error={fieldState.invalid}
                        errorMessage={fieldState.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="order"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        label={t("labels.displayOrder")}
                        type="number"
                        icon={Hash}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        error={fieldState.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unactive"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <SwitchBox
                        label={t("labels.unactive")}
                        subTitle={t("placeholders.unactive")}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        error={fieldState.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                {t("buttons.cancel")}
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? t("buttons.saving") : t("buttons.saveChanges")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
