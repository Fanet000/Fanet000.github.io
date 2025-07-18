// components/Badge.tsx
export default function Badge({ label }: { label: string }) {
  return <span className="px-2 py-1 bg-yellow-300 rounded">{label}</span>;
}