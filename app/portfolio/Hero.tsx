import React from "react";
import Button from "../components/common/Button";

function Hero() {
  return (
    <div className="w-full text-white max-h-[818px] bg-gradient-to-b md:bg-gradient-to-r from-customBlue1 to-customMint">
      <div className="flex flex-col md:flex-row justify-center items-center md:pt-8 lg:pt-9 xl:pt-12 2xl:pt-16 min-h-[39.5rem]">
        <div className="md:basis-[45%] lg:basis-1/2 flex justify-end items-start ">
          <div className=" flex flex-col basis-[85%] py-8 md:py-0">
            <div className="uppercase font-poppins flex flex-col font-bold text-2xl md:text-xl lg:text-3xl xl:text-4xl 2xl:text-[50px] leading-[35px] md:leading-[30px] lg:leading-[40px] lg:mb-2 xl:leading-[45px] 2xl:leading-[55px] tracking-[15%]">
              <span className="text-white">Explore Our </span>{" "}
              <span className="text-customCyan">Portfolio</span>
            </div>
            <p className="mb-4 md:mb-2 lg:mb-4 font-poppins font-light text-[22px] pr-[1.5rem] md:text-[13.3px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] leading-[24px] md:leading-[24px] xl:leading-[32.78px] tracking-[2%]">
              Explore our diverse portfolio showcasing innovative IT solutions
              and transformative digital experiences.
            </p>
            <div className="xl:mb-8">
              <Button customClass="text-white font-medium text-[21.72px] leading-[32.58px] py-2 px-4 bg-gradient-to-t from-customBlue2 to-customBlue3 h-[55.26px] rounded-[8.45px]">
                Hire us now
              </Button>
            </div>
          </div>
        </div>
        <div className="md:basis-[55%] lg:basis-1/2">
          <div className="flex flex-col justify-end items-end 2xl:pr-[8rem]">
            <div className="flex flex-col justify-center items-center md:pt-[10.5rem] md:pr-[3rem] lg:pt-[6.9rem]">
              <img
                src="/icons/portfolio-hero-section.svg"
                className="h-full w-full z-[999] sm:h-[21rem] sm:w-[22rem] md:h-[19rem] md:w-[26rem] lg:h-[100%] lg:w-[100%]"
                alt="portfolio Image"
              />

              <img
                src="/icons/portfolio-hero-section2.svg"
                className="w-full h-full mt-[-25px] sm:h-[11rem] sm:mt-[-3rem] sm:w-[22rem] md:w-[26rem] md:h-[15rem] md:mt-[-4rem] lg:w-[100%] lg:h-[100%] lg:mt-[-2.5rem]"
                alt="portfolio Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
