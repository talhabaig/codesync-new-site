"use client";
import React from "react";
import Button from "../components/common/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Hero() {
  const pathname = usePathname();
  return (
    <div className="w-full text-white max-h-[818px] bg-gradient-to-b md:bg-gradient-to-r from-customBlue1 to-customMint">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="pl-4 lg:pl-8 xl:pl-8 2xl:pl-20 flex justify-start items-start md:items-center md:basis-[45%] lg:basis-1/2">
          <div className="py-8 md:py-0 2xl:pt-12 flex flex-col basis-[90%] md:basis-[86%] md:pl-4 2xl:basis-[80%]">
            <div className="fly-in-left uppercase font-poppins font-bold text-2xl md:text-xl lg:text-3xl xl:text-4xl 2xl:text-[45px] 3xl:text-[50px] leading-[35px] md:leading-[30px] lg:leading-[40px] lg:mb-2 xl:leading-[45px] 2xl:leading-[60px] 3xl:leading-[69px] tracking-[1.5%]">
              <span className="text-[#ffffff]">
                Explore Our <span className="text-[#00FFFF]">Portfolio</span>
              </span>
            </div>
            <p className="fly-in-1-5s mb-4 md:mb-2 lg:mb-4 2xl:mb-[25px] font-poppins font-light text-[16px] md:text-[13.3px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] leading-[24px] md:leading-[24px] xl:leading-[32.78px] tracking-[2%]">
              Explore our diverse portfolio showcasing innovative IT solutions
              and transformative digital experiences.
            </p>
            <div className="fly-in-2s xl:mb-8">
             
              <Link href="/hireus" className={` ${pathname === "/hireus"}`}>
                <Button customClass="text-white font-medium text-[21.72px] leading-[32.58px] py-2 px-4 bg-gradient-to-t from-customBlue2 to-customBlue3 h-[55.26px] rounded-[8.45px] hover:transition-transform hover:duration-300 hover:ease-in-out hover:shadow-[0_0_15px_#005BA1]">
                  Hire us now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="basis-full md:basis-[55%] lg:basis-1/2 3xl:pr-8">
          <div className="flex flex-col md:flex-row justify-end md:justify-center items-center 3xl:justify-end">
            <div className="flex flex-col justify-center items-center md:pt-[3.5rem] md:pr-[3rem] xl:pt-[6rem] 2xl:pt-[6.9rem]">
              <img
                src="/icons/portfolio-hero-section.svg"
                alt="Team Image" className="xl:mt-[-2rem] h-[200px] md:w-[360px] md:h-[189px] lg:w-[400px] lg:h-[227px] xl:w-[420px] xl:h-[260px] 2xl:w-[430px] 2xl:h-[305px] 3xl:w-[430px] 3xl:h-[320px]"
              />

              <img
                src="/icons/portfolio-hero-section2.svg"
                className="mt-[-25px] sm:mt-[-3rem] h-[130px] md:mt-[-1.8rem] lg:mt-[-1.8rem] md:w-[420px] md:h-[110px] lg:w-[420px] lg:h-[140px] xl:w-[430px] xl:h-[170px] 2xl:w-[440px] 2xl:h-[200px] 3xl:w-[450px] 3xl:h-[210px]"
                alt="Team Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
