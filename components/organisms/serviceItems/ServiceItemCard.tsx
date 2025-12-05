import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLocalizer from "@/hooks/useLocalizer";
import { IServiceItem } from "@/types/Section";
import { Edit, Eye, MoreVertical, Trash } from "lucide-react";
import Image from "next/image";

interface ServiceItemCardProps {
  item: IServiceItem;
  onView: (item: IServiceItem) => void;
  onEdit: (item: IServiceItem) => void;
  onDelete: (item: IServiceItem) => void;
}

export default function ServiceItemCard({
  item,
  onView,
  onEdit,
  onDelete,
}: ServiceItemCardProps) {
  const { isRtl, t } = useLocalizer();

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-md border">
          <Image
            src={item.thumbnailUrl}
            alt={isRtl ? item.arTitle : item.enTitle}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium">{isRtl ? item.arTitle : item.enTitle}</h4>
          {(item.arSubTitle || item.enSubTitle) && (
            <p className="text-sm text-muted-foreground">
              {isRtl ? item.arSubTitle : item.enSubTitle}
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
          {/* <DropdownMenuItem onClick={() => onView(item)}>
            <Eye className="mr-2 h-4 w-4" />
            {t("buttons.viewDetails")}
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => onEdit(item)}>
            <Edit className="mr-2 h-4 w-4" />
            {t("buttons.editService")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => onDelete(item)}
          >
            <Trash className="mr-2 h-4 w-4" />
            {t("buttons.deleteService")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
