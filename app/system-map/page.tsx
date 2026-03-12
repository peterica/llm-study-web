import SystemMapCanvas from "@/components/system-map/SystemMapCanvas";
import systemMapData from "@/data/system-map.json";

export const metadata = {
  title: "System Map — LLM System Lab",
  description: "LLM 시스템의 전체 아키텍처를 인터랙티브 그래프로 탐색합니다",
};

export default function SystemMapPage() {
  return (
    <main className="flex-1 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-content">
            LLM System Architecture
          </h1>
          <p className="mt-2 text-content-muted">
            각 노드를 클릭하면 관련 학습 자료와 실험으로 이동할 수 있습니다
          </p>
        </div>

        <div className="mt-8">
          <SystemMapCanvas
            initialNodes={systemMapData.nodes}
            initialEdges={systemMapData.edges}
          />
        </div>
      </div>
    </main>
  );
}
