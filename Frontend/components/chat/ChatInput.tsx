'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  onVoiceClick: () => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, onVoiceClick, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-80 md:right-12 z-20">
      <form onSubmit={handleSubmit}>
        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl shadow-2xl shadow-slate-900/10 dark:shadow-slate-900/50 transition-all duration-300 hover:shadow-3xl">
          <div className="flex items-end gap-2 p-3">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:scale-110"
              disabled={disabled}
            >
              <Paperclip className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </Button>

            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              disabled={disabled}
              rows={1}
              className="flex-1 bg-transparent border-none outline-none resize-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm py-2 max-h-[120px]"
            />

            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={onVoiceClick}
              className="shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:scale-110"
              disabled={disabled}
            >
              <Mic className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </Button>

            <Button
              type="submit"
              size="icon"
              disabled={!message.trim() || disabled}
              className={cn(
                'shrink-0 rounded-full transition-all hover:scale-110',
                message.trim()
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30'
                  : 'bg-slate-200 dark:bg-slate-800'
              )}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}