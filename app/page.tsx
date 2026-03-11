export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        LLM System Lab
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl">
        LLM은 모델이 아니라 시스템이다.
        <br />
        Transformer부터 RAG, Inference, 운영까지 하나의 흐름으로 배운다.
      </p>
    </main>
  );
}
