import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResetPasswordForm } from "@/features/auth";

const ResetPasswordPage = () => {
  return (
    <div className="h-screen grid place-items-center">
      <Card className="min-w-[300px]">
        <CardHeader>
          <CardTitle>Reset Your Password 🔐</CardTitle>
          <CardDescription>reset your password</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
