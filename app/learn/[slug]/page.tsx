import { notFound } from "next/navigation";
import { getTopicBySlug, getTopicSlugs } from "@/lib/content";
import TopicHero from "@/components/topic/TopicHero";
import MdxContent from "@/components/topic/MdxContent";
import ProgressToggle from "@/components/topic/ProgressToggle";
import BookmarkButton from "@/components/navigation/BookmarkButton";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getTopicSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return { title: "Not Found" };

  return {
    title: `${topic.frontmatter.title} — LLM System Lab`,
    description: `${topic.frontmatter.category} · ${topic.frontmatter.difficulty}`,
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  return (
    <main className="flex-1 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <TopicHero
          title={topic.frontmatter.title}
          category={topic.frontmatter.category}
          difficulty={topic.frontmatter.difficulty}
          readingTime={topic.readingTime}
          prerequisites={topic.frontmatter.prerequisites}
        />

        <MdxContent source={topic.content} />

        {/* Progress Toggle + Bookmark */}
        <div className="mt-8 flex items-center justify-end gap-2">
          <BookmarkButton slug={slug} type="topic" title={topic.frontmatter.title} />
          <ProgressToggle slug={slug} />
        </div>

        {/* Next Topics */}
        {topic.frontmatter.nextTopics.length > 0 && (
          <div className="mt-12 rounded-lg border border-divider bg-surface p-6">
            <h3 className="text-lg font-semibold text-content">
              다음 학습 주제
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {topic.frontmatter.nextTopics.map((nextSlug) => (
                <Link
                  key={nextSlug}
                  href={`/learn/${nextSlug}`}
                  className="rounded-md bg-brand/10 px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand/20"
                >
                  {nextSlug}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Labs */}
        {topic.frontmatter.relatedLabs.length > 0 && (
          <div className="mt-6 rounded-lg border border-divider bg-surface p-6">
            <h3 className="text-lg font-semibold text-content">
              관련 실험실
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {topic.frontmatter.relatedLabs.map((labSlug) => (
                <Link
                  key={labSlug}
                  href={`/labs/${labSlug}`}
                  className="rounded-md bg-highlight/10 px-4 py-2 text-sm font-medium text-highlight transition-colors hover:bg-highlight/20"
                >
                  {labSlug}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
