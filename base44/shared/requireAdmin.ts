// Fail-closed admin check: any failure to resolve the caller is a 401, never a bypass.
export async function requireAdmin(base44) {
  const user = await base44.auth.me().catch(() => null);
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });
  return null;
}