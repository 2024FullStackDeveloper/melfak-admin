"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Calendar,
  Clock,
  LogIn,
  LogOut,
  Sparkles,
  UserSquare,
  PhoneCall,
  Lock,
} from "lucide-react";
import useLocalizer from "@/hooks/useLocalizer";
import useAuthState from "@/services/zustand/authState";
import dateFormat from "dateformat";
import { useForm } from "react-hook-form";
import {
  createUpdateUserPassword,
  createUpdateUserProfile,
} from "@/validations/auth";
import useUpdateProfile from "@/services/API/mutations/user/useUpdateProfile";
import useUpdatePassword from "@/services/API/mutations/user/useUpdatePassword";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import TextInput from "@/components/core/TextInput";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";
import { ApiResponse } from "@/services/API";

export default function ProfilePage() {
  const { t } = useLocalizer();
  const { user, setUser } = useAuthState();

  const updateProfileInfoSchema = createUpdateUserProfile(t);
  const updatePasswordSchema = createUpdateUserPassword(t);
  const { mutateAsync: updateProfile } = useUpdateProfile();

  const { mutateAsync: updatePasswor } = useUpdatePassword();

  const updateProfileForm = useForm<z.infer<typeof updateProfileInfoSchema>>({
    resolver: zodResolver(updateProfileInfoSchema),
    defaultValues: {
      email: user?.email,
      mobileNumber: user?.mobileNumber,
      fullName: user?.fullName,
    },
  });

  const updatePasswordForm = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    updateProfileForm.reset({
      email: user?.email,
      mobileNumber: user?.mobileNumber,
      fullName: user?.fullName,
    });
  }, [user]);

  const onUpdateProfileSubmit = async (
    values: z.infer<typeof updateProfileInfoSchema>
  ) => {
    updateProfile(values)
      .then((response) => {
        if (response.success) {
          toast.success(response?.message);
          setUser({
            id: response?.data?.id ?? user?.id ?? "",
            email: response?.data?.email ?? user?.email ?? "",
            mobileNumber:
              response?.data?.mobileNumber ?? user?.mobileNumber ?? "",
            fullName: response?.data?.fullName ?? user?.fullName ?? "",
            lastLogin: response?.data?.lastLogin ?? user?.lastLogin ?? "",
            lastLogout: response?.data?.lastLogout ?? user?.lastLogout ?? "",
            createdAt: response?.data?.createdAt ?? user?.createdAt ?? "",
            updatedAt: response?.data?.updatedAt ?? user?.updatedAt ?? "",
          });
          updateProfileForm.reset();
        } else {
          toast.error(response?.message);
        }
      })
      .catch((error) => {
        try {
          const result = error as ApiResponse<null>;
          toast.error(result?.message);
        } catch {
          toast.error(error.message);
        }
      });
  };

  const onUpdatePasswordSubmit = async (
    values: z.infer<typeof updatePasswordSchema>
  ) => {
    updatePasswor(values)
      .then((response) => {
        if (response.success) {
          toast.success(response?.message);
          updatePasswordForm.reset();
        } else {
          toast.error(response?.message);
        }
      })
      .catch((error) => {
        try {
          const result = error as ApiResponse<null>;
          toast.error(result?.message);
        } catch {
          toast.error(error.message);
        }
      });
  };

  return (
    <div className="grid grid-cols-1 gap-4 h-full">
      <Card
        className="border-0 shadow-xl animate-in slide-in-from-bottom"
        style={{ animationDelay: "200ms" }}
      >
        <CardHeader className="border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            {t("titles.activity")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-linear-to-r from-green-500/5 via-transparent to-green-500/5 border border-green-500/10 hover:border-green-500/20 transition-all hover:scale-105">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-green-500 to-emerald-500 shadow-md">
                  <LogIn className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("labels.lastLogin")}
                </p>
              </div>
              <p className="text-sm font-semibold">
                {user?.lastLogin && dateFormat(user?.lastLogin)}
              </p>
            </div>

            <div className="flex flex-col gap-3 p-4 rounded-xl bg-linear-to-r from-orange-500/5 via-transparent to-orange-500/5 border border-orange-500/10 hover:border-orange-500/20 transition-all hover:scale-105">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-orange-500 to-red-500 shadow-md">
                  <LogOut className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("labels.lastLogout")}
                </p>
              </div>
              <p className="text-sm font-semibold">
                {user?.lastLogout && dateFormat(user?.lastLogout)}
              </p>
            </div>

            <div className="flex flex-col gap-3 p-4 rounded-xl bg-linear-to-r from-blue-500/5 via-transparent to-blue-500/5 border border-blue-500/10 hover:border-blue-500/20 transition-all hover:scale-105">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 shadow-md">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("labels.createdAt")}
                </p>
              </div>
              <p className="text-sm font-semibold">
                {user?.createdAt && dateFormat(user?.createdAt)}
              </p>
            </div>

            <div className="flex flex-col gap-3 p-4 rounded-xl bg-linear-to-r from-purple-500/5 via-transparent to-purple-500/5 border border-purple-500/10 hover:border-purple-500/20 transition-all hover:scale-105">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-purple-500 to-pink-500 shadow-md">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("labels.updatedAt")}
                </p>
              </div>
              <p className="text-sm font-semibold">
                {user?.updatedAt && dateFormat(user?.updatedAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        <Card
          onClick={() => {
            console.log(user);
          }}
          className="border-0 shadow-xl animate-in slide-in-from-bottom"
          style={{ animationDelay: "200ms" }}
        >
          <CardHeader className="border-b">
            <CardTitle className="text-xl flex items-center gap-2">
              <UserSquare className="h-5 w-5" />
              {t("titles.profile")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...updateProfileForm}>
              <form
                className="flex flex-col justify-between gap-4"
                onSubmit={updateProfileForm.handleSubmit(onUpdateProfileSubmit)}
              >
                <div className="flex flex-col gap-4">
                  <FormField
                    control={updateProfileForm.control}
                    name="fullName"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <TextInput
                            required
                            label={t("labels.fullName")}
                            placeholder={t("placeholders.fullName")}
                            icon={UserSquare}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            error={fieldState.error?.message}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={updateProfileForm.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <TextInput
                            type="email"
                            required
                            label={t("labels.email")}
                            placeholder={t("placeholders.email")}
                            icon={Mail}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            error={fieldState.error?.message}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={updateProfileForm.control}
                    name="mobileNumber"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <TextInput
                            required
                            label={t("labels.mobileNumber")}
                            placeholder={t("placeholders.mobileNumber")}
                            icon={PhoneCall}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            error={fieldState.error?.message}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    disabled={updateProfileForm.formState?.isSubmitting}
                  >
                    {t("buttons.save")}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card
          onClick={() => {
            console.log(user);
          }}
          className="border-0 shadow-xl animate-in slide-in-from-bottom"
          style={{ animationDelay: "200ms" }}
        >
          <CardHeader className="border-b">
            <CardTitle className="text-xl flex items-center gap-2">
              <UserSquare className="h-5 w-5" />
              {t("titles.profile")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...updatePasswordForm}>
              <form
                className="flex flex-col justify-between gap-4"
                onSubmit={updatePasswordForm.handleSubmit(
                  onUpdatePasswordSubmit
                )}
              >
                <div className="flex flex-col gap-4">
                  <FormField
                    control={updatePasswordForm.control}
                    name="currentPassword"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <TextInput
                            required
                            type="password"
                            label={t("labels.currentPassword")}
                            placeholder={t("placeholders.currentPassword")}
                            icon={Lock}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            error={fieldState.error?.message}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={updatePasswordForm.control}
                    name="newPassword"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <TextInput
                            type="password"
                            required
                            label={t("labels.newPassword")}
                            placeholder={t("placeholders.newPassword")}
                            icon={Lock}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            error={fieldState.error?.message}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    disabled={updatePasswordForm.formState?.isSubmitting}
                  >
                    {t("buttons.save")}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
