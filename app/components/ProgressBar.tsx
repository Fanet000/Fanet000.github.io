// components/ProgressBar.tsx
export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-gray-300 h-4 rounded">
      <div className="bg-[#6C63FF] h-4 rounded" style={{ width: `${progress}%` }} />
    </div>
  );
}