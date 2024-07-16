import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditProfileForm from "./EditProfileForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import DeleteAccountForm from "./DeleteAccountForm";

const ProfileTabs: React.FC = () => {
  return (
    <Tabs
      defaultValue="profile"
      className="gap-4 min-h-[400px] max-w-[100%] overflow-hidden"
    >
      <ScrollArea>
        <TabsList className="justify-between w-full  mb-4">
          <TabsTrigger value="profile">My Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="delete_account">Delete Account</TabsTrigger>
        </TabsList>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="profile">
        <EditProfileForm />
      </TabsContent>
      <TabsContent value="password">
        <UpdatePasswordForm />
      </TabsContent>
      <TabsContent value="delete_account">
        <DeleteAccountForm />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
