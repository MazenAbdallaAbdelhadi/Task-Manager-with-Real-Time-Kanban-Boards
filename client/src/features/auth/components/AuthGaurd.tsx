import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { setUser, useIsAuthenticated } from "../authSlice";
import { api } from "@/api/api";
import { ResponseObject } from "@/types/responseType";
import { User } from "@/types/user";
import { useAppDispatch } from "@/store/store";
import { Loader } from "lucide-react";

const AuthGuard: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await api.get<ResponseObject<User>>("/v1/users/getMe");
        const user = response.data?.data;
        if (user) {
          dispatch(setUser({ user }));
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (!isAuthenticated) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, dispatch]);

  if (loading) {
    return (
      <div className="h-screen grid place-content-center">
        <Loader size={24} className="animate-spin text-primary" />
      </div>
    ); // or any loading indicator
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
