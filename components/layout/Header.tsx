"use client";

import Link from "next/link";
import { useState } from "react";
import SearchDialog from "@/components/search/SearchDialog";
import ThemeToggle from "@/components/layout/ThemeToggle";

const navItems = [
  { label: "Learn", href: "/learn" },
  { label: "System Map", href: "/system-map" },
  { label: "Labs", href: "/labs" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Glossary", href: "/glossary" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-[var(--header-height)] border-b border-divider bg-surface-white">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-brand">LLM System Lab</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-content-muted transition-colors hover:bg-surface hover:text-content"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Search + Theme */}
        <div className="flex items-center gap-1">
          <SearchDialog />
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-md p-2 text-content-muted md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="border-b border-divider bg-surface-white px-4 py-2 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-medium text-content-muted hover:bg-surface hover:text-content"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
