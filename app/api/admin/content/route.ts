import { getWorkspace } from '@/lib/admin/content';
import { isAdmin } from '@/lib/admin/session';

export async function GET(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const workspace = await getWorkspace();
  const requestedDraft = new URL(request.url).searchParams.get('version') === 'draft';
  return Response.json({
    schema: 'vespera-content/v1',
    mode: requestedDraft ? 'draft' : 'published',
    content: requestedDraft ? workspace.draft : workspace.published,
    capabilities: ['read-products', 'read-promotions', 'read-media', 'read-site-texts'],
    note: 'Read-only integration surface. Publishing remains an explicit human action in Vespera Admin.',
  });
}
