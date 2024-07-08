import { AlertDialogAction } from "@/components/ui/alert-dialog";
import React, { useEffect } from "react";
import { useRemoveColumnsService } from "../../services/removeColumnService";
import { useAppDispatch } from "@/store/store";
import { toast } from "sonner";
import { closeModal } from "@/features/modal/modalSlice";

interface Props {
  columnId: string;
}

const DeleteColumnForm: React.FC<Props> = ({ columnId }) => {
  const { mutateAsync, isPending, isSuccess } = useRemoveColumnsService();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Column deleted successfully");
      dispatch(closeModal());
    }
  }, [isSuccess]);

  async function handleClick() {
    console.log("BEFORE DELETE");
    await mutateAsync({ columnId });
    console.log("After DELETE");
  }

  return (
    <AlertDialogAction onClick={handleClick} disabled={isPending}>
      {isPending ? "Loading..." : "Continue"}
    </AlertDialogAction>
  );
};

export default DeleteColumnForm;
