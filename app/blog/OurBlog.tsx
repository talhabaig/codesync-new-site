"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetPublicBlogs } from "../../features/blogs/hooks/useGetPublicBlogs";
import { SafeImage } from "../components/ui/SafeImage";

const PAGE_SIZE = 6;
const COVER_FALLBACK = "/icon.png";

function formatDate(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getVisiblePages(currentPage: number, totalPages: number) {
  const pageNumbers: number[] = [];
  if (totalPages <= 8) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else if (currentPage <= 4) {
    for (let i = 1; i <= 8; i++) pageNumbers.push(i);
  } else if (currentPage > totalPages - 4) {
    for (let i = totalPages - 7; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    for (let i = currentPage - 3; i <= currentPage + 4; i++) pageNumbers.push(i);
  }
  return pageNumbers;
}

function BlogGrid() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page"));
  const currentPage = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const { data: blogs, meta, isLoading, isFetching } = useGetPublicBlogs({
    page: currentPage,
    limit: PAGE_SIZE,
    sortBy: "displayOrder",
    sortOrder: "asc",
  });

  const totalPages = Math.max(meta.totalPages, 1);

  useEffect(() => {
    if (!isLoading && currentPage > totalPages) {
      router.replace(totalPages === 1 ? pathname : `${pathname}?page=${totalPages}`);
    }
  }, [isLoading, currentPage, totalPages, pathname, router]);

  const handlePageChange = (page: number) => {
    const next = Math.min(Math.max(page, 1), totalPages);
    router.push(next === 1 ? pathname : `${pathname}?page=${next}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue pt-16 md:pt-24 xl:pt-28">
      <div className="relative overflow-hidden py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-customBlue1/10 to-customLightBlue/10" />
        <div className="relative z-10 px-6 text-center font-poppins">
          <div className="mb-4 flex items-center justify-center gap-4 text-2xl font-bold uppercase md:gap-6 md:text-4xl xl:text-5xl">
            <div className="hidden h-1 w-16 rounded-full bg-gradient-to-r from-customBlue1 to-customLightBlue md:block md:w-24" />
            <h2 className="font-bold">
              <span className="text-customBlue1">Our </span> 
              <span className="text-customDarkGray">Blogs</span>
            </h2>
            <div className="hidden h-1 w-16 rounded-full bg-gradient-to-r from-customLightBlue to-customBlue1 md:block md:w-24" />
          </div>
          <p className="mx-auto mb-6 text-[15px] font-light text-customDarkGray/80 md:w-[70%] md:text-[20px] lg:text-[22px] xl:w-1/2">
            Explore our blog for the latest trends and strategies to keep you ahead in the
            industry.
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-16 rounded-full bg-customBlue1" />
          </div>
        </div>
      </div>

      <div className={`flex justify-center px-4 py-8 md:px-8 md:py-12 ${isFetching ? "opacity-80" : ""}`}>
        {isLoading && blogs.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-customBlue1" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
            <h3 className="mb-3 text-2xl font-bold text-customDarkGray">No Blogs Yet</h3>
            <p className="max-w-md text-gray-600">
              We&apos;re working on creating amazing content for you. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid w-full max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <Link href={`/blogdetails/${blog.slug}`}>
                  <div className="relative h-[220px] w-full overflow-hidden lg:h-60">
                    <SafeImage
                      src={blog.coverImage}
                      fallback={COVER_FALLBACK}
                      alt={blog.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    {blog.tags[0] ? (
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-customBlue1 px-3 py-1 text-xs font-medium text-white">
                          {blog.tags[0]}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center text-sm text-gray-500">
                      <span>{formatDate(blog.publishedAt)}</span>
                      <span className="mx-2">•</span>
                      <span>{blog.readTime || 1} min read</span>
                    </div>
                    <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-tight text-customDarkGray transition-colors duration-300 group-hover:text-customBlue1 lg:text-[22px]">
                      {blog.title}
                    </h3>
                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                      <span className="text-sm font-medium text-gray-600">
                        {blog.author || "CodeSyncs"}
                      </span>
                      <span className="flex items-center text-sm font-medium text-customBlue1 transition-transform duration-300 group-hover:translate-x-1">
                        Read More
                        <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isLoading && blogs.length > 0 && totalPages >= 1 ? (
        <div className="mt-6 flex justify-center pb-16">
          <div className="flex items-center rounded-2xl border border-gray-200 bg-white p-2 shadow-lg">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isFetching}
              className="flex h-10 w-10 items-center justify-center rounded-full p-2 hover:bg-gray-100 disabled:opacity-30"
            >
              <svg className="h-5 w-5 text-customBlue1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {getVisiblePages(currentPage, totalPages).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                className={`mx-1 h-10 w-10 rounded-full font-medium transition-all ${
                  currentPage === page
                    ? "bg-customBlue1 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isFetching}
              className="flex h-10 w-10 items-center justify-center rounded-full p-2 hover:bg-gray-100 disabled:opacity-30"
            >
              <svg className="h-5 w-5 text-customBlue1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="pb-16" />
      )}
    </div>
  );
}

export default function OurBlog() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-customBlue1" />
        </div>
      }
    >
      <BlogGrid />
    </Suspense>
  );
}
