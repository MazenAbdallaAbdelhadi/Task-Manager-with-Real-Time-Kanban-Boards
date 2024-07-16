import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
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
import { useUser } from "@/features/auth/authSlice";
import { editProfileSchema } from "../validations/editProfileSchema";
import { useUpdateProfileService } from "../services/updateProfileService";
import ProfileImageField from "./ProfileImageField";

const EditProfileForm = () => {
  const user = useUser();

  const form = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.name || undefined,
      profileImage: undefined,
    },
    mode: "onChange",
  });

  const dispatch = useAppDispatch();

  const { mutate, isPending, isSuccess } = useUpdateProfileService();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully");
      dispatch(closeModal());
    }
  }, [isSuccess]);

  function onSubmit(values: z.infer<typeof editProfileSchema>) {
    mutate(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ProfileImageField img={user?.profileImage} />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} className="mt-4">
              {isPending ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                "Save changes"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditProfileForm;
