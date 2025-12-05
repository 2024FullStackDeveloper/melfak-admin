"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useLocalizer from "@/hooks/useLocalizer";
import LoadingButton from "../buttons/LoadingButton";

interface Props {
  title: string;
  subTitle?: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

const DeleteModal: React.FC<Props> = ({
  title,
  subTitle,
  isOpen,
  onClose,
  onDelete,
  isDeleting,
}) => {
  const { t } = useLocalizer();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTrigger />
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t("dialogs.delete.cancel")}
          </Button>
          <LoadingButton
            isLoading={isDeleting}
            variant="destructive"
            onClick={onDelete}
          >
            {t("dialogs.delete.confirm")}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
