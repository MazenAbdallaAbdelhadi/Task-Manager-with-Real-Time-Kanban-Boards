import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDeleteBoardService } from "../services/deleteBoardService";
import { useAppDispatch } from "@/store/store";
import { closeModal } from "@/features/modal/modalSlice";
import { useSelector } from "react-redux";
import { selectSelectedBoard, unselectBoard } from "../boardSlice";
import { useNavigate } from "react-router-dom";

const DeleteBoardForm = () => {
  const form = useForm({
    defaultValues: {
      title: "",
    },
  });

  const selectedBoard = useSelector(selectSelectedBoard);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate, isPending, isSuccess } = useDeleteBoardService();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Board deleted successfully");
      dispatch(closeModal());
      dispatch(unselectBoard());
      navigate("/");
    }
  }, [isSuccess]);

  const boardTitle = selectedBoard?.title;

  function handleSubmit(data: { title: string }) {
    if (data.title !== boardTitle) {
      form.setError("title", { message: "Title is incorrect" });
    } else {
      mutate();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter form "{boardTitle}" to proceed </FormLabel>
              <FormControl>
                <Input placeholder="board name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="mt-2">
          {isPending ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            "DELETE BOARD"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default DeleteBoardForm;
