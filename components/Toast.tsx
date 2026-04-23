"use client";

import { useEffect, useState } from "react";
import Emoji, { type EmojiName } from "@/components/Emoji";

export type ToastMsg = {
  id: number;
  text: string;
  emoji?: EmojiName;
};

let notify: ((t: Omit<ToastMsg, "id">) => void) | null = null;

export function showToast(text: string, emoji?: EmojiName) {
  notify?.({ text, emoji });
}

export default function ToastHost() {
  const [queue, setQueue] = useState<ToastMsg[]>([]);

  useEffect(() => {
    notify = (t) => {
      const id = Date.now() + Math.random();
      setQueue((q) => [...q, { ...t, id }]);
      setTimeout(() => {
        setQueue((q) => q.filter((m) => m.id !== id));
      }, 2400);
    };
    return () => {
      notify = null;
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex flex-col items-center gap-2 px-4">
      {queue.map((t) => (
        <div
          key={t.id}
          className="animate-toast-in pointer-events-auto inline-flex items-center gap-2 rounded-full bg-ink/95 px-4 py-2.5 text-[13px] font-bold text-cream shadow-poplg border-2 border-white/10"
        >
          {t.emoji && <Emoji name={t.emoji} size={18} />}
          {t.text}
        </div>
      ))}
    </div>
  );
}
