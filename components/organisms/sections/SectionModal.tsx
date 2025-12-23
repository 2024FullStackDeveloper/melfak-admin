import Select from "@/components/core/select/Select";
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
import useGetPages from "@/services/API/fetching/pages/useGetPages";
import { ISection } from "@/types/Section";
import { createSectionSchema } from "@/validations/sections";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Hash, ListOrderedIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: z.infer<typeof createSectionSchema>, id?: string) => void;
  initialData?: ISection | null;
  isLoading?: boolean;
}

export default function SectionModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: SectionModalProps) {
  const { t, isRtl } = useLocalizer();
  const schema = createSectionSchema(t);
  const { data: pages, isLoading: pagesLoading } = useGetPages();

  const pagesOptions = useMemo(() => {
    return (
      pages?.map((page) => ({
        value: page.code,
        label: isRtl ? page.arName : page.enName,
      })) || []
    );
  }, [pages]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      arTitle: "",
      enTitle: "",
      arDescription: "",
      enDescription: "",
      unactive: false,
      pageCode: "",
      orderOnPage: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        arTitle: initialData?.arTitle,
        enTitle: initialData?.enTitle,
        arDescription: initialData?.arDescription ?? "",
        enDescription: initialData?.enDescription ?? "",
        unactive: initialData?.unactive,
        pageCode: initialData?.pageCode,
        orderOnPage: initialData?.orderOnPage,
      });
    } else {
      form.reset({
        arTitle: "",
        enTitle: "",
        arDescription: "",
        enDescription: "",
        unactive: false,
        pageCode: "",
        orderOnPage: 0,
      });
    }
  }, [initialData, isOpen, form]);

  const handleSubmit = (values: z.infer<typeof schema>) => {
    onSubmit(values, initialData?.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? t("titles.editSection") : t("titles.addSection")}
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
                name="pageCode"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        label={t("labels.pageCode")}
                        placeholder={t("placeholders.pageCode")}
                        value={field.value}
                        disabled={true}
                        options={pagesOptions}
                        onChange={field.onChange}
                        error={fieldState.invalid}
                        noOptionsMessage={fieldState.error?.message}
                        id="pageCode"
                        isRequired
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="orderOnPage"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        type="number"
                        min={1}
                        required
                        disabled
                        label={t("labels.orderOnPage")}
                        placeholder={t("placeholders.orderOnPage")}
                        icon={Hash}
                        value={field.value ?? 0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        error={fieldState.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="arTitle"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        required
                        label={t("labels.arTitle")}
                        placeholder={t("placeholders.arTitle")}
                        icon={FileText}
                        error={fieldState.error?.message}
                        value={field.value}
                        onChange={field.onChange}
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
                        required
                        label={t("labels.enTitle")}
                        placeholder={t("placeholders.enTitle")}
                        icon={FileText}
                        error={fieldState.error?.message}
                        value={field.value}
                        onChange={field.onChange}
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
                        error={fieldState.error?.message}
                        value={field.value}
                        onChange={field.onChange}
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
                        error={fieldState.error?.message}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="unactive"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SwitchBox
                      label={t("labels.unactive")}
                      subTitle={t("placeholders.unactive")}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

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
