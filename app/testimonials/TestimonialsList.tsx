"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetPublicTestimonials } from "../../features/testimonials/hooks/useGetPublicTestimonials";
import { SafeImage } from "../components/ui/SafeImage";

const PHOTO_FALLBACK = "/testimonial-images/Ellipse1.png";
const PAGE_SIZE = 6;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg leading-none ${star <= rating ? "text-[#F5B942]" : "text-gray-300"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 6, 7];
  }
  if (currentPage > totalPages - 4) {
    return Array.from({ length: 7 }, (_, index) => totalPages - 6 + index);
  }
  return Array.from({ length: 7 }, (_, index) => currentPage - 3 + index);
}

export default function TestimonialsList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page"));
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const { data: testimonials, meta, isLoading, isFetching } = useGetPublicTestimonials({
    page,
    limit: PAGE_SIZE,
    sortBy: "displayOrder",
    sortOrder: "asc",
  });

  const totalPages = Math.max(meta.totalPages, 1);

  useEffect(() => {
    if (!isLoading && page > totalPages) {
      router.replace(`${pathname}?page=${totalPages}`);
    }
  }, [isLoading, page, totalPages, pathname, router]);

  const goToPage = (nextPage: number) => {
    const safePage = Math.min(Math.max(nextPage, 1), totalPages);
    router.push(safePage === 1 ? pathname : `${pathname}?page=${safePage}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue pt-12 md:pt-20 xl:pt-28">
      <div className="text-center font-poppins">
        <div className="mb-2 flex items-center justify-center gap-2 uppercase font-bold leading-[20px] tracking-[1.5%] md:gap-8 md:text-2xl lg:text-3xl lg:leading-[69px] xl:text-5xl">
          <img
            src="/hori-line.svg"
            className="h-[9px] w-[85px] md:h-auto md:w-auto"
            alt=""
          />
          <h1 className="text-lg font-bold tracking-[1.5%] md:mb-2 md:text-[30px] md:leading-[35px] lg:text-[40px] lg:leading-[50px] 2xl:text-[50px] 2xl:leading-[69px]">
            <span className="text-customBlue1">Client </span>
            <span className="text-customDarkGray">Testimonials</span>
          </h1>
          <img
            src="/hori-line2.svg"
            className="h-[9px] w-[85px] md:h-auto md:w-auto"
            alt=""
          />
        </div>
        <p className="mx-auto mb-4 px-4 text-[16px] font-light leading-[25px] tracking-[2%] text-customDarkGray md:mb-[25px] md:w-[70%] md:px-0 md:text-[20px] md:leading-[32.78px] lg:text-[22px] xl:w-1/2 2xl:w-[43%]">
          Hear from the partners who trust CodeSyncs to build, scale, and ship their products.
        </p>
      </div>

      <div className="flex justify-center px-4 py-8 md:px-8 md:py-12">
        {isLoading && testimonials.length === 0 ? (
          <div className="grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <div key={index} className="h-64 animate-pulse rounded-2xl bg-white/70" />
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <p className="py-16 text-center text-customDarkGray/70">No testimonials yet.</p>
        ) : (
          <div className="w-full max-w-7xl">
            <div
              className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${
                isFetching ? "opacity-60" : ""
              }`}
            >
              {testimonials.map((item) => (
                <article
                  key={item.id}
                  className="flex h-full flex-col rounded-2xl border border-white/80 bg-white p-6 shadow-[0_8px_30px_rgba(4,57,106,0.08)]"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <img src="/testimonial-images/Asset1.png" alt="" className="h-6 w-8" />
                    <StarRating rating={item.rating} />
                  </div>
                  <p className="flex-1 font-poppins text-[15px] leading-7 text-customDarkGray/90 md:text-base">
                    {item.testimonial}
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                    <SafeImage
                      src={item.photo}
                      fallback={PHOTO_FALLBACK}
                      alt={item.clientName}
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-[#17BABA]/40"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-poppins font-semibold text-customBlue1">{item.clientName}</p>
                      <p className="truncate text-sm text-customDarkGray/70">
                        {item.designation}, {item.company}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {totalPages >= 1 && (
              <div className="mt-10 flex justify-center pb-8">
                <div className="flex items-center rounded-2xl border border-gray-200 bg-white p-2 shadow-lg">
                  <button
                    type="button"
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1 || isFetching}
                    aria-label="Previous page"
                    className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-30"
                  >
                    <svg className="h-5 w-5 text-customBlue1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  {getVisiblePages(page, totalPages).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => goToPage(pageNumber)}
                      disabled={isFetching}
                      className={`mx-1 h-10 w-10 rounded-full font-medium transition-all ${
                        page === pageNumber
                          ? "bg-customBlue1 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= totalPages || isFetching}
                    aria-label="Next page"
                    className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-30"
                  >
                    <svg className="h-5 w-5 text-customBlue1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
