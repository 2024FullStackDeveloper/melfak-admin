import { IUser } from "@/types/Auth";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  LoggedInAt?: number | null;
  setUser: (user: IUser) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

const authState = (set: (fn: (state: AuthState) => AuthState) => void) =>
  ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    LoggedInAt: null,
    setUser: (user) =>
      set((state: AuthState) => ({
        ...state,
        user,
      })),
    setAccessToken: (token) =>
      set((state: AuthState) => ({
        ...state,
        accessToken: token,
        isAuthenticated: true,
        LoggedInAt: Date.now(),
      })),
    logout: () =>
      set((state: AuthState) => ({
        ...state,
        user: null,
        accessToken: null,
        isAuthenticated: false,
        LoggedInAt: null,
      })),
  } as AuthState);

export const useAuthState = create(
  devtools(
    persist(authState, {
      name: "auth_state",
      storage: createJSONStorage(() => localStorage),
    })
  )
);

export default useAuthState;
