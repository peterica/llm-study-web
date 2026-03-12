import { notFound } from "next/navigation";
import { labs } from "@/lib/labs";
import LabShell from "@/components/labs/LabShell";
import LabComponentLoader from "@/components/labs/LabComponentLoader";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return labs.map((lab) => ({ slug: lab.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const lab = labs.find((l) => l.slug === slug);
  if (!lab) return { title: "Not Found" };

  return {
    title: `${lab.title} — LLM System Lab`,
    description: lab.description,
  };
}

export default async function LabDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const lab = labs.find((l) => l.slug === slug);
  if (!lab) notFound();

  return (
    <main className="flex-1 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <LabShell lab={lab}>
          <LabComponentLoader slug={slug} />
        </LabShell>
      </div>
    </main>
  );
}
