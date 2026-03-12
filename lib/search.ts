import { tracks } from "./tracks";
import { labs } from "./labs";
import { caseStudies } from "./case-studies";
import { glossaryTerms } from "./glossary";

export interface SearchResult {
  title: string;
  description: string;
  href: string;
  type: "topic" | "lab" | "case-study" | "glossary";
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const track of tracks) {
    for (const topic of track.topics) {
      results.push({
        title: topic.title,
        description: `${track.title} · ${topic.difficulty}`,
        href: `/learn/${topic.slug}`,
        type: "topic",
      });
    }
  }

  for (const lab of labs) {
    results.push({
      title: lab.title,
      description: lab.description,
      href: `/labs/${lab.slug}`,
      type: "lab",
    });
  }

  for (const cs of caseStudies) {
    results.push({
      title: cs.title,
      description: cs.description,
      href: `/case-studies/${cs.slug}`,
      type: "case-study",
    });
  }

  for (const term of glossaryTerms) {
    results.push({
      title: term.term,
      description: term.definition,
      href: `/glossary`,
      type: "glossary",
    });
  }

  return results;
}

let cachedIndex: SearchResult[] | null = null;

export function search(query: string): SearchResult[] {
  if (!cachedIndex) cachedIndex = buildIndex();
  if (!query.trim()) return [];

  const q = query.toLowerCase();
  return cachedIndex
    .filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    )
    .slice(0, 10);
}
