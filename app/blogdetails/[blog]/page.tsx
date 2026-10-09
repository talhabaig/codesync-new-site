"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetPublicBlogBySlug } from "../../../features/blogs/hooks/useGetPublicBlogBySlug";
import { useGetPublicBlogs } from "../../../features/blogs/hooks/useGetPublicBlogs";
import { SafeImage } from "../../components/ui/SafeImage";
import { BlogComments } from "../BlogComments";

interface Props {
  params: {
    blog: string;
  };
}

const COVER_FALLBACK = "/icon.png";

function formatDate(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function BlogDetailPage({ params }: Props) {
  const router = useRouter();
  const slug = params.blog;
  const { data: blog, isLoading, error } = useGetPublicBlogBySlug(slug);
  const { data: publicBlogs } = useGetPublicBlogs({
    getAll: true,
    sortBy: "displayOrder",
    sortOrder: "asc",
  });

  const relatedHref = (id: string, relatedSlug?: string) => {
    if (relatedSlug) return `/blogdetails/${relatedSlug}`;
    const match = publicBlogs.find((item) => item.id === id);
    return match ? `/blogdetails/${match.slug}` : "/blog";
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-customBlue1" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-customLightBlue to-customVeryLightBlue px-6">
        <p className="text-center text-lg text-customDarkGray/80">This blog could not be found.</p>
        <Link href="/blog" className="mt-4 font-medium text-customBlue1 hover:underline">
          Back to blogs
        </Link>
      </div>
    );
  }

  const related = blog.relatedBlogs ?? [];

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="relative h-[240px] w-full overflow-hidden md:h-[320px] lg:h-[380px]">
        <SafeImage
          src={blog.coverImage}
          fallback={COVER_FALLBACK}
          alt={blog.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#083553]/70" />
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-4 top-4 z-10 rounded-lg bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-md hover:bg-white/30 md:left-6 md:top-5 md:px-4 md:py-2 md:text-base"
        >
          ← Back
        </button>
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8 pt-16 md:px-16 md:pb-12">
          {blog.tags[0] ? (
            <span className="mb-3 w-fit rounded-full bg-customBlue1 px-3 py-1 text-xs font-medium text-white">
              {blog.tags[0]}
            </span>
          ) : null}
          <h1 className="max-w-4xl font-poppins text-2xl font-bold text-white md:text-4xl lg:text-5xl">
            {blog.title}
          </h1>
          <p className="mt-3 text-sm text-white/85 md:text-base">
            {blog.author || "CodeSyncs"}
            {blog.publishedAt ? ` · ${formatDate(blog.publishedAt)}` : ""}
            {` · ${blog.readTime || 1} min read`}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10 md:px-8 md:py-14">
        {blog.excerpt ? (
          <p className="mb-8 text-lg leading-relaxed text-customDarkGray/80 md:text-xl">{blog.excerpt}</p>
        ) : null}
        <div
          className="prose prose-lg max-w-none text-customDarkGray [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:font-semibold [&_img]:my-4 [&_img]:rounded-xl [&_li]:mb-1 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        {blog.tags.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white px-3 py-1 text-sm text-customBlue1 shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <BlogComments slug={blog.slug} />

      {related.length > 0 ? (
        <div className="mx-auto max-w-6xl px-6 pb-16 md:px-8">
          <h2 className="mb-6 font-poppins text-2xl font-bold text-customDarkGray">Related posts</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={relatedHref(item.id, item.slug)}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-44 overflow-hidden">
                  <SafeImage
                    src={item.coverImage}
                    fallback={COVER_FALLBACK}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 line-clamp-2 font-semibold text-customDarkGray group-hover:text-customBlue1">
                    {item.title}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-sm text-gray-600">{item.excerpt}</p>
                  <p className="text-xs font-medium text-gray-500">{item.author || "CodeSyncs"}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
