import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Dropzone from "@/components/ui/dropzone";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface Props {
  img?: string;
}

const ProfileImageField: React.FC<Props> = ({ img }) => {
  const form = useFormContext();

  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    img || null
  );

  function onDrop(acceptedFiles: FileList | null) {
    if (acceptedFiles) {
      // set preview Image
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(acceptedFiles[0]);

      form.setValue("profileImage", acceptedFiles[0]);
    }
  }

  return (
    <div className="mt-6 flex flex-col justify-center items-center gap-2 text-center">
      <FormField
        name="profileImage"
        control={form.control}
        render={({ field }) => {
          return (
            <FormItem className="flex flex-col items-center gap-2">
              <FormLabel>Profile Image</FormLabel>
              {previewImage && (
                <img
                  src={previewImage as string}
                  alt="Preview"
                  className="w-[150px] h-[150px] rounded-full"
                />
              )}
              <FormControl>
                <Dropzone
                  {...field}
                  dropMessage="Drop profile Image or click here"
                  handleOnDrop={onDrop}
                  classNameWrapper={cn(
                    "rounded-full h-[150px] w-[150px] grid place-items-center text-center",
                    previewImage && "h-auto rounded-lg w-auto"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
};

export default ProfileImageField;
