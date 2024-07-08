import React, { useEffect } from "react";
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
import { updateColumnSchema } from "../../validation/updateColumnSchema";
import { useUpdateColumnService } from "../../services/updateColumnService";

interface Props {
  name: string;
  columnId: string;
}

const EditColumnForm: React.FC<Props> = ({ name, columnId }) => {

  const form = useForm<z.infer<typeof updateColumnSchema>>({
    resolver: zodResolver(updateColumnSchema),
    defaultValues: {
      newName: name,
      columnId,
    },
    mode: "onChange",
  });

  const { mutate, isPending, isSuccess } = useUpdateColumnService();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Column updated successfully");
      dispatch(closeModal());
    }
  }, [isSuccess]);

  function onSubmit(values: z.infer<typeof updateColumnSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="newName"
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
            "Update Column"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EditColumnForm;
