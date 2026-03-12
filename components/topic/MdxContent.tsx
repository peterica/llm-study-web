import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

interface MdxContentProps {
  source: string;
}

export default function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose max-w-none">
      <MDXRemote source={source} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
    </div>
  );
}
