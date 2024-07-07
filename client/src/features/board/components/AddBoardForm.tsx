import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { createBoardSchema } from "../validation/createBoardSchema";
import { useCreateBoardService } from "../services/createBoardService";
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
import { useAppDispatch } from "@/store/store";
import { closeModal } from "@/features/modal/modalSlice";

const AddBoardForm: React.FC = () => {
  const form = useForm<z.infer<typeof createBoardSchema>>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onChange",
  });
  const dispatch = useAppDispatch();

  const { mutate, isPending, isSuccess } = useCreateBoardService();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Board created successfully");
      dispatch(closeModal());
    }
  }, [isSuccess]);

  function onSubmit(values: z.infer<typeof createBoardSchema>) {
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
            "add board"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddBoardForm;
