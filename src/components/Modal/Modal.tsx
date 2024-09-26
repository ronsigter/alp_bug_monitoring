import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModalStore } from "./useModalStore";

type ModalProps = {
  name: string;
  children: React.ReactNode;
};

export default function Modal(props: ModalProps) {
  const { openedModals, toggleModal } = useModalStore();

  const isOpen = openedModals.has(props.name);

  return (
    <Dialog open={isOpen} onOpenChange={() => toggleModal(props.name)}>
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
}
