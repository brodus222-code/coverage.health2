const STATES = ['Florida', 'Texas', 'Georgia', 'California', 'Illinois', 'Ohio', 'North Carolina', 'Tennessee', 'New Jersey', 'South Carolina', 'Nevada', 'Arizona', 'Nebraska'];

export default function LicenseStrip() {
  return (
    <div className="bg-slate-900 text-slate-300 py-4">
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] text-center">
        <b className="text-white mr-1">Licensed &amp; serving:</b>
        {STATES.map((s, i) => (
          <span key={s} className="whitespace-nowrap">
            {s}{i < STATES.length - 1 && <span className="text-[#3b82f6] ml-2">·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}