const STEPS = [
  { title: 'Tell us about your household', body: "60 seconds online, or skip the form and call. We only ask what's needed to price plans accurately." },
  { title: 'Compare real prices', body: 'A licensed agent in your state pulls live rates — including any ACA subsidy you qualify for — and explains the tradeoffs in plain English.' },
  { title: "Enroll when you're ready", body: 'Same-day enrollment is available on most plans. No pressure, and our help costs you nothing — carriers pay us.' },
];

export default function HowItWorks() {
  return (
    <div className="grid md:grid-cols-3 gap-5 lg:gap-8">
      {STEPS.map((s, i) => (
        <div key={s.title} className="bg-white border border-slate-200 rounded-2xl p-7 lg:p-8">
          <div className="w-10 h-10 rounded-full bg-[#3b82f6] text-white font-display font-extrabold grid place-items-center mb-5">{i + 1}</div>
          <h3 className="font-display font-bold text-[17px] text-slate-900 mb-2">{s.title}</h3>
          <p className="text-[15px] text-slate-600">{s.body}</p>
        </div>
      ))}
    </div>
  );
}