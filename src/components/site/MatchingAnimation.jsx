import { motion } from 'framer-motion';
import { Search, Users, ShieldCheck } from 'lucide-react';

const STEPS = [
  { icon: Search, label: 'Searching plans in your state…' },
  { icon: Users, label: 'Matching you with licensed agents…' },
  { icon: ShieldCheck, label: 'Preparing your quotes…' },
];

export default function MatchingAnimation({ state }) {
  return (
    <div className="text-center py-6">
      <div className="relative w-24 h-24 mx-auto mb-6">
        <motion.span
          className="absolute inset-0 rounded-full bg-[#EAB308]/10"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#EAB308] border-r-[#EAB308]/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        />
        <span className="absolute inset-0 grid place-items-center">
          <Search className="w-8 h-8 text-[#EAB308]" />
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
              <Icon className="w-4 h-4 text-[#EAB308]" />
              <span>{state ? s.label.replace('your state', state) : s.label.replace(' in your state', '')}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}