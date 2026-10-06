export default function KitCard({ title, badge, children }) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-8">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="font-display font-bold text-xl text-slate-900">{title}</h2>
        {badge && <span className="text-[11px] font-bold uppercase tracking-wider bg-[#e8f4fd] text-[#2563eb] rounded-full px-2.5 py-0.5">{badge}</span>}
      </div>
      <div className="text-[15px] text-slate-600 space-y-4 [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:text-base [&_b]:text-slate-900 [&_th]:text-left [&_th]:font-semibold [&_th]:text-slate-900 [&_th]:bg-slate-50 [&_th]:border [&_th]:border-slate-200 [&_th]:px-3 [&_th]:py-2 [&_td]:border [&_td]:border-slate-200 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm">
        {children}
      </div>
    </section>
  );
}