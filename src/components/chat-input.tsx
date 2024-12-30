import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 m-0 md:mx-[3rem] md:mb-[3rem] md:border-none border-t"
    >
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message..."
          className="flex-1 md:px-[1.5rem] md:py-[1.5rem] md:text-base text-sm"
        />
        <Button
          type="submit"
          size="icon"
          className="shrink-0 md:w-[3.5rem] md:h-auto"
          style={{ boxShadow: "0px 4px 30px 0px #6666661A" }}
        >
          <Send className="!w-[1.2rem] !h-[1.2rem] hidden md:block" />
          <Send className="w-4 h-4 md:hidden block" />
        </Button>
      </div>
    </form>
  );
}
