"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useGetPublicJobs } from "../../features/jobs/hooks/useGetPublicJobs";
import { jobTypeLabel } from "../../features/jobs/types";

const PAGE_SIZE = 6;

function formatDate(value: string | null) {
  if (!value) return "Open";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Open";
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

function JobsList() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page"));
  const currentPage = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const { data: jobs, meta, isLoading, isFetching } = useGetPublicJobs({
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
    <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue pt-12 lg:pt-20">
      <div className="2xl:container 2xl:mx-auto">
        <div className="p-4 text-center font-poppins lg:px-12">
          <div className="mb-2 flex justify-center gap-2 text-lg font-bold leading-[20px] tracking-[1.5%] md:gap-8 md:text-2xl md:leading-[50px] lg:text-3xl xl:text-5xl lg:leading-[69px]">
            <div className="basis-[90%] text-[30px] font-bold leading-[40px] tracking-[1.5%] md:mb-2 md:basis-[85%] md:text-[40px] md:leading-[50px] 2xl:text-[50px] 2xl:leading-[69px]">
              <span className="text-customBlue1">Available </span>
              <span className="text-customDarkGray">Jobs</span>
            </div>
          </div>
        </div>
        <div className="p-4 md:p-8">
          {isLoading && jobs.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-customBlue1" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
              <h3 className="mb-3 text-2xl font-bold text-customDarkGray">No openings right now</h3>
              <p className="max-w-md text-gray-600">
                We don&apos;t have any active jobs at the moment. Please check back soon.
              </p>
            </div>
          ) : (
            <div className={`flex justify-center ${isFetching ? "opacity-80" : ""}`}>
              <div className="flex basis-[90%] flex-col gap-5 md:basis-[100%] md:flex-row md:flex-wrap xl:basis-[85%]">
                {jobs.map((job) => (
                  <div className="basis-[100%]" key={job.id}>
                    <div className="group w-full overflow-hidden rounded-xl shadow-2xl transition-all duration-400">
                      <div className="bg-white p-6 md:p-8 xl:p-12">
                        <div className="mb-3 flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="mb-1 font-work-sans text-[20px] font-semibold leading-[23px] text-[#454545] md:text-[18px] md:leading-[20px] lg:leading-[22px] xl:mb-0 xl:leading-[26.62px] 2xl:text-[22px]">
                            {job.title}
                          </div>
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faLocationDot} />
                            {job.location}
                          </div>
                        </div>
                        {job.shortDescription ? (
                          <p className="mb-3 line-clamp-2 text-sm text-gray-600">{job.shortDescription}</p>
                        ) : null}
                        <div className="flex flex-col gap-[6px] xl:flex-row xl:justify-between xl:gap-0">
                          <div className="flex flex-col flex-wrap gap-[6px] xl:basis-[80%] md:flex-row md:items-center md:justify-between md:gap-0">
                            <p className="w-fit whitespace-nowrap">Type: {jobTypeLabel(job.jobType)}</p>
                            <p className="w-fit whitespace-nowrap">Department: {job.department}</p>
                            <p className="w-fit whitespace-nowrap">Last Date: {formatDate(job.expiresAt)}</p>
                          </div>
                          <div className="xl:basis-[20%]">
                            <div className="flex justify-end">
                              <Link
                                href={`/careerdetails/${job.slug}`}
                                className="mt-1 inline-block rounded-[4.45px] px-4 py-[6px] text-[17.72px] font-medium leading-[28.58px] text-customBlue1 outline outline-1 outline-customBlue1 hover:shadow-[0_0_15px_#FFFFFF]"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isLoading && jobs.length > 0 ? (
            <div className="mt-8 flex items-center justify-center md:p-4">
              <div className="flex items-center rounded-[16px] border border-[#0693EB] bg-[#E0F3FF] p-1 md:p-3">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isFetching}
                  className="mx-1 px-2 py-1 text-[#0693EB] disabled:opacity-50 md:px-3"
                >
                  <img src="../icons/left-pagination.svg" alt="" />
                </button>
                {getVisiblePages(currentPage, totalPages).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`mx-1 flex h-[28px] w-[28px] items-center justify-center rounded-[50%] md:mx-4 xl:mx-3 ${
                      currentPage === page ? "bg-[#0693EB] text-white" : "h-[13px] w-[14px] text-[#000]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || isFetching}
                  className="mx-1 px-2 py-1 text-[#0693EB] disabled:opacity-50 md:px-3"
                >
                  <img src="../icons/right-pagination.svg" alt="" />
                </button>
              </div>
            </div>
          ) : (
            <div className="pb-8" />
          )}
        </div>
      </div>
    </div>
  );
}

function OurCareer() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-customBlue1" />
        </div>
      }
    >
      <JobsList />
    </Suspense>
  );
}

export default OurCareer;
