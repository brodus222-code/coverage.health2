const DOTS = ['bg-[#2E90FA]', 'bg-[#22B573]', 'bg-[#EAB308]', 'bg-[#A855F7]'];

export default function SocialProof() {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm px-5 py-3.5 max-w-md">
      <div className="flex -space-x-2 shrink-0">
        {DOTS.map((c, i) => (
          <span key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white`} />
        ))}
      </div>
      <div className="leading-tight">
        <p className="font-display font-extrabold text-slate-900 text-[15px]">500,000+</p>
        <p className="text-[12px] text-slate-500">individuals &amp; families assisted through our network</p>
      </div>
    </div>
  );
}