"use client";
import React, { useState } from "react";
import { FeedReadMore } from "../components/common/readMore";
import { getImagePath } from "./utils.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
const portfolioItems = [
  {
    id: 1,
    title: "dreams pos",
    description:
      "We are excited to present our Point of Sale (POS) system project, a robust and user-friendly solution designed to streamline and enhance the retail experience.",
    imageSrc: getImagePath("pos.webp"),
    order: "order-1",
  },
  {
    id: 2,
    title: "embold",
    description:
      "We had the privilege of creating a dynamic website for prominent influencers. This website is a vibrant reflection of the influencer's personal brand and online presence.",
    imageSrc: getImagePath("Emboldadmin1.webp"),
    order: "order-2",
  },
  {
    id: 3,
    title: "iba",
    description:
      "We designed a comprehensive healthcare management system that streamlined patient records, appointment scheduling, and billing processes.",
    imageSrc: getImagePath("IBAclient1.webp"),
    order: "order-1",
  },
  {
    id: 4,
    title: "aokumo",
    description:
      "Visit our digital sanctuary, where creativity meets innovation in an AI-driven symphony. Dive into a realm where every pixel tells a story, crafted by our GPT-inspired platform.",
    imageSrc: getImagePath("aukomodashboard.webp"),
    order: "order-2",
  },
  {
    id: 5,
    title: "iba admin",
    description:
      "My team and I designed a comprehensive healthcare management system that streamlined patient records, appointment scheduling, and billing processes.",
    imageSrc: getImagePath("IBA1.webp"),
    order: "order-1",
  },
  {
    id: 6,
    title: "autoprosper",
    description:
      "Step into the future of car shopping with Autoprosper, where cutting-edge AI algorithms match you with your dream vehicle.",
    imageSrc: getImagePath("autoprosperhomepage.webp"),
    order: "order-2",
  },
  {
    id: 7,
    title: "otr",
    description:
      "Join the revolution in industrial analytics with OTR, where our platform harnesses the wealth of data generated by working machinery to drive operational excellence.",
    imageSrc: getImagePath("otrdashboard.webp"),
    order: "order-1",
  },
  {
    id: 8,
    title: "lec",
    description:
      "We played a pivotal role in developing an interactive e-learning platform, integrating features such as video streaming, quizzes, and progress tracking.",
    imageSrc: getImagePath("LEC1.webp"),
    order: "order-2",
  },
  {
    id: 9,
    title: "lummoshop",
    description:
      "We spearheaded the development of a robust e-commerce platform from scratch, incorporating user-friendly interfaces and secure payment gateways.",
    imageSrc: getImagePath("Lummoshop1.webp"),
    order: "order-1",
  },
  {
    id: 10,
    title: "artonion",
    description:
      "Your gateway to a world of endless creativity, where imagination knows no bounds and every design tells a unique story.",
    imageSrc: getImagePath("Artnoion.webp"),
    order: "order-2",
  },
  {
    id: 11,
    title: "next bank",
    description:
      "Explore a world of possibilities with Next Bank, where our AI-powered solutions anticipate your needs, streamline your finances, and pave the way for a brighter financial future",
    imageSrc: getImagePath("Next-Bank-Landing-Page.png"),
    order: "order-1",
  },
  {
    id: 12,
    title: "avank",
    description:
      "At Avank Our user-friendly interface makes managing your money effortless, whether you're saving for the future.",
    imageSrc: getImagePath("Profileavnak.webp"),
    order: "order-2",
  },
  {
    id: 13,
    title: "wevos",
    description:
      "At Wevoz, we understand that time is precious. That's why our admin panel is engineered for efficiency, allowing you to accomplish tasks with ease and focus.",
    imageSrc: getImagePath("wevozregister.webp"),
    order: "order-1",
  },
  {
    id: 14,
    title: "rootpointers",
    description:
      "RootPointers delivers comprehensive IT solutions, providing a hassle-free experience from start to deployment and beyond.",
    imageSrc: getImagePath("rootpointerhome.webp"),
    order: "order-2",
  },
  {
    id: 15,
    title: "pollya",
    description:
      "Pollya: Your trusted companion in the ever-evolving world of news, delivering timely updates and insightful analysis with a commitment to accuracy and integrity.",
    imageSrc: getImagePath("pollyahome.webp"),
    order: "order-1",
  },
  {
    id: 16,
    title: "norswap",
    description:
      "We thrilled to present a recent collaboration where I developed a cutting-edge cryptocurrency website for a valued client.",
    imageSrc: getImagePath("norswap1.webp"),
    order: "order-2",
  },
];

export default function OurPortfolio2() {
  const [currentPage, setCurrentPage] = useState(1);
  const pathname = usePathname();
  const itemsPerPage = 4;
  const totalPages = Math.ceil(portfolioItems.length / itemsPerPage);

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

  const currentPortfolioItems = portfolioItems.slice(
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

  return (
    <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="py-12 px-8 md:px-12 md:py-20 xl:px-24 xl:py-28">
        <div className="text-center font-poppins mb-12 md:mb-24 2xl:mb-36">
          <div className="flex items-center gap-2 md:gap-8 justify-center uppercase font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl leading-[20px] md:leading-[50px] lg:leading-[69px] tracking-[1.5%]">
            <img
              src="/hori-line.svg"
              className="w-[85px] h-[9px] md:w-auto md:h-auto"
              alt=""
            />
            <div className="font-bold text-[23px] md:text-[30px] lg:text-[40px] leading-[30px] md:leading-[35px] lg:leading-[50px] 2xl:text-[50px] 2xl:leading-[69px] tracking-[1.5%] md:mb-2">
              <span className="text-customBlue1">Our </span>{" "}
              <span className="text-customDarkGray">Portfolio</span>
            </div>
            <img
              src="/hori-line2.svg"
              className="w-[85px] h-[9px] md:w-auto md:h-auto"
              alt=""
            />
          </div>
          <div className="mb-4 md:mb-[25px] text-[16px] md:text-[20px] lg:text-[22px] font-light leading-[25px] md:leading-[32.78px] tracking-[2%] md:w-[70%] xl:w-1/2 2xl:w-[43%] md:mx-auto">
            FULL STACK WEB DEVELOPMENT <br />
            Building exceptional stuff
          </div>
        </div>
        <div className="my-12 max-w-[1520px] 2xl:mx-auto">
          {currentPortfolioItems.map((project, index) => (
            <div
              className={`flex flex-col md:flex-row mb-16 lg:mb-24 xl:mb-32 ${
                index % 2 === 1
                  ? "flex-col md:flex-row"
                  : "flex-col md:flex-row-reverse"
              }`}
              key={project.id}
            >
              <div
                className={`md:basis-[55%] lg:basis-[52%] xl:basis-[55%] ${project.order}`}
              >
                <div className="flex justify-center">
                  <Link
                    href={`/projectdetails/${project.id}`}
                    className={` ${
                      pathname === `/projectdetails/${project.id}`
                    }`}
                  >
                    <div className="relative">
                      <img
                        src="../portfolio-images/polygon-sky-blue.svg"
                        alt="img"
                        className="w-[250px] h-[160px] sm:w-[300px] sm:h-[200px] lg:w-[320px] lg:h-[200px] xl:w-[520px] xl:h-[300px] 2xl:w-[644px] 2xl:h-[384px]"
                      />
                      <img
                        src="../portfolio-images/polygon-blue.svg"
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-5 lg:right-6 xl:top-8 xl:right-8 z-20 w-[250px] h-[160px] sm:w-[300px] sm:h-[200px] lg-w-[300px] lg:h-[200px] xl:w-[520px] xl:h-[300px] 2xl:w-[644px] 2xl:h-[384px]"
                        alt="img"
                      />
                      <img
                        src={project.imageSrc}
                        className="absolute top-7 right-6 sm:top-11 sm:right-8 lg:top-12 lg:right-12 xl:top-16 xl:right-20 2xl:top-16 2xl:right-16 [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)] z-30 rounded-[24px] lg:rounded-[24px] xl:rounded-[35px] w-[250px] h-[160px] sm:w-[300px] sm:h-[180px] lg:w-[320px] lg:h-[200px] xl:w-[520px] xl:h-[300px] 2xl:w-[644px] 2xl:h-[384px]"
                        alt="img"
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="md:basis-[45%] lg:basis-[48%] xl:basis-[45%] flex items-center">
                <div className="md:p-4 lg:p-8 md:basis-full xl:basis-[90%] 2xl:basis-[85%]">
                  <span className="text-[30px] md:text-[35px] lg:text-[45px] xl:text-[50px] 2xl:text-[64px] font-semibold text-[#0693EB] leading-[50px] md:leading-[60px] lg:leading-[75px] xl:leading-[80px] 2xl:leading-[96px] uppercase">
                    {project.title}
                  </span>
                  <div className="text-[#454545] font-work-sans leading-[30.25px] font-light text-[25px] mb-2 xl:mb-0">
                    <FeedReadMore maxLength={150}>
                      {project.description}
                    </FeedReadMore>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center md:p-4 items-center mt-8">
          <div className="bg-[#E0F3FF] rounded-[16px] flex items-center p-1 md:p-4 border-[1px] border-[#0693EB]">
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
