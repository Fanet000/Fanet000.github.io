import React from "react";

export default function Logo() {
  // Example: Stylized "B" for "Bhuvan"
  return (
    <div className="flex items-center space-x-2">
      <svg width="40" height="40" viewBox="0 0 40 40" aria-label="Bhuvan Logo">
        <circle cx="20" cy="20" r="18" fill="#6C63FF" />
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          fontSize="22"
          fontWeight="bold"
          fill="#fff"
          fontFamily="Arial, sans-serif"
          dy=".3em"
        >
          B
        </text>
      </svg>
      <span className="font-bold text-xl text-[#6C63FF]">Bhuvan</span>
    </div>
  );
}