'use client';

import { useState } from 'react';
import {
  Home,
  MessageSquare,
  Mic,
  Bookmark,
  Settings,
  ChevronLeft,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'voice', label: 'Voice Assistant', icon: Mic },
    { id: 'saved', label: 'Saved Chats', icon: Bookmark },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 border-r border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xl transition-all duration-300 z-40',
        isCollapsed ? 'w-20' : 'w-72',
        'max-md:hidden'
      )}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center justify-between mb-8">
          <div className={cn('flex items-center gap-3', isCollapsed && 'justify-center w-full')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                New Generation AI 
              </span>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          )}
        </div>

        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="mb-8 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mx-auto"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400 rotate-180" />
          </button>
        )}

        <div className={cn('mb-6 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg', isCollapsed && 'p-2')}>
          <div className={cn('flex items-center gap-3', isCollapsed && 'justify-center')}>
            <Avatar className="w-12 h-12 border-2 border-blue-500/30">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <User className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 dark:text-white truncate">Guest User</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">guest@nano.ai</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                  isCollapsed && 'justify-center px-2',
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                )}
              >
                <Icon className={cn('w-5 h-5', isActive && 'animate-pulse')} />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Need help?</p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Ask Nano AI anything about ethical hacking and cybersecurity.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}