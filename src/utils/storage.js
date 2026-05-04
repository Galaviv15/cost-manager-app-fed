// Lightweight helper for JSON local storage usage.
export function readJson(key, fallbackValue) {
  var raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallbackValue;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return fallbackValue;
  }
}

export function writeJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
