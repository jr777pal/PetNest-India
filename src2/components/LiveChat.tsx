import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Phone, Mail, Copy, ThumbsUp, ThumbsDown, Zap, Clock, AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
  showEscalation?: boolean;
  suggestions?: string[];
  timestamp?: Date;
  id?: string;
  rating?: "helpful" | "not-helpful" | null;
}

interface ChatSession {
  messages: Message[];
  startTime: Date;
  topic?: string;
}

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! 👋 I'm PetNest's AI Assistant. I can help you with adoption, pet care, and your questions. What can I help with today?",
      timestamp: new Date(),
      id: "initial-message",
      suggestions: ["Adoption Process", "Pet Care Tips", "Payment Methods", "Delivery Info"]
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Copy message to clipboard
  const copyToClipboard = (content: string, messageId: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessageId(messageId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  // Rate message helpfulness
  const rateMessage = (messageId: string, rating: "helpful" | "not-helpful") => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, rating } : msg
      )
    );
  };

  // Handle suggestion click
  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
    setTimeout(() => {
      handleSend(suggestion);
    }, 50);
  };

  // Handle send with optional override message
  const handleSend = async (messageOverride?: string) => {
    const userMessage = messageOverride || input.trim();
    
    if (!userMessage || isLoading) return;

    setInput("");
    const userMessageId = `msg-${Date.now()}-${Math.random()}`;
    
    setMessages((prev) => [
      ...prev, 
      { 
        role: "user", 
        content: userMessage,
        timestamp: new Date(),
        id: userMessageId
      }
    ]);
    setShowSuggestions(false);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat-support", {
        body: { message: userMessage },
      });

      if (error) throw error;

      const assistantMessageId = `msg-${Date.now()}-${Math.random()}`;
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
          showEscalation: data.escalate,
          timestamp: new Date(),
          id: assistantMessageId,
          suggestions: generateSuggestions(data.response, data.escalate),
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessageId = `msg-${Date.now()}-${Math.random()}`;
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I'm having trouble right now. Please try again or contact our support team directly.",
          showEscalation: true,
          timestamp: new Date(),
          id: errorMessageId,
        },
      ]);
    } finally {
      setIsLoading(false);
      setShowSuggestions(true);
    }
  };

  // Generate contextual suggestions
  const generateSuggestions = (response: string, escalate?: boolean): string[] => {
    const suggestions: string[] = [];
    
    if (response.toLowerCase().includes("adoption")) {
      suggestions.push("Pet Health Requirements");
    }
    if (response.toLowerCase().includes("payment")) {
      suggestions.push("Available Payment Methods");
    }
    if (response.toLowerCase().includes("delivery")) {
      suggestions.push("Delivery Timeline Details");
    }
    if (!escalate) {
      suggestions.push("Tell me more");
    }

    return suggestions.slice(0, 3);
  };

  // Clear chat history
  const clearChat = () => {
    setChatHistory([...chatHistory, { messages, startTime: new Date() }]);
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared! How can I help you now?",
        timestamp: new Date(),
        id: "cleared-message",
        suggestions: ["Adoption Process", "Pet Care Tips", "Payment Methods", "Delivery Info"]
      },
    ]);
    setInput("");
    setShowSuggestions(true);
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 flex items-center gap-3">
          {/* Unread badge */}
          <div className="flex flex-col items-end gap-2">
            <Badge variant="destructive" className="animate-pulse">New</Badge>
            <Button
              onClick={() => setIsOpen(true)}
              className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all hover:scale-110"
              size="icon"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col shadow-2xl z-50 bg-card">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="flex items-center gap-2">
              <div className="relative">
                <MessageCircle className="w-5 h-5 text-primary" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">PetNest AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Always online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={clearChat}
                title="Clear conversation"
                className="hover:bg-secondary"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-secondary"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={msg.id || idx} className="space-y-2">
                  {/* Message */}
                  <div
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 transition-all ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted border border-border"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      {msg.timestamp && (
                        <p className={`text-xs mt-1 ${
                          msg.role === "user" 
                            ? "text-primary-foreground/60" 
                            : "text-muted-foreground"
                        }`}>
                          {msg.timestamp.toLocaleTimeString([], { 
                            hour: "2-digit", 
                            minute: "2-digit" 
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message Actions */}
                  {msg.role === "assistant" && msg.id && (
                    <div className="flex items-center gap-2 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => copyToClipboard(msg.content, msg.id!)}
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        {copiedMessageId === msg.id ? "Copied!" : "Copy"}
                      </Button>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => rateMessage(msg.id!, "helpful")}
                          title="Helpful"
                        >
                          <ThumbsUp className={`w-3 h-3 ${msg.rating === "helpful" ? "fill-current text-green-600" : ""}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => rateMessage(msg.id!, "not-helpful")}
                          title="Not helpful"
                        >
                          <ThumbsDown className={`w-3 h-3 ${msg.rating === "not-helpful" ? "fill-current text-red-600" : ""}`} />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Escalation */}
                  {msg.showEscalation && (
                    <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                      <p className="text-sm font-medium mb-2 flex items-center gap-2 text-amber-900 dark:text-amber-100">
                        <AlertCircle className="w-4 h-4" />
                        Need more help? Contact our team:
                      </p>
                      <div className="space-y-2">
                        <a
                          href="tel:+918018119112"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          <span className="font-medium">+91 8018119112</span>
                        </a>
                        <a
                          href="mailto:petnest@gmail.com"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span className="font-medium">petnest@gmail.com</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Suggestions */}
                  {msg.role === "assistant" && msg.suggestions && msg.suggestions.length > 0 && showSuggestions && idx === messages.length - 1 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs text-muted-foreground font-medium">Quick replies:</p>
                      <div className="flex flex-wrap gap-2">
                        {msg.suggestions.map((suggestion, sidx) => (
                          <Button
                            key={sidx}
                            variant="outline"
                            size="sm"
                            className="text-xs h-8 hover:bg-primary hover:text-primary-foreground"
                            onClick={() => handleSuggestion(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3 border border-border">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t bg-muted/30">
            <div className="space-y-3">
              {/* Input */}
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="bg-card border-border"
                />
                <Button 
                  onClick={() => handleSend()} 
                  disabled={isLoading || !input.trim()} 
                  size="icon"
                  className="hover:scale-105 transition-transform"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick info */}
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Powered by AI • Instant responses
              </p>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default LiveChat;
