"use client";

import { createConversation, deleteConversation, updateConversation } from "@/actions/conversation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contactMethodLabels, contactMethods } from "@/db/schemas/conversation";
import { formatDatetimeLocal } from "@/lib/date-utils";
import { ConversationFormData } from "@/types/conversation";
import { conversationFormSchema } from "@/zod/conversation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DeleteButton } from "./deleteButton";

export default function ConversationForm({
  id,
  defaultValues,
}: {
  id: string;
  defaultValues?: ConversationFormData;
}) {
  const router = useRouter();
  const form = useForm<ConversationFormData>({
    resolver: zodResolver(conversationFormSchema),
    defaultValues: defaultValues || {
      targetPerson: "",
      content: "",
      consultationDate: new Date(),
      contactMethod: "phone",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: ConversationFormData) => {
    try {
      if (defaultValues) {
        await updateConversation(id, data);
      } else {
        await createConversation(data);
      }
      toast(
        `${data.targetPerson} さんの相談内容を${
          defaultValues ? "更新" : "登録"
        }しました。`
      );
      router.push("/conversations");
    } catch (error) {
      toast.error(
        `相談内容の${defaultValues ? "更新" : "登録"}に失敗しました。`
      );
      console.error(
        `${defaultValues ? "Update error" : "Create error"}:`,
        error
      );
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteConversation(id);
      toast("相談内容を削除しました。")
      router.push("/conversations")
    } catch (error) {
      toast.error("相談内容を削除に失敗しました。")
      console.error("error:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {defaultValues ? "相談記録を編集" : "相談記録を登録"}
        </CardTitle>
        <CardDescription>
          {defaultValues
            ? "相談内容を更新してください"
            : "新しい相談内容を入力してください"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="targetPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>対象者名</FormLabel>
                  <FormControl>
                    <Input placeholder="山田 太郎" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consultationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>相談日</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={
                        field.value instanceof Date
                          ? formatDatetimeLocal(field.value)
                          : field.value
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>連絡方法</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="連絡方法を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {contactMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {contactMethodLabels[method]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>相談内容</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="相談内容を入力してください"
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <DeleteButton onClick={() => onDelete(id)}>削除する</DeleteButton>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                キャンセル
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {defaultValues ? "相談記録を更新" : "登録"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
