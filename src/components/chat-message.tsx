import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ReactElement } from "react";

interface ChatMessageProps {
  isAI?: boolean;
  message: string;
  avatar: string | ReactElement;
}

export function ChatMessage({
  isAI = false,
  message,
  avatar,
}: ChatMessageProps) {
  return (
    <div className="flex gap-4 px-[1rem] py-[1rem] md:px-[4rem] md:py-[1.5rem]">
      <Avatar
        className={
          " items-center justify-center " +
          (!isAI ? "bg-purple-200 text-black" : "")
        }
      >
        <AvatarFallback>{avatar}</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex items-center">
        <p className="text-sm text-gray-700 font-[500]">{message}</p>
      </div>
    </div>
  );
}
