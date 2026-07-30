import { Phone } from 'lucide-react';

export default function MobileCallBar() {
  return (
    <a
      href="tel:+18885551234"
      className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-[#FF6B35] text-white font-display font-extrabold text-base text-center py-4 flex items-center justify-center gap-2 shadow-[0_-8px_24px_rgba(15,23,42,0.15)]"
    >
      <Phone className="w-4 h-4" /> Call for instant quotes — <span className="dni-number">(888) 555-1234</span>
    </a>
  );
}