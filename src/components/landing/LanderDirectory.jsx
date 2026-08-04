import { Link } from 'react-router-dom';
import { STATES, CATEGORIES } from '@/data/landerContent';

export default function LanderDirectory() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display font-extrabold text-slate-900 text-xl tracking-tight mb-4">Browse by state</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(STATES).map(([slug, s]) => (
              <Link key={slug} to={`/health-insurance/${slug}`} className="rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-[13.5px] font-semibold text-slate-700 hover:border-[#EAB308] hover:text-slate-900 transition-colors">
                {s.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display font-extrabold text-slate-900 text-xl tracking-tight mb-4">Browse by situation</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORIES).map(([slug, c]) => (
              <Link key={slug} to={`/coverage/${slug}`} className="rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-[13.5px] font-semibold text-slate-700 hover:border-[#EAB308] hover:text-slate-900 transition-colors">
                {c.eyebrow}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}