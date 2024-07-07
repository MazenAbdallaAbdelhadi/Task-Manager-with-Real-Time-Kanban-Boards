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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { labelVariants } from "@/components/ui/label";

const ImageUpload = () => {
  const form = useFormContext();

  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    null
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

  function removeImage() {
    setPreviewImage(null);
    form.setValue("profileImage", new File([""], "profileImage"));
  }

  return (
    <>
      {previewImage ? (
        <div className="mt-6 flex flex-col justify-center items-center gap-2">
          <p className={cn(labelVariants())}>Profile Image</p>

          <img
            src={previewImage as string}
            alt="Preview"
            className="w-[150px] h-[150px] rounded-full"
          />

          <Button variant="ghost" onClick={removeImage}>
            Remove Image
          </Button>
        </div>
      ) : (
        <div className="mt-6 flex flex-col justify-center items-center gap-2 text-center">
          <FormField
            name="profileImage"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <Dropzone
                      {...field}
                      dropMessage="Drop profile Image or click here"
                      handleOnDrop={onDrop}
                      classNameWrapper="rounded-full h-[150px] w-[150px] grid place-items-center text-center"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      )}
    </>
  );
};

export default ImageUpload;
