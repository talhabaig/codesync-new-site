"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FeedReadMore } from "../components/common/readMore";
import data from "portfolio.json";


function OurBlog() {

  const data = [
    {
      id: 1,
      title: "Top Trends Shaping Business Transformation Initiatives in 2024",
      image: "/images/blog/blog1.jpg",
      alt: "Japanese Gyozas",
    },
    {
      id: 2,
      title: "The Future of AI in Everyday Applications",
      image: "/images/blog/blog4.jpg",
      alt: "AI in Applications",
    },
    {
      id: 3,
      title: "Effective Strategies for Remote Work. ",
      image: "/images/blog/blog2.jpg",
      alt: "Remote Work Strategies",
    },
    {
      id: 4,
      title: "The Future of AI in Everyday Applications",
      image: "/images/blog/blog3.jpg",
      alt: "Japanese Gyozas",
    },
    {
      id: 5,
      title: "The Future of AI in Everyday Applications",
      image: "/images/blog/blog2.jpg",
      alt: "AI in Applications",
    },
    {
      id: 6,
      title: "Effective Strategies for Remote Work. ",
      image: "/images/blog/blog1.jpg",
      alt: "Remote Work Strategies",
    },
    {
      id: 7,
      title: "Top Trends Shaping Business Transformation Initiatives in 2024",
      image: "/images/blog/blog3.jpg",
      alt: "Japanese Gyozas",
    },
    {
      id: 8,
      title: "The Future of AI in Everyday Applications",
      image: "/images/blog/blog2.jpg",
      alt: "AI in Applications",
    },
    {
      id: 9,
      title: "Effective Strategies for Remote Work. ",
      image: "/images/blog/blog1.jpg",
      alt: "Remote Work Strategies",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data.length / itemsPerPage);

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

  const currentBlogs = data.slice(
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
    <div className="w-full pt-12 md:pt-20 xl:pt-28 bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="text-center font-poppins">
        <div className="flex items-center gap-2 md:gap-8 justify-center uppercase font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl leading-[20px] md:leading-[50px] lg:leading-[69px] tracking-[1.5%] mb-2">
          <img
            src="/hori-line.svg"
            className="w-[85px] h-[9px] md:w-auto md:h-auto"
            alt=""
          />
          <div className="font-bold text-lg md:text-[30px] lg:text-[40px] md:leading-[35px] lg:leading-[50px] 2xl:text-[50px] 2xl:leading-[69px] tracking-[1.5%] md:mb-2">
            <span className="text-customBlue1">Our </span>{" "}
            <span className="text-customDarkGray">Blogs</span>
          </div>
          <img
            src="/hori-line2.svg"
            className="w-[85px] h-[9px] md:w-auto md:h-auto"
            alt=""
          />
        </div>
        <div className="px-4 md:px-0 mb-4 md:mb-[25px] text-[16px] md:text-[20px] lg:text-[22px] font-light leading-[25px] md:leading-[32.78px] tracking-[2%] md:w-[70%] xl:w-1/2 2xl:w-[43%] md:mx-auto">
          Explore our blog for the latest trends and strategies to keep you ahead in the industry.
        </div>
      </div>
      <div className="p-4 md:p-8">
        <div className="flex justify-center">
          <div className="basis-[90%] md:basis-[85%] flex flex-col md:flex-row md:flex-wrap gap-5">
          {currentBlogs.map((blog, index) => (
            <div className=" md:basis-[48%] 2xl:basis-[32%] flex flex-col gap-5 md:flex-row md:items-center justify-between" key={blog.id}>
              
                <div className="shadow-2xl rounded-2xl overflow-hidden transition-all duration-400 transform hover:shadow-2xl w-full group">
                <Link
                href={`/blogdetails/${blog.id}`}
                className={`w-full ${
                  pathname === `/blogdetails/${blog.id}`
                }`}
              >
                  <div className="overflow-hidden ">
                    <img
                      className="h-[180px] lg:h-[230px] w-full transition-all duration-500 transform group-hover:scale-110"
                      src={blog.image}
                      alt={blog.alt}
                    ></img>
                  </div></Link>
                  <div className="p-6 bg-white h-auto md:h-[120px] lg:h-[140px]">
                    
                    <div className="text-[#454545] font-work-sans leading-[23px] md:leading-[20px] lg:leading-[22px] xl:leading-[26.62px] font-bold text-[20px] md:text-[18px] lg:text-[20px] 2xl:text-[22px] mb-2 xl:mb-0">
                      <FeedReadMore maxLength={50} className="font-bold" readMore>
                        {blog.title}
                      </FeedReadMore>
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
              <img src="../icons/left-pagination.svg" className="" alt="" />
            </button>
            {getVisiblePages().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`flex items-center justify-center mx-1 md:mx-4 xl:mx-6 h-[28px] w-[28px] rounded-[50%] ${
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
              <img src="../icons/right-pagination.svg" className="" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurBlog;
