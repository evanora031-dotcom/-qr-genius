interface PagesMiddlewareContext {
  request: Request;
  next: () => Promise<Response>;
}

/**
 * Keep one public hostname for indexing.
 * - Redirect the default Pages hostname and www to the canonical apex domain.
 * - Mark unique Pages deployment/preview hosts as non-indexable.
 */
export const onRequest = async ({
  request,
  next,
}: PagesMiddlewareContext): Promise<Response> => {
  const url = new URL(request.url);
  const hostname = url.hostname.toLowerCase();

  if (hostname === 'www.getqrgenius.com' || hostname === 'qr-genius-1on.pages.dev') {
    url.protocol = 'https:';
    url.hostname = 'getqrgenius.com';
    url.port = '';
    return Response.redirect(url.toString(), 308);
  }

  // Reject a bogus localized robots route instead of serving the SPA homepage.
  // The real crawler directives live at /robots.txt.
  if (/^\/(?:ar|en|fr|es)\/robots\/?$/.test(url.pathname)) {
    return new Response('Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
    });
  }

  // Consolidate the legacy .html business-card article URL onto its declared canonical URL.
  if (url.pathname === '/en/blog/how-to-make-business-card-qr-code.html') {
    url.pathname = '/en/blog/how-to-make-business-card-qr-code';
    return Response.redirect(url.toString(), 308);
  }

  // Consolidate the WhatsApp article's .html URL onto its declared canonical path.
  if (url.pathname === '/en/blog/how-to-create-whatsapp-qr-code-for-customers.html') {
    url.pathname = '/en/blog/how-to-create-whatsapp-qr-code-for-customers';
    return Response.redirect(url.toString(), 308);
  }

  const response = await next();

  if (hostname.endsWith('.pages.dev')) {
    const headers = new Headers(response.headers);
    headers.set('X-Robots-Tag', 'noindex, nofollow');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return response;
};
