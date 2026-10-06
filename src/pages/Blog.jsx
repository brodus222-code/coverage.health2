import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import TopBar from '@/components/site/TopBar';
import SiteFooter from '@/components/site/SiteFooter';
import MobileCallBar from '@/components/site/MobileCallBar';
import { Calendar, Clock, ArrowRight, Loader2 } from 'lucide-react';

export default function Blog() {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    base44.entities.BlogArticle.list('-published_date', 50)
      .then(setArticles)
      .catch(() => setArticles([]));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="max-w-3xl mx-auto px-5 pt-28 pb-20">
        <header className="mb-10">
          <h1 className="font-heading font-extrabold text-4xl text-slate-900 mb-3">Coverage.Health Blog</h1>
          <p className="text-slate-600 text-lg">Expert guides on health insurance — plan types, savings, enrollment, and more.</p>
        </header>

        {articles === null ? (
          <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
        ) : articles.length === 0 ? (
          <p className="text-slate-500 text-center py-20">No articles yet — check back soon.</p>
        ) : (
          <div className="space-y-6">
            {articles.map((a) => (
              <Link key={a.id} to={`/blog/${a.slug}`} className="block group">
                <article className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow bg-white">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 mb-2">
                    {a.category && <span className="text-[#2563eb]">{a.category}</span>}
                    {a.published_date && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{a.published_date}</span>}
                    {a.reading_time_minutes && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{a.reading_time_minutes} min</span>}
                  </div>
                  <h2 className="font-heading font-bold text-xl text-slate-900 mb-2 group-hover:text-[#2563eb] transition-colors">{a.title}</h2>
                  <p className="text-slate-600 text-[15px] leading-relaxed mb-3">{a.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-[#2563eb] font-semibold text-sm">Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></span>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
      <MobileCallBar />
    </div>
  );
}