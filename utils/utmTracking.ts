export interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}

const UTM_KEYS: (keyof UtmParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

const STORAGE_KEY = "revive_utm_params";

const emptyUtms = (): UtmParams => ({
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
});

/**
 * Reads UTM parameters from the current URL and persists them in sessionStorage
 * so attribution survives client-side route changes within the session.
 */
export const captureUtmParams = (): UtmParams => {
  if (typeof window === "undefined") {
    return emptyUtms();
  }

  const searchParams = new URLSearchParams(window.location.search);
  const fromUrl = emptyUtms();
  let hasUrlUtm = false;

  for (const key of UTM_KEYS) {
    const value = searchParams.get(key)?.trim() || "";
    if (value) {
      fromUrl[key] = value;
      hasUrlUtm = true;
    }
  }

  if (hasUrlUtm) {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
    } catch {
      // Ignore storage errors (e.g. private browsing)
    }
    return fromUrl;
  }

  return getStoredUtmParams();
};

/**
 * Returns the latest UTM parameters from URL (if present) or sessionStorage.
 */
export const getStoredUtmParams = (): UtmParams => {
  if (typeof window === "undefined") {
    return emptyUtms();
  }

  // Check current URL first in case captureUtmParams hasn't run on this route yet
  const searchParams = new URLSearchParams(window.location.search);
  const fromUrl = emptyUtms();
  let hasUrlUtm = false;

  for (const key of UTM_KEYS) {
    const value = searchParams.get(key)?.trim() || "";
    if (value) {
      fromUrl[key] = value;
      hasUrlUtm = true;
    }
  }

  if (hasUrlUtm) {
    return fromUrl;
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyUtms();
    const parsed = JSON.parse(raw) as Partial<UtmParams>;
    return {
      utm_source: parsed.utm_source || "",
      utm_medium: parsed.utm_medium || "",
      utm_campaign: parsed.utm_campaign || "",
      utm_term: parsed.utm_term || "",
      utm_content: parsed.utm_content || "",
    };
  } catch {
    return emptyUtms();
  }
};

