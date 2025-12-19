import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLocalizer from "@/hooks/useLocalizer";
import { IService } from "@/types/Section";
import { Edit, Eye, MoreVertical, Trash, ImageIcon } from "lucide-react";
import Image from "next/image";

interface ServiceItemProps {
  service: IService;
  onView: (service: IService) => void;
  onEdit: (service: IService) => void;
  onDelete: (service: IService) => void;
  onImages: (service: IService) => void;
}

export default function ServiceItem({
  service,
  onView,
  onEdit,
  onDelete,
  onImages,
}: ServiceItemProps) {
  const { isRtl, t } = useLocalizer();

  return (
    <div className="flex flex-row items-center justify-between p-4 border rounded-lg bg-card mb-4">
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 rounded-md border">
          <Image
            src={service.thumbnailUrl || "/images/default.png"}
            alt={isRtl ? service.arTitle : service.enTitle}
            fill
            className="object-cover"
          />
        </div>
        <div className=" flex-1">
          <h4
            className="font-medium line-clamp-1"
            title={isRtl ? service.arTitle : service.enTitle}
          >
            {isRtl ? service.arTitle : service.enTitle}
          </h4>
          {(service.arSubTitle || service.enSubTitle) && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {isRtl ? service.arSubTitle : service.enSubTitle}
            </p>
          )}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onView(service)}>
            <Eye className="mr-2 h-4 w-4" />
            {t("buttons.viewDetails")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onImages(service)}>
            <ImageIcon className="mr-2 h-4 w-4" />
            {t("buttons.images")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit(service)}>
            <Edit className="mr-2 h-4 w-4" />
            {t("buttons.editService")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => onDelete(service)}
          >
            <Trash className="mr-2 h-4 w-4" />
            {t("buttons.deleteService")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
