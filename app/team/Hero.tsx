"use client";
import React from "react";
import Button from "../components/common/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Hero() {
  const pathname = usePathname();
  return (
    <div className="w-full text-white max-h-[818px] bg-gradient-to-b md:bg-gradient-to-r from-customBlue1 to-customMint">
      <div className="flex flex-col md:flex-row justify-center ">
        <div className="flex justify-start pl-4 md:pl-8 lg:pl-12 xl:pl-[3rem] 2xl:pl-[6rem] items-start md:items-center 2xl:items-start md:basis-[45%] lg:basis-1/2">
          <div className=" md:pl-0 md:py-12 2xl:pt-44 flex flex-col basis-[90%] md:basis-[86%] 2xl:basis-[80%]">
            <div className="fly-in-left uppercase font-poppins font-bold text-2xl md:text-xl lg:text-3xl xl:text-4xl 2xl:text-[50px] leading-[35px] md:leading-[30px] lg:leading-[40px] lg:mb-2 xl:leading-[45px] 2xl:leading-[69px] tracking-[1.5%]">
              <span className="text-[#ffffff]">
                Meet Our Dynamic <span className="text-[#00FFFF]">Team</span> of
                Tech <span className="text-[#00FFFF]">Innovators</span>
              </span>
            </div>
            <p className="fly-in-1-5s mb-4 md:mb-2 lg:mb-4 2xl:mb-[25px] font-poppins font-light text-[16px] md:text-[13.3px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] leading-[24px] md:leading-[24px] xl:leading-[32.78px] tracking-[2%]">
              Discover the Brilliance of Our Tech Team, Crafting Innovative
              Solutions for Your Success.
            </p>
            <div className="fly-in-2s xl:mb-8">
              
              <Link href="/hireus" className={` ${pathname === "/hireus"}`}>
                <Button customClass="text-white font-medium text-[21.72px] leading-[32.58px] py-2 px-4 bg-gradient-to-t from-customBlue2 to-customBlue3 h-[55.26px] rounded-[8.45px] hover:transform hover:transition-transform hover:duration-300 hover:ease-in-out hover:shadow-[0_0_15px_#005BA1]">
                  Hire us now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="basis-full md:basis-[55%] lg:basis-1/2">
          <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center pt-[5rem] md:pr-[3rem]">
              <img
                src="/icons/Team-hero.svg"
                alt="Team Image"
              />

              <img
                src="/icons/portfolio-hero-section2.svg"
                className=" mt-[-25px] sm:mt-[-3rem] md:mt-[-4rem] lg:mt-[-1.8rem]"
                alt="Team Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
