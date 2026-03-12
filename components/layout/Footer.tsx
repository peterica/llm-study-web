import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-divider bg-surface-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-content">LLM System Lab</h3>
            <p className="mt-2 text-sm text-content-muted">
              LLM 시스템의 전체 흐름을 개념 학습, 시스템 맵, 인터랙티브
              실험으로 배우는 교육 플랫폼
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-content">학습</h4>
            <ul className="mt-2 space-y-1">
              {[
                { label: "Learn", href: "/learn" },
                { label: "System Map", href: "/system-map" },
                { label: "Labs", href: "/labs" },
                { label: "Case Studies", href: "/case-studies" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-content-muted hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-content">리소스</h4>
            <ul className="mt-2 space-y-1">
              <li>
                <Link
                  href="/glossary"
                  className="text-sm text-content-muted hover:text-brand"
                >
                  용어 사전
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-divider pt-4 text-center text-xs text-content-light">
          &copy; {new Date().getFullYear()} LLM System Lab
        </div>
      </div>
    </footer>
  );
}
