import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader } from "lucide-react";

import { useAppDispatch } from "@/store/store";
import { closeModal } from "@/features/modal/modalSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addColumnToBoardSchema } from "../../validation/addColumnToBoardSchema";
import { useAddColumnService } from "../../services/addColumnService";

const AddColumnForm = () => {
  const form = useForm<z.infer<typeof addColumnToBoardSchema>>({
    resolver: zodResolver(addColumnToBoardSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });
  const dispatch = useAppDispatch();

  const { mutate, isPending, isSuccess } = useAddColumnService();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Column added successfully");
      dispatch(closeModal());
    }
  }, [isSuccess]);

  function onSubmit(values: z.infer<typeof addColumnToBoardSchema>) {
    mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Column name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="mt-2">
          {isPending ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            "add Column"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddColumnForm;
