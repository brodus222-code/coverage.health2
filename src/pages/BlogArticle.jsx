import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import TopBar from '@/components/site/TopBar';
import SiteFooter from '@/components/site/SiteFooter';
import MobileCallBar from '@/components/site/MobileCallBar';
import ReactMarkdown from 'react-markdown';
import { Calendar, Clock, ArrowLeft, Loader2 } from 'lucide-react';

export default function BlogArticle() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setArticle(null);
    setNotFound(false);
    base44.entities.BlogArticle.filter({ slug })
      .then((res) => {
        if (res && res.length > 0) setArticle(res[0]);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true));
  }, [slug]);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="max-w-3xl mx-auto px-5 pt-28 pb-20">
        {notFound ? (
          <div className="text-center py-20">
            <h1 className="font-heading font-bold text-2xl text-slate-900 mb-3">Article not found</h1>
            <Link to="/blog" className="text-[#CA8A04] font-semibold underline">Back to blog</Link>
          </div>
        ) : !article ? (
          <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
        ) : (
          <article>
            <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-900 mb-6"><ArrowLeft className="w-4 h-4" /> All articles</Link>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 mb-3">
              {article.category && <span className="text-[#CA8A04]">{article.category}</span>}
              {article.published_date && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{article.published_date}</span>}
              {article.reading_time_minutes && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.reading_time_minutes} min read</span>}
            </div>
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900 mb-4 leading-tight">{article.title}</h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">{article.excerpt}</p>
            <div className="blog-content">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
            {article.keywords && (
              <div className="mt-10 pt-6 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-400 mb-2">Topics</p>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.split(',').map((k) => k.trim()).filter(Boolean).map((k) => (
                    <span key={k} className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
            )}
          </article>
        )}
      </main>
      <SiteFooter />
      <MobileCallBar />
    </div>
  );
}