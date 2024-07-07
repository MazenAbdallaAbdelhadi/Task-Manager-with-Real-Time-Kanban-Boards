import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/features/auth";

const LoginPage: React.FC = () => {
  return (
    <div className="h-screen grid place-items-center">
      <Card className="min-w-[300px]">
        <CardHeader>
          <CardTitle>Login 🔐</CardTitle>
          <CardDescription>Welcome Back</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
