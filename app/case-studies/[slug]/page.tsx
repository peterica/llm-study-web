import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/case-studies";
import { getCaseStudyBySlug } from "@/lib/content";
import CaseStudyShell from "@/components/case-study/CaseStudyShell";
import MdxContent from "@/components/topic/MdxContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return { title: "Not Found" };

  return {
    title: `${cs.title} — LLM System Lab`,
    description: cs.description,
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  const content = getCaseStudyBySlug(slug);

  return (
    <main className="flex-1 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <CaseStudyShell caseStudy={cs}>
          {content ? (
            <MdxContent source={content.content} />
          ) : (
            <div className="rounded-lg border border-divider bg-surface p-8 text-center text-content-muted">
              <p>이 사례 연구의 콘텐츠가 준비 중입니다.</p>
            </div>
          )}
        </CaseStudyShell>
      </div>
    </main>
  );
}
