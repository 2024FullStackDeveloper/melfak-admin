import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLocalizer from "@/hooks/useLocalizer";
import { Edit, MoreVertical, Plus, Trash } from "lucide-react";
import { IContact } from "@/types/Contact";
import Image from "next/image";
import SwitchBox from "@/components/core/SwitchBox";
import Text from "@/components/core/text/Text";

interface ContactCardProps {
  contact: IContact;
  onEditContact: (contact: IContact) => void;
  onDeleteContact: (id: string) => void;
}

export default function ContactCard({
  contact,
  onEditContact,
  onDeleteContact,
}: ContactCardProps) {
  const { isRtl, t } = useLocalizer();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-md border">
              <Image
                src={contact.iconUrl}
                alt={contact.phoneNumber}
                fill
                className="object-cover"
              />
            </div>
            <Text type="bodyLargeBold" className="italic">
              <bdi>{contact.phoneNumber}</bdi>
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
              <DropdownMenuItem onClick={() => onEditContact(contact)}>
                <Edit className="mr-2 h-4 w-4" />
                {t("buttons.editSection")}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDeleteContact(contact.id)}
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
          <SwitchBox
            label={t("labels.isPrimary")}
            disabled
            checked={contact.isPrimary}
          />
          <SwitchBox
            label={t("labels.unactive")}
            disabled
            checked={contact.unactive}
          />
        </div>
      </CardContent>
    </Card>
  );
}
