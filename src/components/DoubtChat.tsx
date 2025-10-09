import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Loader2 } from "lucide-react";

interface Message {
  role: "student" | "assistant";
  content: string;
}

interface DoubtChatProps {
  topic: string;
  answer: string;
}

export const DoubtChat = ({ topic, answer }: DoubtChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `I'm here to help clarify any doubts about your answer on "${topic}". What would you like to understand better?`
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "student", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      const mockResponse: Message = {
        role: "assistant",
        content: `That's a great question about "${input.slice(0, 30)}...". Let me explain: This relates to ${topic}. Based on your answer, I can see you're understanding the core concepts. To deepen your understanding, consider exploring the relationship between the key terms you mentioned and how they apply in different contexts.`
      };
      setMessages(prev => [...prev, mockResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto shadow-lg-colored">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl">Ask Your Doubts</CardTitle>
          </div>
          <CardDescription>
            Get clarification on any part of your answer or the topic
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "student" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.role === "student"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p className="text-sm font-semibold mb-1">
                      {message.role === "student" ? "You" : "Teacher AI"}
                    </p>
                    <p className="text-base leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="Ask your doubt here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              size="icon"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
