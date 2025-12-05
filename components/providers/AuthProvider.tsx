"use client";
import { useRouter } from "@/i18n/routing";
import useGetUserInfo from "@/services/API/fetching/user/useGetUserInfo";
import useLogout from "@/services/API/mutations/user/useLogout";
import useAuthState from "@/services/zustand/authState";
import { IUser } from "@/types/Auth";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  isOnline: boolean;
  user: IUser | null;
  logout: () => Promise<void>;
  fetchUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { mutateAsync: logoutMutation } = useLogout();
  const {
    user,
    accessToken,
    isAuthenticated,
    logout: clearAuth,
    setUser,
  } = useAuthState();

  const { isLoading, data, refetch } = useGetUserInfo({
    enabled: !!accessToken && isOnline,
    onError: (error: any) => {
      if (error?.response?.status === 401) {
        handleLogout();
      }
    },
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (data && !isLoading) {
      setUser(data);
    }
  }, [data, isLoading, setUser]);

  useEffect(() => {
    if (!isLoading && !accessToken) {
      router.replace("/");
    }
  }, [accessToken, isLoading, router]);

  const fetchUserData = async () => {
    if (!isOnline) {
      throw new Error("No internet connection");
    }
    if (!isAuthenticated) {
      throw new Error("User not authenticated");
    }
    await refetch();
  };

  const handleLogout = async () => {
    try {
      if (isOnline && isAuthenticated) {
        await logoutMutation();
      }
    } finally {
      clearAuth();
      queryClient.clear();
      router.replace("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        isOnline,
        user,
        logout: handleLogout,
        fetchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
