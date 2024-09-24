"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { FeedReadMore } from "../../components/common/readMore";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

interface Blog {
  id: string;
  title: string;
  coverImage: string;
  alt: string;
  createdAt: string;
}

function OurCareer() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogCollection = collection(db, "blogs");
      const blogQuery = query(blogCollection, orderBy("createdAt", "desc"));
      const blogSnapshot = await getDocs(blogQuery);
      const blogList = blogSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Blog[];
      setBlogs(blogList);
    };
    
    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentBlogs = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getVisiblePages = () => {
    const pageNumbers = [];
    if (totalPages <= 8) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 8; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage > totalPages - 4) {
        for (let i = totalPages - 7; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = currentPage - 3; i <= currentPage + 4; i++) {
          pageNumbers.push(i);
        }
      }
    }
    return pageNumbers;
  };

  const pathname = usePathname();

  return (
    <div className="w-full pt-12 md:pt-20 bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="text-center font-poppins p-4 md:p-8 lg:px-12">
        <div className="flex items-center gap-2 md:gap-8 font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl leading-[20px] md:leading-[50px] lg:leading-[69px] tracking-[1.5%] mb-2">
          <div className="font-bold text-lg md:text-[30px] lg:text-[40px] md:leading-[35px] lg:leading-[50px] 2xl:text-[50px] 2xl:leading-[69px] tracking-[1.5%] md:mb-2">
            <span className="text-customBlue1">Available </span>{" "}
            <span className="text-customDarkGray">Jobs</span>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-8 ">
        <div className="flex justify-center">
          <div className="basis-[90%] md:basis-[85%] lg:basis-[90%] flex flex-col md:flex-row md:flex-wrap gap-5">
            {currentBlogs.map((blog) => (
              <div className="basis-[100%] flex flex-col gap-5 p-4 md:flex-row md:items-center justify-between" key={blog.id}>
                <div className="shadow-2xl rounded-2xl overflow-hidden transition-all duration-400 transform hover:shadow-2xl w-full group">
                  {/* <Link
                    href={`/blogdetails/${blog.id}`}
                    className={`w-full ${pathname === `/blogdetails/${blog.id}`}`}
                  >
                    <div className="overflow-hidden h-[170px] xl:h-[180px] 2xl:h-[220px] w-full ">
                      <img
                        className="object-cover w-full h-full object-top transition-all duration-500 transform group-hover:scale-110"
                        src={blog.coverImage}
                        alt="cover"
                      />
                    </div>
                  </Link> */}
                  <div className="p-4 md:p-5 bg-white h-auto md:h-[100px]">
                    <div className="text-[#454545] font-work-sans leading-[23px] md:leading-[20px] lg:leading-[22px] xl:leading-[26.62px] font-semibold text-[20px] md:text-[18px] 2xl:text-[22px] mb-2 xl:mb-0">
                      {/* <FeedReadMore maxLength={50} className="font-bold" readMore> */}
                        {blog.title} 
                      {/* </FeedReadMore> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center md:p-4 items-center mt-8">
          <div className="bg-[#E0F3FF] rounded-[16px] flex items-center p-1 md:p-3 border-[1px] border-[#0693EB]">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-2 md:px-3 py-1 mx-1 text-[#0693EB] disabled:opacity-50"
            >
              <img src="../icons/left-pagination.svg" alt="" />
            </button>
            {getVisiblePages().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`flex items-center justify-center mx-1 md:mx-4 xl:mx-3 h-[28px] w-[28px] rounded-[50%] ${
                  currentPage === page
                    ? "bg-[#0693EB] text-white"
                    : "text-[#000] w-[14px] h-[13px]"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-2 md:px-3 py-1 mx-1 text-[#0693EB] disabled:opacity-50"
            >
              <img src="../icons/right-pagination.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurCareer;
