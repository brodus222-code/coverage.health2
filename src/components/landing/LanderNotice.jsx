import { AlertTriangle } from 'lucide-react';

export default function LanderNotice({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 pt-10">
      <div className="flex gap-3 items-start rounded-2xl border border-amber-300 bg-amber-50 p-5">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-[14px] text-amber-900 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}