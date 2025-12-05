"use client";
import TextInput from "@/components/core/TextInput";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useLocalizer from "@/hooks/useLocalizer";
import useDeleteItemAttribute from "@/services/API/mutations/items/useDeleteItemAttribute";
import { serviceItemSchema } from "@/validations/sections";
import { SwitchThumb } from "@radix-ui/react-switch";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface AttributesTableProps {}

export default function AttributesTable({}: AttributesTableProps) {
  const { t } = useLocalizer();
  const { control, watch } = useFormContext<z.infer<serviceItemSchema>>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  const { mutateAsync: deleteAttribute, isPending: deleteAttributePending } =
    useDeleteItemAttribute();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{t("labels.attributes")}</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const maxOrder = Math.max(...fields.map((field) => field.order), 0);
            let order = 0;
            if (maxOrder === 0) {
              order = 1;
            } else {
              order = maxOrder + 1;
            }
            append({
              id: "",
              itemId: "",
              arName: "",
              enName: "",
              singleValue: true,
              value: "",
              arValue: "",
              enValue: "",
              order: order,
            });
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          {t("buttons.addAttribute")}
        </Button>
      </div>

      <div className="rounded-md border max-w-[320px] sm:max-w-[520px] overflow-x-auto">
        <Table className="min-w-[750px] ">
          <TableHeader>
            <TableRow className="dark:hover:bg-transparent!">
              <TableHead className="w-[50px]">{t("labels.order")}</TableHead>
              <TableHead>{t("labels.arName")}</TableHead>
              <TableHead>{t("labels.enName")}</TableHead>
              <TableHead className="w-[150px]">
                {t("labels.singleValue")}
              </TableHead>
              <TableHead>{t("labels.value")}</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => {
              const isSingleValue = watch(`attributes.${index}.singleValue`);
              const id = watch(`attributes.${index}.id`);
              const disabled = id !== "";
              return (
                <TableRow key={field.id} className="dark:hover:bg-transparent!">
                  <TableCell>
                    <FormField
                      control={control}
                      name={`attributes.${index}.order`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <TextInput
                              disabled={disabled}
                              readOnly={disabled}
                              type="number"
                              min={0}
                              className="px-0! text-center"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={control}
                      name={`attributes.${index}.arName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <TextInput
                              disabled={disabled}
                              readOnly={disabled}
                              className="px-0!"
                              placeholder={t("placeholders.arName")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={control}
                      name={`attributes.${index}.enName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <TextInput
                              disabled={disabled}
                              readOnly={disabled}
                              className="px-0!"
                              placeholder={t("placeholders.enName")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={control}
                      name={`attributes.${index}.singleValue`}
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-center">
                          <FormControl>
                            <Switch
                              disabled={disabled}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            >
                              <SwitchThumb />
                            </Switch>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    {isSingleValue ? (
                      <FormField
                        control={control}
                        name={`attributes.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <TextInput
                                disabled={disabled}
                                readOnly={disabled}
                                className="px-0! text-center"
                                placeholder={t("placeholders.value")}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <div className="flex flex-col gap-2">
                        <FormField
                          control={control}
                          name={`attributes.${index}.arValue`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <TextInput
                                  disabled={disabled}
                                  readOnly={disabled}
                                  className="px-0! text-center"
                                  placeholder={t("placeholders.arValue")}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`attributes.${index}.enValue`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <TextInput
                                  disabled={disabled}
                                  readOnly={disabled}
                                  className="px-0! text-center"
                                  placeholder={t("placeholders.enValue")}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={deleteAttributePending}
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (!id) {
                          remove(index);
                        } else {
                          deleteAttribute(id)
                            .then((response) => {
                              if (response.data.data.success) {
                                toast.success(response.data.data.message);
                                remove(index);
                              } else {
                                toast.error(response.data.data.message);
                              }
                            })
                            .catch((error) => {
                              try {
                                toast.error(error.response.data.data.message);
                              } catch {
                                toast.error(error.message);
                              }
                            });
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {fields.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground h-24"
                >
                  {t("placeholders.noAttributes")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
