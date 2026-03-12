const STORAGE_KEY = "llm-lab-bookmarks";

export interface Bookmark {
  slug: string;
  type: "topic" | "lab" | "case-study";
  title: string;
  addedAt: string;
}

function getBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as Bookmark[];
  } catch {
    return [];
  }
}

function saveBookmarks(bookmarks: Bookmark[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  } catch {
    // localStorage unavailable
  }
}

export function addBookmark(
  slug: string,
  type: Bookmark["type"],
  title: string
): void {
  const bookmarks = getBookmarks();
  if (!bookmarks.some((b) => b.slug === slug && b.type === type)) {
    bookmarks.push({ slug, type, title, addedAt: new Date().toISOString() });
    saveBookmarks(bookmarks);
  }
}

export function removeBookmark(slug: string, type: Bookmark["type"]): void {
  const bookmarks = getBookmarks().filter(
    (b) => !(b.slug === slug && b.type === type)
  );
  saveBookmarks(bookmarks);
}

export function isBookmarked(slug: string, type: Bookmark["type"]): boolean {
  return getBookmarks().some((b) => b.slug === slug && b.type === type);
}

export function getAllBookmarks(): Bookmark[] {
  return getBookmarks().sort(
    (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  );
}
