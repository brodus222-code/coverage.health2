const STEPS = [
  { n: '1', title: 'Answer 5 questions', body: 'ZIP, household, age, income, and how to reach you. Takes about 60 seconds.' },
  { n: '2', title: 'An agent reviews it', body: 'A licensed agent licensed in your state pulls the plans you actually qualify for.' },
  { n: '3', title: 'You pick, we enroll', body: 'Compare real premiums and networks on the call, then enroll the same day if you like one.' },
];

export default function StepsB() {
  return (
    <section className="py-14 md:py-20">
      <div className="max-w-[1080px] mx-auto px-4">
        <h2 className="font-heading font-extrabold text-[#132A47] text-[27px] md:text-[34px] leading-tight tracking-tight text-center mb-10">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-[16px] bg-white border border-[#DCE6F0] p-6">
              <span className="w-9 h-9 rounded-full bg-[#132A47] text-white font-heading font-extrabold grid place-items-center mb-4">{s.n}</span>
              <h3 className="font-heading font-bold text-[#132A47] text-[18px] mb-1.5">{s.title}</h3>
              <p className="text-[#4A6076] text-[15px] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}