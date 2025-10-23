import ConversationForm from "@/components/conversation-form";

export const metadata = {
  title: "相談内容登録",
};

export default function NewPage() {
  return (
    <div className="container">
      <h1 className="text-2xl font-bold my-4">相談内容登録</h1>
      <div>
        <ConversationForm />
      </div>
    </div>
  );
}
