"use client";

import { useEffect, useEffectEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Settings,
  Save,
  X,
  SquareSquare,
  Lock,
  Cloud,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import useLocalizer from "@/hooks/useLocalizer";
import { cn } from "@/lib/utils";
import TextInput from "@/components/core/TextInput";
import TextAreaInput from "@/components/core/TextAreaInput";
import SwitchBox from "@/components/core/SwitchBox";
import { updateSettingsSchema } from "@/validations/settings";
import useGetSettings from "@/services/API/fetching/settings/useGetSettings";
import useUpdateSettings from "@/services/API/mutations/settings/useUpdateSettings";
import { ApiResponse } from "@/services/API";
import { ISettings } from "@/types/Settings";

export default function SettingsPage() {
  const { t, isRtl } = useLocalizer();

  const schema = updateSettingsSchema(t);

  const resetForm = () => {
    form.reset(settings ?? undefined);
  };

  const { data: settings } = useGetSettings();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (settings) {
      resetForm();
    }
  }, [settings]);

  const { mutateAsync: updateSettings } = useUpdateSettings();

  async function onSubmit(data: z.infer<typeof schema>) {
    updateSettings(data)
      .then((response) => {
        if (response?.data?.data?.success) {
          toast.success(response?.data?.data?.message);
          form.reset(response?.data?.data?.data ?? settings ?? undefined);
        }
      })
      .catch((error) => {
        try {
          const result = error?.response?.data?.data as ApiResponse<ISettings>;
          toast.error(result?.message);
        } catch {
          toast.error(error?.message);
        }
      });
  }

  function onCancel() {
    resetForm();
  }

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-8 w-8" />
          {t("titles.settings")}
        </h1>
        <p className="text-muted-foreground mt-1">{t("paragraphs.settings")}</p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          id="submit-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>{t("titles.globalSettings")}</CardTitle>
              <CardDescription>
                {t("paragraphs.globalSettings")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="applicationName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        required
                        label={t("labels.appName")}
                        placeholder={t("placeholders.appName")}
                        icon={SquareSquare}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        error={fieldState.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="arSummary"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextAreaInput
                          label={t("labels.arSummary")}
                          placeholder={t("placeholders.arSummary")}
                          className="resize-none"
                          rows={3}
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enSummary"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextAreaInput
                          label={t("labels.enSummary")}
                          placeholder={t("placeholders.enSummary")}
                          className="resize-none"
                          rows={3}
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle>{t("titles.securitySettings")}</CardTitle>
              <CardDescription>
                {t("paragraphs.securitySettings")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="otpExpiryInMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextInput
                          label={t("labels.otpExpiry")}
                          icon={Lock}
                          min={1}
                          type="number"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="misLoginAttemptsLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextInput
                          label={t("labels.maxLoginAttempts")}
                          icon={Lock}
                          min={1}
                          type="number"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="passwordMinLength"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        label={t("labels.minPasswordLength")}
                        icon={Lock}
                        min={1}
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">
                  {t("titles.passwordRequirements")}
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="passwordRequireUppercase"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <SwitchBox
                            label={t("labels.passwordRequireUppercase")}
                            subTitle={t(
                              "placeholders.passwordRequireUppercase"
                            )}
                            checked={field.value ?? false}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passwordRequireLowercase"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <SwitchBox
                            label={t("labels.passwordRequireLowercase")}
                            subTitle={t(
                              "placeholders.passwordRequireLowercase"
                            )}
                            checked={field.value ?? false}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passwordRequireNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <SwitchBox
                            label={t("labels.passwordRequireDigits")}
                            subTitle={t("placeholders.passwordRequireDigits")}
                            checked={field.value ?? false}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passwordRequireSpecialCharacter"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <SwitchBox
                            label={t("labels.passwordRequireNonAlphanumeric")}
                            subTitle={t(
                              "placeholders.passwordRequireNonAlphanumeric"
                            )}
                            checked={field.value ?? false}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Settings */}
          <Card>
            <CardHeader>
              <CardTitle>{t("titles.emailSettings")}</CardTitle>
              <CardDescription>{t("paragraphs.emailSettings")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="host"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <TextInput
                          label={t("labels.host")}
                          placeholder={t("placeholders.host")}
                          icon={Cloud}
                          required
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(e.target.value)}
                          error={fieldState?.error?.message}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="port"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <TextInput
                          label={t("labels.port")}
                          placeholder={t("placeholders.port")}
                          icon={Cloud}
                          type="number"
                          required
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          error={fieldState?.error?.message}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="useSsl"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <SwitchBox
                        label={t("labels.useSsl")}
                        subTitle={t("placeholders.useSsl")}
                        checked={field.value ?? false}
                        onCheckedChange={field.onChange}
                        error={fieldState?.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        label={t("labels.email")}
                        placeholder={t("placeholders.email")}
                        icon={Mail}
                        required
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        error={fieldState?.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        label={t("labels.password")}
                        placeholder={t("placeholders.password")}
                        icon={Lock}
                        type="password"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        error={fieldState?.error?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </form>
      </Form>

      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 ",
          isRtl ? "lg:right-72" : "lg:left-72"
        )}
      >
        <div className="container flex h-16 items-center justify-end gap-4 px-4 lg:px-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={form.formState.isSubmitting}
          >
            <X className="mr-2 h-4 w-4" />
            {t("buttons.cancel")}
          </Button>
          <Button
            type="submit"
            form="submit-form"
            disabled={form.formState.isSubmitting}
          >
            <Save className="mr-2 h-4 w-4" />
            {form.formState.isSubmitting
              ? t("buttons.saving")
              : t("buttons.saveChanges")}
          </Button>
        </div>
      </div>
    </div>
  );
}
