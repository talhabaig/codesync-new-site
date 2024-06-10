import React from 'react'
import Button from "../components/common/Button";
export default function Hero() {
  return (
    <div className="w-full text-white max-h-[818px] bg-gradient-to-b md:bg-gradient-to-r from-customBlue1 to-customMint">
      <div className="flex flex-col md:flex-row justify-center md:pt-8 lg:pt-9 xl:pt-12 2xl:pt-24">
        <div className="flex justify-center items-start md:items-center 2xl:items-start md:basis-[45%] lg:basis-1/2">
          <div className="py-8 md:py-12 2xl:pt-44 flex flex-col basis-[90%] md:basis-[86%] md:pl-4 2xl:basis-[64%]">
            <div className="uppercase font-poppins font-bold text-2xl md:text-xl lg:text-3xl xl:text-4xl 2xl:text-[50px] leading-[35px] md:leading-[30px] lg:leading-[40px] lg:mb-2 xl:leading-[45px] 2xl:leading-[69px] tracking-[1.5%]">
              <span className="text-[#ffffff]">
              Reach Out <span className="text-[#00FFFF]">Contact</span> Us Today 
              </span>
            </div>
            <p className="mb-4 md:mb-2 lg:mb-4 2xl:mb-[25px] font-poppins font-light text-[16px] md:text-[13.3px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] leading-[24px] md:leading-[24px] xl:leading-[32.78px] tracking-[2%]">
            Connect with us to explore possibilities and discuss your project needs.
            </p>
            <div className="xl:mb-8">
              <Button customClass="text-white font-medium text-[21.72px] leading-[32.58px] py-2 px-4 bg-gradient-to-t from-customBlue2 to-customBlue3 h-[55.26px] rounded-[8.45px]">
                Hire us now
              </Button>
            </div>
          </div>
        </div>
        <div className="basis-full md:basis-[55%] lg:basis-1/2">
          <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center md:pt-[10.5rem] md:pr-[3rem] lg:pt-[6.9rem]">
              <img
                src="/contact-hero.svg"
                className="z-[999] "
                alt="Team Image"
              />

              <img
                src="/icons/portfolio-hero-section2.svg"
                className=" mt-[-25px] sm:mt-[-3rem] md:mt-[-4rem] lg:mt-[-4.5rem]"
                alt="Team Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
