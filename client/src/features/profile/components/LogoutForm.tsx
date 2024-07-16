import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { clearUser } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/store/store";

const LogoutForm = () => {
  const dispatch = useAppDispatch();

  async function handleClick() {
    localStorage.removeItem("token");
    dispatch(clearUser());
  }

  return <AlertDialogAction onClick={handleClick}>Logout</AlertDialogAction>;
};

export default LogoutForm;
