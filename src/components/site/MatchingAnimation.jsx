import { motion } from 'framer-motion';
import { Search, Users, ShieldCheck } from 'lucide-react';

const STEPS = [
  { icon: Search, label: 'Saving your request…' },
  { icon: Users, label: 'Notifying our in-house licensed team…' },
  { icon: ShieldCheck, label: 'Preparing your next steps…' },
];

export default function MatchingAnimation({ state }) {
  return (
    <div className="text-center py-6">
      <div className="relative w-24 h-24 mx-auto mb-6">
        <motion.span
          className="absolute inset-0 rounded-full bg-[#3b82f6]/10"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#3b82f6] border-r-[#3b82f6]/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        />
        <span className="absolute inset-0 grid place-items-center">
          <Search className="w-8 h-8 text-[#3b82f6]" />
        </span>
      </div>
      <div className="space-y-2.5">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              className="flex items-center justify-center gap-2 text-[14px] font-semibold text-slate-700"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.45 }}
            >
              <Icon className="w-4 h-4 text-[#3b82f6]" />
              <span>{s.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}