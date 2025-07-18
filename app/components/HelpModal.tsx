// components/HelpModal.tsx
export default function HelpModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <h2>How to Play</h2>
        <p>Instructions go here...</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}