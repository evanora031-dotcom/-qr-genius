const base = (process.env.BASE_URL || 'https://getqrgenius.com').replace(/\/$/, '');
const pages = [
  ['/', ['SoftwareApplication']],
  ['/ar/', ['SoftwareApplication']],
  ['/fr/', ['SoftwareApplication']],
  ['/es/', ['SoftwareApplication']],
  ['/tools/wifi', ['BreadcrumbList', 'FAQPage']],
  ['/tools/whatsapp', ['BreadcrumbList', 'FAQPage']],
  ['/tools/business-vcard', ['BreadcrumbList', 'FAQPage']],
  ['/ar/tools/wifi', ['BreadcrumbList']],
  ['/en/blog/how-to-make-business-card-qr-code.html', ['Article']],
  ['/en/blog/how-to-make-wifi-qr-code-for-guests.html', ['Article']],
  ['/en/blog/how-to-create-whatsapp-qr-code-for-customers.html', ['Article']],
  ['/blog/business-card-qr-code-guide', ['Article']],
];
let failures = 0;
for (const [route, expected] of pages) {
  try {
    const response = await fetch(base + route, { headers: { Accept: 'text/html' } });
    if (!response.ok()) throw Error('HTTP ' + response.status);
    const html = await response.text();
    const scripts = [...html.matchAll(new RegExp('<script[^>]*type=[^>]*application.ld.json[^>]*>([^]*?)</script>', 'gi'))];
    const objects = scripts.flatMap((match) => {
      const parsed = JSON.parse(match[1]);
      return Array.isArray(parsed) ? parsed : [parsed];
    });
    const types = objects.flatMap((obj) => Array.isArray(obj['@type']) ? obj['@type'] : [obj['@type']]);
    for (const type of expected) if (!types.includes(type)) throw Error('missing ' + type + '; found: ' + types.join(', '));
    for (const obj of objects) if (obj['@context'] !== 'https://schema.org') throw Error('invalid @context');
    if (types.includes('WebApplication')) throw Error('obsolete WebApplication schema');
    if (route.startsWith('/ar/') && types.includes('FAQPage')) throw Error('unverified Arabic FAQPage');
    console.log(JSON.stringify({ route, http: response.status, types }));
  } catch (error) {
    failures++;
    console.error(JSON.stringify({ route, error: String(error) }));
  }
}
if (failures) throw Error(failures + ' production pages failed structured-data validation');
