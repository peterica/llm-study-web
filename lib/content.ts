import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "content");

export interface TopicFrontmatter {
  id: string;
  title: string;
  slug: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  readingTime?: string;
  prerequisites: string[];
  relatedLabs: string[];
  nextTopics: string[];
  draft?: boolean;
}

export interface LabFrontmatter {
  id: string;
  title: string;
  slug: string;
  relatedTopics: string[];
  difficulty?: string;
  estimatedTime?: string;
  draft?: boolean;
}

export interface CaseStudyFrontmatter {
  id: string;
  title: string;
  slug: string;
  draft?: boolean;
}

export interface ContentItem<T> {
  frontmatter: T;
  content: string;
  readingTime: string;
  slug: string;
}

function getFilesInDirectory(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs
    .readdirSync(fullPath)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

function readContentFile<T>(dir: string, filename: string): ContentItem<T> {
  const filePath = path.join(contentDirectory, dir, filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    frontmatter: data as T,
    content,
    readingTime: stats.text,
    slug: data.slug || filename.replace(/\.mdx?$/, ""),
  };
}

// Topics
export function getAllTopics(): ContentItem<TopicFrontmatter>[] {
  const files = getFilesInDirectory("topics");
  return files
    .map((file) => readContentFile<TopicFrontmatter>("topics", file))
    .filter((item) => !item.frontmatter.draft);
}

export function getTopicBySlug(
  slug: string
): ContentItem<TopicFrontmatter> | null {
  const files = getFilesInDirectory("topics");
  for (const file of files) {
    const item = readContentFile<TopicFrontmatter>("topics", file);
    if (item.slug === slug) return item;
  }
  return null;
}

export function getTopicSlugs(): string[] {
  return getAllTopics().map((topic) => topic.slug);
}

// Labs
export function getAllLabs(): ContentItem<LabFrontmatter>[] {
  const files = getFilesInDirectory("labs");
  return files
    .map((file) => readContentFile<LabFrontmatter>("labs", file))
    .filter((item) => !item.frontmatter.draft);
}

export function getLabBySlug(
  slug: string
): ContentItem<LabFrontmatter> | null {
  const files = getFilesInDirectory("labs");
  for (const file of files) {
    const item = readContentFile<LabFrontmatter>("labs", file);
    if (item.slug === slug) return item;
  }
  return null;
}

// Case Studies
export function getAllCaseStudies(): ContentItem<CaseStudyFrontmatter>[] {
  const files = getFilesInDirectory("case-studies");
  return files
    .map((file) => readContentFile<CaseStudyFrontmatter>("case-studies", file))
    .filter((item) => !item.frontmatter.draft);
}

export function getCaseStudyBySlug(
  slug: string
): ContentItem<CaseStudyFrontmatter> | null {
  const files = getFilesInDirectory("case-studies");
  for (const file of files) {
    const item = readContentFile<CaseStudyFrontmatter>("case-studies", file);
    if (item.slug === slug) return item;
  }
  return null;
}

// Categories / Tracks
export function getTopicsByCategory(): Record<
  string,
  ContentItem<TopicFrontmatter>[]
> {
  const topics = getAllTopics();
  const grouped: Record<string, ContentItem<TopicFrontmatter>[]> = {};
  for (const topic of topics) {
    const cat = topic.frontmatter.category;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(topic);
  }
  return grouped;
}
