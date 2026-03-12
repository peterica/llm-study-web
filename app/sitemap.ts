import type { MetadataRoute } from "next";
import { getTopicSlugs } from "@/lib/content";
import { labs } from "@/lib/labs";
import { caseStudies } from "@/lib/case-studies";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://llm-system-lab.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/learn`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/system-map`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/labs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/case-studies`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/glossary`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const topicPages: MetadataRoute.Sitemap = getTopicSlugs().map((slug) => ({
    url: `${siteUrl}/learn/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const labPages: MetadataRoute.Sitemap = labs.map((lab) => ({
    url: `${siteUrl}/labs/${lab.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${siteUrl}/case-studies/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...topicPages, ...labPages, ...caseStudyPages];
}
