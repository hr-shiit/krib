// Simple module-level store for the latest execution payload
// Import setLatestExecutionPayload in the place where you produce the data
// and call it; import getLatestExecutionPayload wherever you need to read it.

let latestExecutionPayload = null;
export const executionStore = { latest: null };

export function setLatestExecutionPayload(payload) {
  latestExecutionPayload = payload;
  executionStore.latest = payload;
}

export function getLatestExecutionPayload() {
  return latestExecutionPayload;
}

// Optional: expose on window during development for quick access
if (typeof window !== "undefined") {
  Object.defineProperty(window, "latestExecutionPayload", {
    get() { return latestExecutionPayload; },
  });
}


