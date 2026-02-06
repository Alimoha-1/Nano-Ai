'use client';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';
import { format } from 'date-fns';

interface ChatBubbleProps {
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function ChatBubble({ sender, content, timestamp }: ChatBubbleProps) {
  const isUser = sender === 'user';

  return (
    <div
      className={cn(
        'flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500',
        isUser && 'flex-row-reverse'
      )}
    >
      <Avatar className={cn(
        'w-10 h-10 border-2 shrink-0',
        isUser
          ? 'border-blue-500/30 bg-gradient-to-br from-blue-500 to-blue-600'
          : 'border-slate-300 dark:border-slate-700 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800'
      )}>
        <AvatarFallback className={cn(
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
            : 'bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 text-slate-700 dark:text-slate-300'
        )}>
          {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </AvatarFallback>
      </Avatar>

      <div className={cn('flex flex-col max-w-[70%]', isUser && 'items-end')}>
        <div
          className={cn(
            'px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm border transition-all duration-300 hover:shadow-xl',
            isUser
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-400/50 rounded-tr-sm'
              : 'bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-white border-slate-200/50 dark:border-slate-700/50 rounded-tl-sm'
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
        <span className={cn(
          'text-xs text-slate-500 dark:text-slate-400 mt-1 px-2',
          isUser && 'text-right'
        )}>
          {format(timestamp, 'HH:mm')}
        </span>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Avatar className="w-10 h-10 border-2 border-slate-300 dark:border-slate-700 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 shrink-0">
        <AvatarFallback className="bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 text-slate-700 dark:text-slate-300">
          <Bot className="w-5 h-5" />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <div className="px-4 py-3 rounded-2xl rounded-tl-sm shadow-lg backdrop-blur-sm border bg-white/80 dark:bg-slate-800/80 border-slate-200/50 dark:border-slate-700/50">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}