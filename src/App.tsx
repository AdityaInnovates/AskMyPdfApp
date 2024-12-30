import { Header } from "./components/header";
import { ChatMessage } from "./components/chat-message";
import { ChatInput } from "./components/chat-input";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Upload } from "lucide-react";
import { Button } from "./components/ui/button";

interface Message {
  id: number;
  text: string;
  isAI: boolean;
}

export default function App() {
  const [currentDocumentID, setcurrentDocumentID] = useState<number | null>(
    null
  );
  const [isLoading, setisLoading] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const MessagesContainer = useRef<any>(null);
  const fileInputRef = useRef<any>(null);

  useEffect(() => {
    if (MessagesContainer?.current?.lastElementChild) {
      MessagesContainer?.current?.lastElementChild.scrollIntoView();
    }
  }, [messages]);

  const addInitialAiMessage = (pdfName: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 2,
        text: `Hello, I'm an AI assistant. I've processed "${pdfName}". How can I help you?`,
        isAI: true,
      },
    ]);
  };
  const handleSendMessage = async (text: string) => {
    if (!currentDocumentID) {
      return toast.error("Please first upload any PDF file to start the chat!");
    }
    var prevID = 0;
    setMessages((prev) => {
      prevID = prev.length + 2;
      return [
        ...prev,
        {
          id: prev.length + 1,
          text,
          isAI: false,
        },
        {
          id: prev.length + 2,
          text: "Thinking",
          isAI: true,
        },
      ];
    });
    var interval = setInterval(() => {
      setMessages((prev) =>
        prev.map((el) =>
          el.id == prevID
            ? {
                ...el,
                text: el.text.includes("...")
                  ? "Thinking" + ""
                  : el.text.includes("..")
                  ? "Thinking" + "..."
                  : el.text.includes(".")
                  ? "Thinking" + ".."
                  : "Thinking" + ".",
              }
            : el
        )
      );
    }, 500);
    var axres = await axios.post(import.meta.env.VITE_API_URL + "/question/", {
      document_id: currentDocumentID,
      question: text,
    });
    clearInterval(interval);
    setMessages((prev) =>
      prev.map((el) =>
        el.id == prevID ? { ...el, text: axres?.data?.answer } : el
      )
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        setcurrentDocumentID={setcurrentDocumentID}
        currentDocumentID={currentDocumentID}
        fileInputRef={fileInputRef}
        setisLoading={setisLoading}
        isLoading={isLoading}
        addInitialAiMessage={addInitialAiMessage}
      />
      {!currentDocumentID ? (
        <>
          <div className="h-full flex justify-center items-center">
            <div className="flex flex-col items-center justify-center flex-1 gap-4 p-8">
              <div className="flex flex-col items-center gap-2 max-w-md text-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Upload your PDF
                </h2>
                <p className="text-sm text-muted-foreground">
                  Upload a PDF document to start chatting with AI about its
                  contents. Our AI will help you understand and analyze the
                  document.
                </p>
              </div>
              <Button
                onClick={() => fileInputRef?.current?.click()}
                className="gap-2"
                disabled={isLoading != ""}
              >
                {isLoading || (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div ref={MessagesContainer} className="flex-1 overflow-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isAI={message.isAI}
              avatar={
                message.isAI ? (
                  <img src="/ai-planet-logo.png" alt="ai-planet-logo" />
                ) : (
                  "Me"
                )
              }
            />
          ))}
        </div>
      )}
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}
