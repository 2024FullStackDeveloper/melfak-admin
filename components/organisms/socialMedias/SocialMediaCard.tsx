"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLocalizer from "@/hooks/useLocalizer";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { ISocialMedia } from "@/types/SocialMedia";
import Image from "next/image";
import SwitchBox from "@/components/core/SwitchBox";
import Text from "@/components/core/text/Text";
import { cn } from "@/lib/utils";

interface SocialMediaCardProps {
  socialMedia: ISocialMedia;
  onEditSocialMedia: (socialMedia: ISocialMedia) => void;
  onDeleteSocialMedia: (id: string) => void;
}

export default function SocialMediaCard({
  socialMedia,
  onEditSocialMedia,
  onDeleteSocialMedia,
}: SocialMediaCardProps) {
  const { isRtl, t } = useLocalizer();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-md border">
              <Image
                src={socialMedia.iconUrl}
                alt={socialMedia.name}
                fill
                className="object-cover"
              />
            </div>
            <Text type="bodyLargeBold" className="italic">
              <bdi>{socialMedia.name}</bdi>
            </Text>
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEditSocialMedia(socialMedia)}>
                <Edit className="mr-2 h-4 w-4" />
                {t("buttons.editSection")}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDeleteSocialMedia(socialMedia.id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                {t("buttons.deleteSection")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col  gap-4">
          <div className="flex flex-row justify-between items-center gap-2">
            <Text
              type="bodyLargeBold"
              className={cn(
                "border-accent px-2",
                isRtl ? "border-r" : "border-l"
              )}
            >
              {t("labels.displayOrder")}
            </Text>
            <Text type="bodyLargeBold">{socialMedia.displayOrder}</Text>
          </div>
          <SwitchBox
            label={t("labels.unactive")}
            disabled
            checked={socialMedia.unactive}
          />
        </div>
      </CardContent>
    </Card>
  );
}
