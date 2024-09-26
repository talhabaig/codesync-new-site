"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/common/Button";

interface Career {
  id: string;
  position: string;
  type: string;
  department: string;
  location: string;
  date: string;
  lastDate: string;
  createdAt: string;
  salary:string;
  totalPositions:string;
}

function OurCareer() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCareers = async () => {
      const careerCollection = collection(db, "careers");
      const careerQuery = query(careerCollection, orderBy("createdAt", "desc"));
      const careerSnapshot = await getDocs(careerQuery);
      const careerList = careerSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Career[];
      setCareers(careerList);
    };
    
    fetchCareers();
  }, []);

  const totalPages = Math.ceil(careers.length / itemsPerPage);

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

  const currentCareers = careers.slice(
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
    <div className="w-full pt-12 lg:pt-20 bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="2xl:container 2xl:mx-auto">
        <div className="text-center font-poppins p-4 lg:px-12">
          <div className="flex justify-center gap-2 md:gap-8 font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl leading-[20px] md:leading-[50px] lg:leading-[69px] tracking-[1.5%] mb-2">
            <div className="basis-[90%] md:basis-[85%] font-bold text-[30px] md:text-[40px] leading-[40px] md:leading-[50px] 2xl:text-[50px] 2xl:leading-[69px] tracking-[1.5%] md:mb-2">
              <span className="text-customBlue1">Available </span>{" "}
              <span className="text-customDarkGray">Jobs</span>
            </div>
          </div>
        </div>
        <div className="p-4 md:p-8 ">
          <div className="flex justify-center">
            <div className="basis-[90%] md:basis-[100%] xl:basis-[85%] flex flex-col md:flex-row md:flex-wrap gap-5">
              {currentCareers.map((career) => (
                <div className="basis-[100%]" key={career.id}>
                  <div className="shadow-2xl rounded-xl overflow-hidden transition-all duration-400 transform w-full group">
                    <div className="p-6 md:p-8 xl:p-12 bg-white">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                        <div className="text-[#454545] font-work-sans leading-[23px] md:leading-[20px] lg:leading-[22px] xl:leading-[26.62px] font-semibold text-[20px] md:text-[18px] 2xl:text-[22px] mb-1 xl:mb-0">
                            {career.position} 
                        </div>
                        <div className="flex gap-2 items-center">
                          <FontAwesomeIcon icon={faLocationDot} />
                          {career.location}
                        </div>
                      </div>
                      <div className="flex flex-col xl:flex-row xl:justify-between gap-[6px] xl:gap-0">
                        <div className="xl:basis-[80%] flex flex-col flex-wrap gap-[6px] md:gap-0 md:flex-row md:justify-between md:items-center">
                          <p className="w-fit whitespace-nowrap">Type: {career.type}</p>
                          <p className="w-fit whitespace-nowrap">Positions: 02</p>
                          <p className="w-fit whitespace-nowrap">Posted: {career.date}</p>
                          <p className="w-fit whitespace-nowrap">Last Date: {career.lastDate}</p>
                        </div>
                        <div className="xl:basis-[20%]">
                          <div className="flex justify-end">
                            <div>
                              <Link
                                href={`/careerdetails/${career.id}`}
                                className={`w-full ${pathname === `/careerdetails/${career.id}`}`}
                              >
                                <Button customClass="outline outline-1 mt-1 outline-customBlue1 text-customBlue1 font-medium text-[17.72px] leading-[28.58px] py-[6px] px-4 rounded-[4.45px] hover:shadow-[0_0_15px_#FFFFFF]">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
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
    </div>
  );
}

export default OurCareer;
