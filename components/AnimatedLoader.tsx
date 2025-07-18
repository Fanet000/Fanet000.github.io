// components/AnimatedLoader.tsx
import React from "react";
export default function AnimatedLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#6C63FF]" />
    </div>
  );
}