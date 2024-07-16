import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { AuthGaurd } from "./features/auth";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";
import ConfirmResetPage from "./pages/auth/ConfirmResetPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import HomePage from "./pages/main/HomePage";
import { ModalManager } from "./features/modal";
import MainLayout from "./layouts/MainLayout";
import { ThemeProvider } from "./context/theme-context";
import BoardPage from "./pages/main/BoardPage";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/confirm-reset" element={<ConfirmResetPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route element={<AuthGaurd />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path=":id" element={<BoardPage />} />
          </Route>
        </Route>
      </Routes>
      
      <ModalManager />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
