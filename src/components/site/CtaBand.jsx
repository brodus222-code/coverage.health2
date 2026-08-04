import { Phone } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function CtaBand() {
  return (
    <div className="bg-slate-900 rounded-3xl overflow-hidden grid md:grid-cols-[1fr_auto] items-stretch">
      <div className="p-8 md:p-12 flex flex-col justify-center">
        <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white mb-3">Prefer to talk it through?</h2>
        <p className="text-slate-300 mb-6">Licensed agents answer in under 30 seconds. Mon–Fri 8am–8pm ET.</p>
        <a
          href="tel:+18885551234"
          className="inline-flex items-center gap-2.5 bg-[#EAB308] hover:bg-[#CA8A04] text-white font-bold text-lg rounded-xl px-7 py-4 w-fit transition-all hover:shadow-lg hover:shadow-[#EAB308]/40"
        >
          <Phone className="w-5 h-5" /> <span className="dni-number">Call (888) 555-1234</span>
        </a>
      </div>
      <div className="hidden md:block w-[340px] lg:w-[420px]">
        <Image
          src="https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/756b69c16_generated_834d3318.png"
          alt="A licensed insurance agent smiling in a bright modern office, ready to help"
          className="w-full h-full min-h-[280px]"
        />
      </div>
    </div>
  );
}