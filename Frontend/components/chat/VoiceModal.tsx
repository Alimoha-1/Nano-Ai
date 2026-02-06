'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStop: () => void;
}

export function VoiceModal({ isOpen, onClose, onStop }: VoiceModalProps) {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsListening(true);
    } else {
      setIsListening(false);
    }
  }, [isOpen]);

  const handleStop = () => {
    setIsListening(false);
    onStop();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-800/50">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Voice Assistant
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-8 space-y-8">
          <div className="relative">
            <div className="absolute inset-0 animate-ping">
              <div className="w-40 h-40 rounded-full bg-blue-500/20" />
            </div>

            <div className="relative">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: `wave ${1 + i * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  <div
                    className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 opacity-30"
                    style={{
                      width: `${80 + i * 30}px`,
                      height: `${80 + i * 30}px`,
                    }}
                  />
                </div>
              ))}

              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/50 z-10">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-white rounded-full mx-0.5"
                      style={{
                        height: isListening ? `${Math.random() * 24 + 8}px` : '8px',
                        animation: isListening ? `pulse ${0.5 + Math.random() * 0.5}s ease-in-out infinite` : 'none',
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {isListening ? 'Listening...' : 'Ready to listen'}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Speak clearly into your microphone
            </p>
          </div>

          <Button
            onClick={handleStop}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-red-500/30 transition-all hover:scale-105"
          >
            Stop Recording
          </Button>
        </div>

        <style jsx>{`
          @keyframes wave {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.3;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.2);
              opacity: 0.1;
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}