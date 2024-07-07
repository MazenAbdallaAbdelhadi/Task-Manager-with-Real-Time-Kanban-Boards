import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConfirmResetForm } from "@/features/auth";

const ConfirmResetPage = () => {
  return (
    <div className="h-screen grid place-items-center">
      <Card className="min-w-[300px]">
        <CardHeader>
          <CardTitle>Confirm OTP 🔐</CardTitle>
          <CardDescription>reset your password</CardDescription>
        </CardHeader>
        <CardContent>
          <ConfirmResetForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmResetPage;
