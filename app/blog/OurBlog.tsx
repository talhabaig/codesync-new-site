"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Blog {
  id: string;
  title: string;
  coverImage: string;
  createdAt: any;
  readTime?: string;
  category?: string;
  summary?: string;
  authorName?: string;
  authorAvatar?: string;
}

function OurBlog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => {
    // Firebase removed — backend blogs wiring later
    setBlogs([]);
    setLoading(false);
  }, []);

  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const currentBlogs = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const handlePreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  const getVisiblePages = () => {
    const pageNumbers = [];
    if (totalPages <= 8) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 8; i++) pageNumbers.push(i);
      } else if (currentPage > totalPages - 4) {
        for (let i = totalPages - 7; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        for (let i = currentPage - 3; i <= currentPage + 4; i++)
          pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="w-full pt-16 md:pt-24 xl:pt-28 bg-gradient-to-r from-customLightBlue to-customVeryLightBlue min-h-screen">

      {/* HEADER */}
      <div className="relative overflow-hidden py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-customBlue1/10 to-customLightBlue/10"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-customBlue1/10 rounded-full blur-lg"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-customBlue1/10 rounded-full blur-xl"></div>

        <div className="relative text-center font-poppins px-6 z-10">
          <div className="flex items-center justify-center gap-4 md:gap-6 uppercase font-bold text-2xl md:text-4xl xl:text-5xl mb-4">
            <div className="hidden md:block w-16 md:w-24 h-1 bg-gradient-to-r from-customBlue1 to-customLightBlue rounded-full"></div>
            <h2 className="font-bold">
              <span className="text-customBlue1">Our </span>
              <span className="text-customDarkGray">Blogs</span>
            </h2>
            <div className="hidden md:block w-16 md:w-24 h-1 bg-gradient-to-r from-customLightBlue to-customBlue1 rounded-full"></div>
          </div>

          <p className="text-[15px] md:text-[20px] lg:text-[22px] font-light md:w-[70%] xl:w-1/2 mx-auto mb-6 text-customDarkGray/80">
            Explore our blog for the latest trends and strategies to keep you ahead in the industry.
          </p>

          <div className="flex justify-center">
            <div className="w-16 h-1 bg-customBlue1 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* BLOG GRID */}
      <div className="flex justify-center px-4 md:px-8 py-8 md:py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-customBlue1"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
            {currentBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
              >
                <Link href={`/blogdetails/${blog.id}`}>
                  <div className="relative overflow-hidden h-[220px] lg:h-60 w-full">
                    <img
                      src={blog.coverImage}
                      alt="cover"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="absolute top-4 left-4">
                      <span className="bg-customBlue1 text-white text-xs font-medium px-3 py-1 rounded-full">
                        {blog.category || "General"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{formatDate(blog.createdAt)}</span>
                      <span className="mx-2">•</span>
                      <span>{blog.readTime || "5 min read"}</span>
                    </div>

                    <h3 className="text-customDarkGray font-bold text-xl lg:text-[22px] leading-tight mb-3 group-hover:text-customBlue1 transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {blog.summary || "Click to read more about this insightful article..."}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center">
                        {blog.authorAvatar && (
                          <img
                            src={blog.authorAvatar}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                        )}
                        <span className="text-sm text-gray-600 font-medium">
                          {blog.authorName || "Admin"}
                        </span>
                      </div>

                      <span className="text-customBlue1 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform duration-300">
                        Read More
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
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

      {/* PAGINATION */}
      {!loading && blogs.length > 0 && (
        <div className="flex justify-center mt-6 pb-16">
          <div className="bg-white rounded-2xl flex items-center p-2 shadow-lg border border-gray-200">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="p-2 disabled:opacity-30 w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-customBlue1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            {getVisiblePages().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
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
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 disabled:opacity-30 w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-customBlue1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && blogs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-24 h-24 bg-customLightBlue rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-customBlue1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-customDarkGray mb-3">No Blogs Yet</h3>
          <p className="text-gray-600 max-w-md">
            We're working on creating amazing content for you. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}

export default OurBlog;
