// Start immediately before supplying test inputs. Asset downloads are expected
// when a renderer is loaded on demand. Treat any other HTTP traffic as evidence
// to inspect, without writing request bodies or user-supplied values to logs.
export function watchFileRequests(page) {
  const requests = [];
  const origin = new URL(page.url()).origin;
  const onRequest = request => {
    const url = new URL(request.url());
    if (!['https:', 'http:'].includes(url.protocol)) return;
    if (request.method() === 'GET' && url.origin === origin &&
        url.pathname.startsWith('/assets/') && !url.search) return;
    requests.push(request.method() + ' ' + url.origin + url.pathname);
  };
  page.on('request', onRequest);
  return () => {
    page.off('request', onRequest);
    if (requests.length) throw new Error('Unexpected transfer during file processing: ' + requests.join(', '));
    console.log('Network check passed: only local browser operations and static asset reads.');
  };
}
