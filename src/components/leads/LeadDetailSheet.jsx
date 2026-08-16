import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { format } from 'date-fns';

function Row({ label, value }) {
  if (value === null || value === undefined || value === '') return null;
  return (
    <div className="flex gap-3 py-2 border-b border-slate-100 last:border-0">
      <span className="text-[12.5px] text-slate-500 w-[42%] shrink-0">{label}</span>
      <span className="text-[13px] text-slate-900 font-medium break-all">{String(value)}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="font-display font-bold text-[13px] uppercase tracking-[0.08em] text-slate-400 mb-1.5">{title}</h3>
      {children}
    </div>
  );
}

export default function LeadDetailSheet({ lead, onClose }) {
  return (
    <Sheet open={Boolean(lead)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        {lead && (
          <>
            <SheetHeader className="mb-5">
              <SheetTitle className="font-display text-xl">{lead.full_name || 'Unnamed lead'}</SheetTitle>
              <p className="text-[13px] text-slate-500">{format(new Date(lead.created_date), "EEEE, MMM d yyyy 'at' h:mm a")}</p>
            </SheetHeader>

            <Section title="Contact">
              <Row label="Phone" value={lead.phone} />
              <Row label="Email" value={lead.email} />
              <Row label="Status" value={lead.status} />
              <Row label="Texts opt-in" value={lead.text_updates_opt_in ? 'Yes' : 'No'} />
            </Section>

            <Section title="Quote answers">
              <Row label="ZIP" value={lead.zip} />
              <Row label="State" value={lead.state} />
              <Row label="Household" value={lead.household} />
              <Row label="Age" value={lead.age_range || lead.age} />
              <Row label="Income" value={lead.income} />
            </Section>

            <Section title="Attribution">
              <Row label="Channel" value={lead.channel || '(pre-tracking)'} />
              <Row label="Paid click" value={lead.is_paid ? 'Yes' : 'No'} />
              <Row label="Campaign" value={lead.utm_campaign} />
              <Row label="Keyword / term" value={lead.utm_term} />
              <Row label="Ad content" value={lead.utm_content} />
              <Row label="UTM source" value={lead.utm_source} />
              <Row label="UTM medium" value={lead.utm_medium} />
              <Row label="Microsoft click ID" value={lead.msclkid} />
              <Row label="Google click ID" value={lead.gclid} />
              <Row label="Meta click ID" value={lead.fbclid} />
              <Row label="Referrer" value={lead.referrer} />
              <Row label="First landing page" value={lead.first_landing_page} />
              <Row label="Submitted from" value={lead.landing_page} />
            </Section>

            <Section title="Session">
              <Row label="Variant" value={lead.variant} />
              <Row label="Device" value={lead.device} />
              <Row label="Time to convert" value={lead.time_to_convert_seconds ? `${Math.floor(lead.time_to_convert_seconds / 60)}m ${lead.time_to_convert_seconds % 60}s` : null} />
              <Row label="Session ID" value={lead.session_id} />
              <Row label="User agent" value={lead.user_agent} />
            </Section>

            <Section title="Compliance">
              <Row label="TCPA consent" value={lead.tcpa_consent ? 'Granted' : 'Not granted'} />
              <Row label="Consent timestamp" value={lead.tcpa_timestamp} />
            </Section>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}