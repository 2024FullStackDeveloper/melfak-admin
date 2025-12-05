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
import { ISection } from "@/types/Section";
import { createSectionSchema } from "@/validations/sections";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText } from "lucide-react";
import { useEffect } from "react";
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
  const { t } = useLocalizer();
  const schema = createSectionSchema(t);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      arTitle: "",
      enTitle: "",
      arDescription: "",
      enDescription: "",
      unactive: false,
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
      });
    } else {
      form.reset({
        arTitle: "",
        enTitle: "",
        arDescription: "",
        enDescription: "",
        unactive: false,
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
