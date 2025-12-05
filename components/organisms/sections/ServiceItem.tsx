import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLocalizer from "@/hooks/useLocalizer";
import { IService } from "@/types/Section";
import { Edit, Eye, MoreVertical, Trash } from "lucide-react";
import Image from "next/image";

interface ServiceItemProps {
  service: IService;
  onView: (service: IService) => void;
  onEdit: (service: IService) => void;
  onDelete: (service: IService) => void;
}

export default function ServiceItem({
  service,
  onView,
  onEdit,
  onDelete,
}: ServiceItemProps) {
  const { isRtl, t } = useLocalizer();

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-md border">
          <Image
            src={service.thumbnailUrl}
            alt={isRtl ? service.arTitle : service.enTitle}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium">
            {isRtl ? service.arTitle : service.enTitle}
          </h4>
          {(service.arSubTitle || service.enSubTitle) && (
            <p className="text-sm text-muted-foreground">
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
