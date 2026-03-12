import GlossaryList from "@/components/glossary/GlossaryList";

export const metadata = {
  title: "Glossary — LLM System Lab",
  description: "LLM 시스템에서 사용되는 핵심 용어를 검색하고 학습합니다",
};

export default function GlossaryPage() {
  return (
    <main className="flex-1 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-content">Glossary</h1>
          <p className="mt-2 text-content-muted">
            LLM 시스템에서 사용되는 핵심 용어를 검색하고 학습합니다
          </p>
        </div>

        <div className="mt-8">
          <GlossaryList />
        </div>
      </div>
    </main>
  );
}
