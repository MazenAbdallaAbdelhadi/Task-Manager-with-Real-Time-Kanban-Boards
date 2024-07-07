import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { updateBoardSchema } from "../validation/updateBoardSchema";
import { useUpdatedBoardService } from "../services/updateBoardService";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { closeModal } from "@/features/modal/modalSlice";
import { useAppDispatch } from "@/store/store";

interface Props {
  title?: string;
  description?: string;
}

const EditBoardForm: React.FC<Props> = ({ title, description }) => {
  const form = useForm<z.infer<typeof updateBoardSchema>>({
    resolver: zodResolver(updateBoardSchema),
    defaultValues: {
      title: title || "",
      description: description || "",
    },
    mode: "onChange",
  });
  const dispatch = useAppDispatch();

  const { mutate, isPending, isSuccess } = useUpdatedBoardService();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Board updated successfully");
      dispatch(closeModal());
    }
  }, [isSuccess]);

  function onSubmit(values: z.infer<typeof updateBoardSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="board name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="board description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="mt-2">
          {isPending ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            "update board"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EditBoardForm;
