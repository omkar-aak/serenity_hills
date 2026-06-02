const cmsKey = "serenity-home-cms";

export function readHomeCms() {
  if (typeof window === "undefined") return { videos: [], faqs: [], properties: [], responses: [] };
  try {
    return JSON.parse(window.localStorage.getItem(cmsKey)) || { videos: [], faqs: [], properties: [], responses: [] };
  } catch {
    return { videos: [], faqs: [], properties: [], responses: [] };
  }
}

export function writeHomeCms(next) {
  window.localStorage.setItem(cmsKey, JSON.stringify(next));
}
