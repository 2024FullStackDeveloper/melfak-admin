import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLocalizer from "@/hooks/useLocalizer";
import { ISection, IService } from "@/types/Section";
import { Edit, MoreVertical, Plus, Trash } from "lucide-react";
import ServiceItem from "./ServiceItem";

interface SectionCardProps {
  section: ISection;
  onEditSection: (section: ISection) => void;
  onDeleteSection: (id: string) => void;
  onAddService: (sectionId: string) => void;
  onViewService: (service: IService) => void;
  onEditService: (service: IService) => void;
  onDeleteService: (service: IService) => void;
}

export default function SectionCard({
  section,
  onEditSection,
  onDeleteSection,
  onAddService,
  onViewService,
  onEditService,
  onDeleteService,
}: SectionCardProps) {
  const { isRtl, t } = useLocalizer();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">
          {isRtl ? section.arTitle : section.enTitle}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddService(section.id)}
          >
            <Plus className="mr-2 h-4 w-4" />
            {t("buttons.addService")}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEditSection(section)}>
                <Edit className="mr-2 h-4 w-4" />
                {t("buttons.editSection")}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDeleteSection(section.id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                {t("buttons.deleteSection")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {section.services && section.services.length > 0 ? (
          <div className="space-y-4 pt-4">
            {section.services.map((service) => (
              <ServiceItem
                key={service.id}
                service={service}
                onView={onViewService}
                onEdit={onEditService}
                onDelete={onDeleteService}
              />
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-muted-foreground">
            {t("paragraphs.noServicesFound")}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
