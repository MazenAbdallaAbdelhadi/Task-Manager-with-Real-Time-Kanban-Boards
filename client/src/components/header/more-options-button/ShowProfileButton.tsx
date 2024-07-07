import { useDispatch } from "react-redux";
import { User } from "lucide-react";
import { ModalType, openModal } from "@/features/modal/modalSlice";
import { DropdownMenuItem } from "../../ui/dropdown-menu";

const ShowProfileButton = () => {
  const dispatch = useDispatch();

  return (
    <DropdownMenuItem
      onClick={() => dispatch(openModal({ type: ModalType.PROFILE_MODAL }))}
    >
      <User size={18} className="mr-2" />
      Profile
    </DropdownMenuItem>
  );
};

export default ShowProfileButton;
