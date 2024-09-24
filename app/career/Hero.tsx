"use client";
import React from "react";
import Button from "../components/common/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Hero() {
  const pathname = usePathname();
  return (
    <div className="w-full text-white max-h-[818px] bg-no-repeat bg-cover bg-center bg-[url('/icons/career-bg-3.jpg')]">
      <div className="flex flex-col md:flex-row justify-center  md:h-[330px] lg:h-[400px] xl:h-[464px] 2xl:h-[554px]  ">
        <div className="pl-4 lg:pl-8 xl:pl-8 2xl:pl-20 flex justify-start items-start md:items-center md:basis-[45%] lg:basis-1/2 xl:basis-[55%]">
          <div className="py-8 md:py-0 2xl:pt-12 flex flex-col basis-[90%] md:basis-[86%] md:pl-4 2xl:basis-[100%]">
            <h1 className="fly-in-1s uppercase font-poppins font-bold text-2xl md:text-xl lg:text-3xl xl:text-4xl 2xl:text-[45px] 3xl:text-[50px] leading-[35px] md:leading-[30px] lg:leading-[40px] lg:mb-2 xl:leading-[45px] 2xl:leading-[60px] 3xl:leading-[69px] tracking-[1.5%]">
              <span className="text-[#ffffff]">
                Job <span className="text-[#00FFFF]">Openings</span>
              </span>
            </h1>
            <p className="fly-in-1-5s mb-4 md:mb-2 lg:mb-4 2xl:mb-[25px] font-poppins font-light text-[16px] md:text-[13.3px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] leading-[24px] md:leading-[24px] xl:leading-[32.78px] tracking-[2%]">
            We're seeking talented, passionate individuals to join our dynamic team! If you're driven, innovative, and ready to take your career to the next level, we want to hear from you.
            </p>
            <div className="fly-in-2s xl:mb-8">
              <Link href="/hireus" className={` ${pathname === "/hireus"}`}>
                <Button customClass="text-white font-medium text-[21.72px] leading-[32.58px] py-2 px-4 bg-gradient-to-t from-customBlue2 to-customBlue3 h-[55.26px] rounded-[8.45px] hover:transition-transform hover:duration-300 hover:ease-in-out hover:shadow-[0_0_15px_#FFFFFF]">
                  Hire us now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="basis-full md:basis-[55%] lg:basis-1/2 xl:basis-[45%] 3xl:pr-8">
          <div className="flex flex-col md:flex-row justify-end md:justify-center items-center 3xl:justify-end"></div>
        </div>
      </div>
    </div>
  );
}
