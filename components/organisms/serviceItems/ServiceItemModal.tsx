import ImageInput from "@/components/core/imgaeInput/ImageInput";
import SwitchBox from "@/components/core/SwitchBox";
import TextAreaInput from "@/components/core/TextAreaInput";
import TextInput from "@/components/core/TextInput";
import VideoInput from "@/components/core/videoInput/VideoInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import useLocalizer from "@/hooks/useLocalizer";
import { IServiceItem } from "@/types/Section";
import {
  createServiceItemSchema,
  serviceItemSchema,
} from "@/validations/sections";
import { zodResolver } from "@hookform/resolvers/zod";
import { Currency, FileText, Hash } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AttributesTable from "./AttributesTable";

interface ServiceItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (
    values: z.infer<serviceItemSchema>,
    attributes: z.infer<serviceItemSchema>["attributes"]
  ) => void;
  onEdit: (
    values: z.infer<serviceItemSchema>,
    id: string,
    attributes: z.infer<serviceItemSchema>["attributes"]
  ) => void;
  initialData?: IServiceItem | null;
  isLoading?: boolean;
  serviceId: string;
}

export default function ServiceItemModal({
  isOpen,
  onClose,
  onAdd,
  onEdit,
  initialData,
  isLoading,
  serviceId,
}: ServiceItemModalProps) {
  const { t } = useLocalizer();
  const schema = createServiceItemSchema(t);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceId: serviceId,
      arTitle: "",
      enTitle: "",
      arDescription: "",
      enDescription: "",
      unactive: false,
      isAvailable: false,
      isNewArrival: false,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        serviceId: serviceId,
        arTitle: initialData?.arTitle,
        enTitle: initialData?.enTitle,
        arDescription: initialData?.arDescription ?? "",
        enDescription: initialData?.enDescription ?? "",
        arSubTitle: initialData?.arSubTitle ?? "",
        enSubTitle: initialData?.enSubTitle ?? "",
        unactive: initialData?.unactive,
        isAvailable: initialData?.isAvailable ?? false,
        isNewArrival: initialData?.isNewArrival ?? false,
        price: initialData?.price ?? 0,
        order: initialData?.order ?? 0,
        attributes:
          initialData?.attributes?.map((attr) => ({
            id: attr.id,
            itemId: initialData.id,
            arName: attr.arName,
            enName: attr.enName,
            singleValue: attr.singleValue,
            value: attr.value,
            arValue: attr.arValue ?? "",
            enValue: attr.enValue ?? "",
            order: attr.order,
          })) ?? [],
      });
    } else {
      form.reset({
        serviceId: serviceId,
        arTitle: "",
        enTitle: "",
        arDescription: "",
        enDescription: "",
        unactive: false,
        attributes: [],
      });
    }
  }, [initialData, isOpen, form]);

  const handleSubmit = (values: z.infer<typeof schema>) => {
    const attributes = [...(values?.attributes ?? [])];
    let attributesAdded = attributes;
    if (attributesAdded.length > 0) {
      attributesAdded = attributesAdded.filter((attr) => attr.id === "");
    }
    if (initialData) {
      onEdit(values, initialData.id, attributesAdded);
    } else {
      onAdd(values, attributesAdded);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData
              ? t("titles.editServiceItem")
              : t("titles.addServiceItem")}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 "
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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
                name="enDescription"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <TextAreaInput
                        label={t("labels.enDescription")}
                        placeholder={t("placeholders.enDescription")}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
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
                        src={initialData?.thumbnailUrl ?? undefined}
                        required
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        label={t("labels.price")}
                        type="number"
                        min={0}
                        icon={Currency}
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
                name="order"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        label={t("labels.displayOrder")}
                        type="number"
                        min={0}
                        icon={Hash}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        error={fieldState.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
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
              <FormField
                control={form.control}
                name="isAvailable"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <SwitchBox
                        label={t("labels.isAvailable")}
                        subTitle={t("placeholders.isAvailable")}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        error={fieldState.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isNewArrival"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <SwitchBox
                        label={t("labels.isNewArrival")}
                        subTitle={t("placeholders.isAvailable")}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        error={fieldState.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <AttributesTable />

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
