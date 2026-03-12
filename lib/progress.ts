const STORAGE_KEY = "llm-lab-progress";

export interface ProgressData {
  completedTopics: string[];
  completedLabs: string[];
  lastVisited: string | null;
  updatedAt: string;
}

function getDefaultProgress(): ProgressData {
  return {
    completedTopics: [],
    completedLabs: [],
    lastVisited: null,
    updatedAt: new Date().toISOString(),
  };
}

export function getProgress(): ProgressData {
  if (typeof window === "undefined") return getDefaultProgress();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultProgress();
    return JSON.parse(stored) as ProgressData;
  } catch {
    return getDefaultProgress();
  }
}

function saveProgress(data: ProgressData): void {
  if (typeof window === "undefined") return;
  try {
    data.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable
  }
}

export function markTopicComplete(slug: string): void {
  const data = getProgress();
  if (!data.completedTopics.includes(slug)) {
    data.completedTopics.push(slug);
    saveProgress(data);
  }
}

export function markTopicIncomplete(slug: string): void {
  const data = getProgress();
  data.completedTopics = data.completedTopics.filter((s) => s !== slug);
  saveProgress(data);
}

export function markLabComplete(slug: string): void {
  const data = getProgress();
  if (!data.completedLabs.includes(slug)) {
    data.completedLabs.push(slug);
    saveProgress(data);
  }
}

export function markLabIncomplete(slug: string): void {
  const data = getProgress();
  data.completedLabs = data.completedLabs.filter((s) => s !== slug);
  saveProgress(data);
}

export function isTopicComplete(slug: string): boolean {
  return getProgress().completedTopics.includes(slug);
}

export function isLabComplete(slug: string): boolean {
  return getProgress().completedLabs.includes(slug);
}

export function setLastVisited(slug: string): void {
  const data = getProgress();
  data.lastVisited = slug;
  saveProgress(data);
}

export function resetProgress(): void {
  saveProgress(getDefaultProgress());
}
