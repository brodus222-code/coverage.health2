import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const BLOG_BASE_URL = 'https://coverage.health/blog';
const COVERAGE_HEALTH_PAGE_ID = '1183580071498823';

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    // Service-role call from the workflow must be authenticated.
    const isAuthed = await base44.auth.isAuthenticated();
    if (!isAuthed) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      const currentUser = await base44.auth.me();
      if (currentUser.role !== 'admin') {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
    } catch {
      // Service-role call from the workflow — isAuthenticated() passed.
    }

    const body = await req.json();
    const articleId = typeof body.article_id === 'string' ? body.article_id.trim() : '';
    if (!articleId) {
      return Response.json({ error: 'article_id required' }, { status: 400 });
    }

    const article = await base44.asServiceRole.entities.BlogArticle.get(articleId);
    if (!article) {
      return Response.json({ error: 'Article not found' }, { status: 404 });
    }
    if (article.posted_to_facebook) {
      return Response.json({ success: true, already_posted: true, facebook_post_id: article.facebook_post_id });
    }

    // Get the builder's connected Facebook Pages access token.
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('facebook_pages');
    if (!accessToken) {
      return Response.json({ error: 'Facebook Pages connector not authorized' }, { status: 500 });
    }

    // Fetch the Coverage.Health Page directly by ID — it is granted to the app
    // but does not appear in /me/accounts, so look it up explicitly.
    const pageRes = await fetch(`https://graph.facebook.com/v25.0/${COVERAGE_HEALTH_PAGE_ID}?fields=id,name,access_token`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    const page: any = await pageRes.json();
    if (!pageRes.ok || !page.access_token) {
      return Response.json({ error: `Facebook page error: ${JSON.stringify(page)}` }, { status: 502 });
    }

    const blogUrl = `${BLOG_BASE_URL}/${article.slug}`;
    const message = `${article.title}\n\n${article.excerpt || ''}\n\nRead the full article: ${blogUrl}`;

    // Publish a link post to the Page feed using the Page access token.
    const postRes = await fetch(`https://graph.facebook.com/v25.0/${page.id}/feed`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${page.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, link: blogUrl })
    });
    const postData: any = await postRes.json();
    if (!postRes.ok) {
      return Response.json({ error: `Facebook post error: ${JSON.stringify(postData)}` }, { status: 502 });
    }

    // Mark the article as posted so we never double-post.
    await base44.asServiceRole.entities.BlogArticle.update(articleId, {
      posted_to_facebook: true,
      facebook_post_id: String(postData.id || '')
    });

    return Response.json({ success: true, facebook_post_id: postData.id, page_name: page.name });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}