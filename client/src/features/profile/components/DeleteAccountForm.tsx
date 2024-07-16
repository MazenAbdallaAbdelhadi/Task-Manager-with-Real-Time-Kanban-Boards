import { useEffect } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { closeModal } from "@/features/modal/modalSlice";
import { useAppDispatch } from "@/store/store";
import { useDeleteAccountService } from "../services/deleteAccountService";

const DeleteAccountForm = () => {
  const dispatch = useAppDispatch();

  const { mutate, isPending, isSuccess } = useDeleteAccountService();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account deleted successfully");
      dispatch(closeModal());
    }
  }, [isSuccess]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          Be careful!!! This action cannot be undone. This will permanently
          delete your Account.
        </CardDescription>

        <CardContent className="p-0">
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() => mutate()}
          >
            {isPending ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              "Delete Account"
            )}
          </Button>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default DeleteAccountForm;
