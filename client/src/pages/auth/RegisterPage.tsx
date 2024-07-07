import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "@/features/auth";

const RegisterPage: React.FC = () => {
  return (
    <div className="h-screen grid place-items-center">
      <Card className="min-w-[300px]">
        <CardHeader>
          <CardTitle>Register 🔐</CardTitle>
          <CardDescription>Join us now</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
