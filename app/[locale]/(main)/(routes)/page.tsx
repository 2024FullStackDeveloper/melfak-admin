"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Lock, User, Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useLocalizer from "@/hooks/useLocalizer";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import TextInput from "@/components/core/TextInput";
import Footer from "@/components/core/Footer";
import useSigningIn from "@/services/API/mutations/auth/useSignIn";
import useEmailVerifying from "@/services/API/mutations/auth/useEmailVerifying";
import useAuthState from "@/services/zustand/authState";
import {
  createChangePasswordSchema,
  createEmailVerifyingSchema,
  createSignInSchema,
} from "@/validations/auth";
import { IEmailVerifyingResponse, ILoginResponse } from "@/types/Auth";
import { ApiResponse } from "@/services/API";
import { toast } from "sonner";
import useChangePassword from "@/services/API/mutations/auth/useChangePassword";
import { useRouter } from "@/i18n/routing";

type Step = "login" | "forgot-email" | "forgot-otp";

const otpSchema = z.object({
  otp: z.string().min(4, {
    message: "Please enter the 4-digit code.",
  }),
});

const resetSchema = z
  .object({
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(1, {
      message: "Please confirm your password.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignInPage() {
  const { t, isRtl } = useLocalizer();
  const [step, setStep] = useState<Step>("login");
  const [forgotEmail, setForgotEmail] = useState("");
  const router = useRouter();

  // Hooks must be called inside the component
  const { mutateAsync: signIn } = useSigningIn();
  const { mutateAsync: verifyEmail } = useEmailVerifying();
  const { mutateAsync: changePassword } = useChangePassword();
  const { setUser, setAccessToken, isAuthenticated } = useAuthState();

  const signInSchema = createSignInSchema(t);
  const onLoginSubmit = async (values: z.infer<typeof signInSchema>) => {
    await signIn(values)
      .then((returnedData) => {
        const { success, data, message } =
          returnedData as ApiResponse<ILoginResponse>;
        if (success) {
          setAccessToken(data!.token);
          setUser(data!.user!);
          router.replace("/dashboard");
        } else {
          toast.error(message);
        }
      })
      .catch((err) => {
        loginForm?.setError("password", {
          message: "كلمة المرور غير صحيحة !",
        });
      });
  };
  const loginForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  //---------------------------------------------------------
  const emailVerifyingSchema = createEmailVerifyingSchema(t);
  const onEmailVerifyingSubmit = async (
    values: z.infer<typeof emailVerifyingSchema>
  ) => {
    await verifyEmail(values)
      .then((returnedData) => {
        const { success, data, message } =
          returnedData as ApiResponse<IEmailVerifyingResponse>;
        if (success && data?.otpSent) {
          setForgotEmail(values.email);
          changePasswordForm.setValue("email", values.email);
          toast.success(message);
          emailForm.reset();
          setStep("forgot-otp");
        } else {
          toast.error(message);
        }
      })
      .catch(() => {
        emailForm?.setError("email", {
          message: "البريد الالكتروني غير صحيح !",
        });
      });
  };
  const emailForm = useForm<z.infer<typeof emailVerifyingSchema>>({
    resolver: zodResolver(emailVerifyingSchema),
    defaultValues: {
      email: "",
    },
  });

  const changePasswordSchema = createChangePasswordSchema(t);
  const onChangePasswordSubmit = async (
    values: z.infer<typeof changePasswordSchema>
  ) => {
    await changePassword({
      email: forgotEmail,
      newPassword: values.newPassword,
      otp: values.otp,
    })
      .then((returnedData) => {
        const { success, message } = returnedData as ApiResponse<null>;
        if (success) {
          toast.success(message);
          setForgotEmail("");
          changePasswordForm.reset();
          setStep("login");
        } else {
          toast.error(message);
        }
      })
      .catch(() => {
        changePasswordForm?.setError("email", {
          message: "البريد الالكتروني غير صحيح !",
        });
      });
  };
  const changePasswordForm = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      otp: "",
    },
  });

  useLayoutEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const getTitle = () => {
    switch (step) {
      case "login":
        return t("titles.login");
      case "forgot-email":
        return t("titles.forgotPassword");
      case "forgot-otp":
        return t("titles.verifyCode");
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="flex flex-1 items-center  justify-center">
        <div
          className={cn(
            "fixed top-4 z-50 flex items-center gap-2",
            isRtl ? "right-4" : "left-4"
          )}
        >
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <Card className="w-full max-w-[500px] border-secondary shadow-xl rounded-none sm:rounded-sm py-12 px-4 sm:px-8">
          <CardHeader className="space-y-1 text-center pb-12">
            <CardTitle className="text-4xl font-normal tracking-tight">
              {getTitle()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === "login" && (
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormControl>
                          <TextInput
                            required
                            type="email"
                            label={t("labels.email")}
                            placeholder={t("placeholders.email")}
                            icon={User}
                            {...field}
                            error={loginForm.formState.errors.email?.message}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormControl>
                          <TextInput
                            autoComplete="off"
                            required
                            type="password"
                            label={t("labels.password")}
                            placeholder={t("placeholders.password")}
                            icon={Lock}
                            {...field}
                            error={loginForm.formState.errors.password?.message}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between pt-4">
                    <div className="space-y-1">
                      <Button
                        variant="link"
                        type="button"
                        onClick={() => setStep("forgot-email")}
                      >
                        {t("labels.forgotPassword")}
                      </Button>
                    </div>
                    <Button
                      disabled={loginForm.formState.isSubmitting}
                      variant="accent"
                      type="submit"
                    >
                      {t("buttons.signIn")}
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            {step === "forgot-email" && (
              <Form {...emailForm}>
                <form
                  onSubmit={emailForm.handleSubmit(onEmailVerifyingSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormControl>
                          <TextInput
                            type="email"
                            required
                            label={t("labels.email")}
                            placeholder={t("placeholders.email")}
                            icon={Mail}
                            {...field}
                            error={emailForm.formState.errors.email?.message}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between pt-4">
                    <Button
                      variant="link"
                      type="button"
                      onClick={() => setStep("login")}
                    >
                      {isRtl ? (
                        <ArrowRight className="h-3 w-3" />
                      ) : (
                        <ArrowLeft className="h-3 w-3" />
                      )}
                      {t("buttons.backToLogin")}
                    </Button>
                    <Button
                      disabled={emailForm.formState.isSubmitting}
                      variant="accent"
                      type="submit"
                    >
                      {t("buttons.next")}
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            {step === "forgot-otp" && (
              <Form {...changePasswordForm}>
                <form
                  onSubmit={changePasswordForm.handleSubmit(
                    onChangePasswordSubmit
                  )}
                  className="space-y-8"
                >
                  <div className="text-center text-sm text-muted-foreground mb-6">
                    {t("paragraphs.verifyOtpCode")} {forgotEmail}
                  </div>
                  <FormField
                    control={changePasswordForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-medium uppercase tracking-wide text-center block">
                          {t("labels.verifyOtpCode")}
                        </FormLabel>
                        <FormControl>
                          <div className="flex justify-center">
                            <InputOTP maxLength={4} {...field}>
                              <InputOTPGroup className="[&>div]:w-12 [&>div]:h-12">
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={changePasswordForm.control}
                    disabled={changePasswordForm.watch("otp")?.length !== 4}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormControl>
                          <TextInput
                            required
                            autoComplete="off"
                            type="password"
                            label={t("labels.newPassword")}
                            placeholder={t("placeholders.newPassword")}
                            icon={Lock}
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              changePasswordForm.trigger("newPassword");
                            }}
                            error={
                              changePasswordForm.formState.errors.newPassword
                                ?.message
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between pt-4">
                    <Button
                      type="button"
                      onClick={() => setStep("forgot-email")}
                      className="text-xs transition-colors hover:text-accent-foreground flex items-center gap-1"
                    >
                      {isRtl ? (
                        <ArrowRight className="h-3 w-3" />
                      ) : (
                        <ArrowLeft className="h-3 w-3" />
                      )}
                      {t("buttons.back")}
                    </Button>
                    <Button
                      disabled={changePasswordForm.formState.isSubmitting}
                      variant="accent"
                      type="submit"
                    >
                      {t("buttons.verify")}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
