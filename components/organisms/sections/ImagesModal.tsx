import ImageInput from "@/components/core/imgaeInput/ImageInput";
import Select from "@/components/core/select/Select";
import SwitchBox from "@/components/core/SwitchBox";
import TextAreaInput from "@/components/core/TextAreaInput";
import TextInput from "@/components/core/TextInput";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import useLocalizer from "@/hooks/useLocalizer";
import useDeleteImage from "@/services/API/mutations/services/useDeleteImage";
import { IImage, IService } from "@/types/Section";
import { createImageSchema, imageSchema } from "@/validations/sections";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface ImagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: z.infer<imageSchema>, id: string) => void;
  initialData?: IService;
  isLoading?: boolean;
}

export default function ImagesModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: ImagesModalProps) {
  const { t, isRtl } = useLocalizer();
  const schema = createImageSchema(t);
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    if (initialData) {
      setImages(initialData.images ?? []);
    }
  }, [initialData]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = (values: z.infer<typeof schema>) => {
    onSubmit(values, initialData!.id);
  };

  const { mutateAsync: deleteImage, isPending: deleteImageLoading } =
    useDeleteImage();

  const handleDeleteImage = async (id: string) => {
    try {
      const response = await deleteImage(id);
      if (response.data?.data?.success) {
        toast.success(
          response?.data?.data?.message || "Image deleted successfully"
        );
        setImages(images.filter((image) => image.id !== id));
      } else {
        toast.error(response.data?.data?.message || "Failed to delete image");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("titles.addImages")}</DialogTitle>
          <DialogDescription>{t("paragraphs.addImages")}</DialogDescription>
        </DialogHeader>

        <div dir="ltr">
          <Carousel>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem
                  key={image?.id}
                  className="basis-1/2 xl:basis-1/3 "
                >
                  <div className="flex flex-col items-center">
                    <div className="relative h-[150px] w-full">
                      <Image
                        alt={image?.id}
                        src={image?.imageUrl}
                        fill
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      className="mt-2 w-full"
                      onClick={() => handleDeleteImage(image?.id)}
                    >
                      {deleteImageLoading &&
                      image?.id == initialData?.images?.[index]?.id
                        ? t("buttons.saving")
                        : t("buttons.delete")}
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="images"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <ImageInput
                        required
                        label={t("labels.image")}
                        placeholder={t("placeholders.image")}
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
