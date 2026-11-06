type AnalyticsEvent = 'qr_code_downloaded' | 'qr_code_saved' | 'tool_share_clicked';

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, string | number | boolean>) => void;
    };
  }
}

/**
 * Privacy-first analytics: event properties are deliberately limited to
 * feature identifiers and export formats. Never pass QR payloads, form values,
 * contact details, Wi-Fi credentials, filenames, or generated content.
 */
export function trackEvent(
  event: AnalyticsEvent,
  properties: Record<string, string | number | boolean> = {}
): void {
  if (typeof window === 'undefined') return;
  window.posthog?.capture(event, properties);
}

export function trackPageView(path: string): void {
  if (typeof window === 'undefined') return;
  window.posthog?.capture('$pageview', { $current_url: window.location.origin + path });
}
