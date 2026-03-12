"use client";

import { useState, useEffect } from "react";
import {
  isBookmarked,
  addBookmark,
  removeBookmark,
  type Bookmark,
} from "@/lib/bookmarks";

interface BookmarkButtonProps {
  slug: string;
  type: Bookmark["type"];
  title: string;
}

export default function BookmarkButton({
  slug,
  type,
  title,
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setBookmarked(isBookmarked(slug, type));
  }, [slug, type]);

  if (!mounted) return null;

  const toggle = () => {
    if (bookmarked) {
      removeBookmark(slug, type);
      setBookmarked(false);
    } else {
      addBookmark(slug, type, title);
      setBookmarked(true);
    }
  };

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-content-muted transition-colors hover:text-content"
      aria-label={bookmarked ? "북마크 해제" : "북마크 추가"}
      title={bookmarked ? "북마크 해제" : "북마크 추가"}
    >
      {bookmarked ? (
        <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 2c-.386 0-.738.223-.896.553L7.382 6.07l-3.935.572a1 1 0 00-.554 1.706l2.847 2.774-.672 3.916a1 1 0 001.451 1.054L10 14.347l3.481 1.745a1 1 0 001.451-1.054l-.672-3.916 2.847-2.774a1 1 0 00-.554-1.706l-3.935-.572-1.722-3.517A1 1 0 0010 2z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      )}
      {bookmarked ? "북마크됨" : "북마크"}
    </button>
  );
}
