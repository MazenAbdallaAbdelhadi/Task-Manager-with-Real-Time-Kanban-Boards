import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ModalType,
  selectIsOpen,
  selectModalProps,
} from "@/features/modal/modalSlice";
import { useSelector } from "react-redux";
import LogoutForm from "./LogoutForm";
import ProfileTabs from "./ProfileTabs";

interface Props {
  onClose: () => void;
}

const ProfileModal: React.FC<Props> = ({ onClose }) => {
  const isOpen = useSelector(selectIsOpen(ModalType.PROFILE_MODAL));
  const modalProps = useSelector(selectModalProps);
  const { logout } = modalProps;

  if (logout) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to Logout?
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <LogoutForm />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-8">
        <ProfileTabs />
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
