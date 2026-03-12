import Link from "next/link";

export interface ContextItem {
  label: string;
  href: string;
}

export interface ContextSection {
  title: string;
  items: ContextItem[];
}

interface ContextPanelProps {
  sections: ContextSection[];
}

export default function ContextPanel({ sections }: ContextPanelProps) {
  return (
    <aside className="hidden w-[var(--context-panel-width)] shrink-0 overflow-y-auto border-l border-divider bg-surface-white p-4 xl:block">
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-content-muted">
              {section.title}
            </h4>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-content-muted hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
