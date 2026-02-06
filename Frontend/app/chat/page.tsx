'use client';

import { useState, useEffect, useRef } from 'react';
import { Sidebar } from '@/components/chat/Sidebar';
import { TopBar } from '@/components/chat/TopBar';
import { ChatBubble, TypingIndicator } from '@/components/chat/ChatBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import { VoiceModal } from '@/components/chat/VoiceModal';
import { MobileNav } from '@/components/chat/MobileNav';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      content: "Hello! I'm Nano NGU AI. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // ---------------------------
  //  AI API Integration
  // ---------------------------
  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: content }),
      });

      const data = await res.json();

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: data.response || "AI returned no response.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        sender: "ai",
        content: "Error connecting to AI API.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsTyping(false);
  };

  const handleVoiceClick = () => setIsVoiceModalOpen(true);
  const handleVoiceStop = () => console.log('Voice recording stopped');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <TopBar onMenuClick={() => {}} />

      <main className="fixed top-16 bottom-0 left-0 right-0 md:left-72 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent dark:from-blue-900/10" />

        <div className="relative h-full flex flex-col">
          <div className="flex-1 overflow-y-auto px-6 pt-6 pb-32 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
            <div className="max-w-4xl mx-auto">
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  sender={message.sender}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <ChatInput
            onSend={handleSendMessage}
            onVoiceClick={handleVoiceClick}
            disabled={isTyping}
          />
        </div>
      </main>

      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />

      <VoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onStop={handleVoiceStop}
      />

    </div>
  );
}
