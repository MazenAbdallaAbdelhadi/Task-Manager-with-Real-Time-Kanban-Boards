import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ForgetPasswordForm } from "@/features/auth";

const ForgetPasswordPage = () => {
  return (
    <div className="h-screen grid place-items-center">
      <Card className="min-w-[300px]">
        <CardHeader>
          <CardTitle>Forget Password 🔐</CardTitle>
          <CardDescription>reset your password</CardDescription>
        </CardHeader>
        <CardContent>
          <ForgetPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgetPasswordPage;
