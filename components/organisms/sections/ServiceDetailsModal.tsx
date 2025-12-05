"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import useLocalizer from "@/hooks/useLocalizer";
import { IService } from "@/types/Section";
import Image from "next/image";
import ServiceSelect from "@/components/selects/serviceSelect";

interface ServiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: IService | null;
}

export default function ServiceDetailsModal({
  isOpen,
  onClose,
  service,
}: ServiceDetailsModalProps) {
  const { isRtl, t } = useLocalizer();

  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isRtl ? service.arTitle : service.enTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badge */}
          <div>
            <Badge variant={service.unactive ? "destructive" : "default"}>
              {service.unactive ? t("labels.inactive") : t("labels.active")}
            </Badge>
          </div>

          {/* Images */}
          {(service.thumbnailUrl || service.imageUrl) && (
            <div className="grid grid-cols-2 gap-4">
              {service.thumbnailUrl && (
                <div>
                  <p className="text-sm font-medium mb-2">
                    {t("labels.thumbnail")}
                  </p>
                  <div className="relative h-40 w-full overflow-hidden rounded-md border">
                    <Image
                      src={service.thumbnailUrl}
                      alt="Thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              {service.imageUrl && (
                <div>
                  <p className="text-sm font-medium mb-2">
                    {t("labels.mainImage")}
                  </p>
                  <div className="relative h-40 w-full overflow-hidden rounded-md border">
                    <Image
                      src={service.imageUrl}
                      alt="Main Image"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Titles */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t("labels.arTitle")}
              </p>
              <p className="mt-1">{service.arTitle}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t("labels.enTitle")}
              </p>
              <p className="mt-1">{service.enTitle}</p>
            </div>
          </div>

          {service.parentServiceId && (
            <div className="w-full">
              <ServiceSelect
                label={t("labels.parentService")}
                placeholder={t("placeholders.parentService")}
                noOptionsMessage={t("placeholders.noOptions")}
                value={service.parentServiceId}
                allowWithoutSelection
                disabled
              />
            </div>
          )}

          {/* Subtitles */}
          {(service.arSubTitle || service.enSubTitle) && (
            <div className="grid grid-cols-2 gap-4">
              {service.arSubTitle && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t("labels.arSubTitle")}
                  </p>
                  <p className="mt-1">{service.arSubTitle}</p>
                </div>
              )}
              {service.enSubTitle && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t("labels.enSubTitle")}
                  </p>
                  <p className="mt-1">{service.enSubTitle}</p>
                </div>
              )}
            </div>
          )}

          {/* Descriptions */}
          {(service.arDescription || service.enDescription) && (
            <div className="grid grid-cols-2 gap-4">
              {service.arDescription && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t("labels.arDescription")}
                  </p>
                  <p className="mt-1 text-sm">{service.arDescription}</p>
                </div>
              )}
              {service.enDescription && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t("labels.enDescription")}
                  </p>
                  <p className="mt-1 text-sm">{service.enDescription}</p>
                </div>
              )}
            </div>
          )}

          {/* Video and Poster URLs */}
          {(service.videoUrl || service.posterUrl) && (
            <div className="grid grid-cols-2 gap-4">
              {service.videoUrl && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t("labels.videoUrl")}
                  </p>
                  <a
                    href={service.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm text-blue-600 hover:underline break-all"
                  >
                    {service.videoUrl}
                  </a>
                </div>
              )}
              {service.posterUrl && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t("labels.posterUrl")}
                  </p>
                  <a
                    href={service.posterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm text-blue-600 hover:underline break-all"
                  >
                    {service.posterUrl}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Order */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {t("labels.displayOrder")}
            </p>
            <p className="mt-1">{service.order}</p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t("labels.createdAt")}
              </p>
              <p className="mt-1 text-sm">
                {new Date(service.createdAt).toLocaleString()}
              </p>
            </div>
            {service.modifiedAt && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("labels.updatedAt")}
                </p>
                <p className="mt-1 text-sm">
                  {new Date(service.modifiedAt).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t("buttons.cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
