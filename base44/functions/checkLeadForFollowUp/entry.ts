import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    // Require platform-authenticated request (service-role from workflow).
    const isAuthed = await base44.auth.isAuthenticated();
    if (!isAuthed) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For user-authenticated calls, require admin role.
    // Service-role calls (from the workflow) have no user context —
    // isAuthenticated() is true but me() throws, which is expected.
    try {
      const currentUser = await base44.auth.me();
      if (currentUser.role !== 'admin') {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
    } catch {
      // Service-role call from the workflow — isAuthenticated() passed.
    }

    const body = await req.json();
    const leadId = typeof body.lead_id === 'string' ? body.lead_id.trim() : '';
    if (!leadId) {
      return Response.json({ error: 'lead_id is required' }, { status: 400 });
    }

    // Fetch the current lead state as service role (Lead read is admin-only).
    const lead = await base44.asServiceRole.entities.Lead.get(leadId);

    const status = lead.status || 'New';
    const hasPlan = !!lead.selected_plan;

    return Response.json({
      needs_followup: status === 'New' && !hasPlan,
      status,
      has_plan: hasPlan,
      email: lead.email || '',
      full_name: lead.full_name || '',
      phone: lead.phone || '',
      state: lead.state || '',
      zip: lead.zip || '',
      age: lead.age ?? null,
      age_range: lead.age_range || '',
      household: lead.household || '',
      income: lead.income || ''
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}