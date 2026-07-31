export default function LanderBenefits({ heading, items }) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="pulse-line w-full mb-12" />
        <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight mb-10">{heading}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(([title, body]) => (
            <div key={title} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.25)]">
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{title}</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}