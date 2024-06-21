"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getImagePath } from "./utils.js";
import { FeedReadMore } from "../components/common/readMore";
import data from "portfolio.json";


function OurPortfolio() {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
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

  const currentProjects = data.slice(
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
    <div className="w-full pt-12 xl:pt-24 bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="text-center font-poppins">
        <div className="flex items-center gap-2 md:gap-8 justify-center uppercase font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl leading-[20px] md:leading-[50px] lg:leading-[69px] tracking-[1.5%]">
          <img
            src="/hori-line.svg"
            className="w-[85px] h-[9px] md:w-auto md:h-auto"
            alt=""
          />
          <div className="font-bold text-[23px] md:text-[30px] leading-[30px] md:leading-[35px] 2xl:text-[50px] 2xl:leading-[69px] tracking-[1.5%]">
            <span className="text-customBlue1">Our </span>{" "}
            <span className="text-customDarkGray">Portfolio</span>
          </div>
          <img
            src="/hori-line2.svg"
            className="w-[85px] h-[9px] md:w-auto md:h-auto"
            alt=""
          />
        </div>
        <div className="px-4 md:px-0 mb-4 md:mb-[25px] text-[16px] md:text-[20px] lg:text-[22px] font-light leading-[25px] md:leading-[32.78px] tracking-[2%] md:w-[70%] xl:w-1/2 2xl:w-[43%] md:mx-auto">
          FULL STACK WEB DEVELOPMENT <br />
          Building exceptional stuff
        </div>
      </div>
      <div className="bg-[#BEF3FF] p-8 pl-4 lg:pl-8 xl:pl-8 2xl:pl-20">
        <div className="flex flex-col md:justify-between md:flex-row md:flex-wrap">
          {currentProjects.map((project, index) => (
            <div
              key={index}
              className="md:basis-full 2xl:basis-[48.5%] flex flex-col gap-5 pb-[3rem] md:pb-[5rem] md:flex-row md:items-center"
            >
              <div  className="bg-[#94c0ff] p-4 shadow-[0_0_40px_#94c0ff] basis-1/2 rounded-[9.99px] flex justify-center items-center">
                <Link
                  href={`/projectdetails/${project.id}`}
                  className={` ${pathname === `/projectdetails/${project.id}`}`}
                >

                  <div className="cursor-pointer">
                    <img
                      className="h-full w-full object-cover"
                      src={getImagePath(project.image)}
                      alt={project.title}
                    />
                  </div>
                </Link>
              </div>
              <div className="basis-1/2 flex flex-col gap-2 md:gap-1 2xl:gap-3">
                <span className="text-[30px] xl:text-[32px] 2xl:text-[35px] font-semibold text-[#0693EB] leading-[50px] md:leading-[50px] 2xl:leading-[50px] uppercase">
                  {project.title}
                </span>
                <div className="text-[#454545] font-work-sans leading-[23px] md:leading-[20px] lg:leading-[22px] xl:leading-[26.62px] font-light text-[20px] md:text-[18px] lg:text-[20px] 2xl:text-[22px] mb-2 xl:mb-0">
                  <FeedReadMore maxLength={140}>
                    {project.description}
                  </FeedReadMore>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
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

export default OurPortfolio;
