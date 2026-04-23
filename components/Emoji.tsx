"use client";

import { Icon } from "@iconify/react";

export type EmojiName =
  | "smiling-face-with-heart-eyes"
  | "smiling-face-with-hearts"
  | "slightly-smiling-face"
  | "crying-face"
  | "loudly-crying-face"
  | "sparkles"
  | "strawberry"
  | "sparkling-heart"
  | "glowing-star"
  | "ribbon"
  | "camera-with-flash"
  | "love-letter"
  | "lollipop"
  | "tulip"
  | "teddy-bear"
  | "custard"
  | "link"
  | "face-with-peeking-eye"
  | "flushed-face"
  | "thinking-face"
  | "locked"
  | "eyes"
  | "shushing-face";

type Props = {
  name: EmojiName;
  size?: number;
  className?: string;
};

export default function Emoji({ name, size = 20, className = "" }: Props) {
  return (
    <Icon
      icon={`fluent-emoji:${name}`}
      width={size}
      height={size}
      className={`inline-block align-[-0.2em] ${className}`}
      aria-hidden="true"
    />
  );
}

