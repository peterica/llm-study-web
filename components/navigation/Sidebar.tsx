"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarSection {
  title: string;
  items: { label: string; href: string }[];
}

interface SidebarProps {
  sections: SidebarSection[];
}

export default function Sidebar({ sections }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[var(--sidebar-width)] shrink-0 overflow-y-auto border-r border-divider bg-surface-white p-4 lg:block">
      <nav className="space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-content-muted">
              {section.title}
            </h3>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                        isActive
                          ? "bg-brand/10 font-medium text-brand"
                          : "text-content-muted hover:bg-surface hover:text-content"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
