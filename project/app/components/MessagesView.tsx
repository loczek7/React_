import { Search, MoreVertical, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

const conversations = [
  {
    id: "1",
    name: "Dr. Maria Silva",
    avatar: "https://images.unsplash.com/photo-1758685734511-4f49ce9a382b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBlZHVjYXRvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzM1NjExMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    lastMessage: "Thanks for your interest in the Neural Networks course!",
    timestamp: "2h ago",
    unread: true
  },
  {
    id: "2",
    name: "Prof. Jan Nowak",
    avatar: "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzMxMjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    lastMessage: "The React patterns guide is now available",
    timestamp: "5h ago",
    unread: false
  },
  {
    id: "3",
    name: "Study Group - Web Dev",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NjMzNjk0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    lastMessage: "Meeting tomorrow at 3 PM!",
    timestamp: "1d ago",
    unread: true
  }
];

const messages = [
  {
    id: "1",
    sender: "Dr. Maria Silva",
    content: "Hi! I saw you enrolled in my Neural Networks course. How are you finding it so far?",
    timestamp: "2:30 PM",
    isOwn: false
  },
  {
    id: "2",
    sender: "You",
    content: "Hello! It's amazing! The explanations are very clear and the examples are practical.",
    timestamp: "2:35 PM",
    isOwn: true
  },
  {
    id: "3",
    sender: "Dr. Maria Silva",
    content: "Thanks for your interest in the Neural Networks course!",
    timestamp: "2:40 PM",
    isOwn: false
  }
];

export function MessagesView() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState("");

  return (
    <div className="flex gap-4 h-[calc(100vh-8rem)]">
      {/* Conversations List */}
      <div className="w-80 bg-card rounded-lg border border-border shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search messages..."
              className="pl-9 bg-secondary border-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`w-full p-4 flex items-start gap-3 hover:bg-secondary transition-colors border-b border-border ${
                selectedConversation.id === conversation.id ? "bg-secondary" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-muted overflow-hidden shrink-0">
                <ImageWithFallback 
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className={`truncate ${conversation.unread ? "font-semibold" : ""}`}>
                    {conversation.name}
                  </p>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {conversation.timestamp}
                  </span>
                </div>
                <p className={`text-sm truncate ${
                  conversation.unread ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unread && (
                <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-2" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Message Thread */}
      <div className="flex-1 bg-card rounded-lg border border-border shadow-sm flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
              <ImageWithFallback 
                src={selectedConversation.avatar}
                alt={selectedConversation.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p>{selectedConversation.name}</p>
              <p className="text-xs text-muted-foreground">Active now</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[70%] ${message.isOwn ? "order-2" : "order-1"}`}>
                {!message.isOwn && (
                  <p className="text-xs text-muted-foreground mb-1">{message.sender}</p>
                )}
                <div className={`rounded-lg p-3 ${
                  message.isOwn 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary"
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Textarea 
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="min-h-[60px] max-h-32 resize-none bg-secondary border-none"
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  // Send message logic
                  setMessageInput("");
                }
              }}
            />
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
              onClick={() => setMessageInput("")}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
