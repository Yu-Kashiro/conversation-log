"use client";

import { createConversation } from "@/actions/conversation";
import { Button } from "@/components/ui/button";
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
import { contactMethods } from "@/db/schemas/conversation";
import { ConversationFormData } from "@/types/conversation";
import { conversationFormSchema } from "@/zod/conversation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const contactMethodLabels: Record<(typeof contactMethods)[number], string> = {
  phone: "電話",
  counter: "窓口",
  visit: "訪問",
  email: "メール",
  online: "オンライン",
};

// Dateオブジェクトをローカルタイムゾーンの"YYYY-MM-DDTHH:mm"形式に変換
function formatDatetimeLocal(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

interface ConversationFormProps {
  defaultValues?: Partial<ConversationFormData>;
  onSubmit?: (data: ConversationFormData) => Promise<void>;
  submitButtonText?: string;
}

export default function ConversationForm({
  defaultValues,
  submitButtonText = "登録",
}: ConversationFormProps) {
  const router = useRouter();
  const form = useForm<ConversationFormData>({
    resolver: zodResolver(conversationFormSchema),
    defaultValues: defaultValues || {
      targetPerson: "",
      content: "",
      consultationDate: new Date(),
      contactMethod: "phone",
      createdBy: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit = async (data: ConversationFormData) => {
    try {
      await createConversation(data);
      toast(`${data.targetPerson} さんの相談内容を登録しました。`);
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error("相談内容の登録に失敗しました。");
      console.error("Failed to create conversation:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          <Button type="button" variant="outline" onClick={() => router.back()}>
            キャンセル
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {form.formState.isSubmitting ? "送信中..." : submitButtonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
