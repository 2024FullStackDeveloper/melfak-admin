"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  title: string;
  subTitle?: string;
  isOpen: boolean;
  onRequestClose: () => void;
  body: React.ReactNode;
  footer?: React.ReactNode;
  disableCloseOnRequest?: boolean;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  title,
  body,
  footer,
  subTitle,
  disableCloseOnRequest = false,
}) => {
  return (
    <Dialog modal open={isOpen} onOpenChange={onRequestClose}>
      <DialogClose disabled={disableCloseOnRequest} onClick={onRequestClose} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {subTitle && <DialogDescription>{subTitle}</DialogDescription>}
        </DialogHeader>
        {body}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
