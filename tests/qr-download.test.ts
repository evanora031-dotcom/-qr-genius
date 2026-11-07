import assert from 'node:assert/strict';
import { test } from 'node:test';
import { downloadCanvasPNG } from '../src/utils/qrRenderer';

test('PNG exports use a blob download and release the URL after browser consumption', async (t) => {
  const blob = new Blob(['png'], { type: 'image/png' });
  const events: string[] = [];
  const anchor = { href: '', download: '', click() { events.push('click'); }, remove() { events.push('remove'); } };
  const oldDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
  Object.defineProperty(globalThis, 'document', { configurable: true, value: {
    createElement: () => anchor, body: { appendChild: () => events.push('append') }
  }});
  t.after(() => { if (oldDocument) Object.defineProperty(globalThis, 'document', oldDocument); else delete (globalThis as any).document; });
  t.mock.method(URL, 'createObjectURL', (value: Blob) => { assert.equal(value, blob); return 'blob:png-test'; });
  t.mock.method(URL, 'revokeObjectURL', (url: string) => { assert.equal(url, 'blob:png-test'); events.push('revoke'); });
  let cleanup: () => void;
  t.mock.method(globalThis, 'setTimeout', (fn: () => void, delay: number) => { assert.equal(delay, 60_000); cleanup = fn; return 0 as any; });
  const canvas = { toBlob(cb: BlobCallback, type: string) { assert.equal(type, 'image/png'); queueMicrotask(() => cb(blob)); } } as HTMLCanvasElement;
  await downloadCanvasPNG(canvas, 'test.png');
  assert.equal(anchor.href, 'blob:png-test');
  assert.equal(anchor.download, 'test.png');
  assert.deepEqual(events, ['append', 'click', 'remove']);
  cleanup!();
  assert.deepEqual(events, ['append', 'click', 'remove', 'revoke']);
});

test('PNG encoding failures reject so callers can show their export error', async () => {
  const empty = { toBlob(cb: BlobCallback) { cb(null); } } as HTMLCanvasElement;
  await assert.rejects(downloadCanvasPNG(empty), /canvas returned no image/);
  const tainted = { toBlob() { throw new Error('SecurityError'); } } as unknown as HTMLCanvasElement;
  await assert.rejects(downloadCanvasPNG(tainted), /SecurityError/);
});
