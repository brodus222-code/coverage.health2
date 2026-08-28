import { Link } from 'react-router-dom';

export default function AboutHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex h-11 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/" className="font-display text-base font-extrabold tracking-tight text-foreground">Coverage.Health</Link>
        <span className="hidden border-l border-border pl-3 text-[10px] font-medium text-muted-foreground min-[520px]:inline">Powered by HealthLink</span>
        <a href="tel:+18553955001" data-call-source="About Header" className="ml-auto text-sm font-semibold text-foreground">
          <span className="hidden sm:inline">Toll free: </span><span className="dni-number">(855) 395-5001</span>
        </a>
      </div>
    </header>
  );
}