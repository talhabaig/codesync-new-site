export default function WhatWeDo() {
  return (
    <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="2xl:container 2xl:mx-auto py-12 px-8 md:p-12 xl:p-24 2xl:px-12 2xl:pb-32">
        <div className="text-center font-poppins">
          <div className="flex items-center gap-2 md:gap-8 justify-center uppercase font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl leading-[20px] md:leading-[50px] lg:leading-[69px] tracking-[1.5%]">
            <div className="h-[7px] w-[100px] md:w-[160px] rounded-lg bg-gradient-to-r  via-customTeal to-customBlue1"></div>
            <div>
              <span className="text-customBlue1">What</span>{" "}
              <span className="text-customDarkGray">we do?</span>
            </div>
            <div className="h-[7px] w-[100px] md:w-[160px] rounded-lg bg-gradient-to-r from-customBlue1 via-customTeal"></div>
          </div>
          <div className="mb-4 md:mb-[25px] text-[18px] md:text-[20px] lg:text-[22px] font-light leading-[32.78px] tracking-[2%]">
            We let our ideas grow!
          </div>
        </div>

        <div className="pt-12 lg:pt-16">
          <div className="flex flex-col md:flex-row gap-8 2xl:gap-[110px] md:px-2 xl:px-0 mb-12 md:mb-16 lg:mb-24">
            <div className="basis-1/3 flex flex-col justify-center items-center md:items-start md:justify-start gap-[30px]">
              <div className="h-[108px] w-[108px] rounded-[13.3px] bg-gradient-to-b from-customDarkBlue to-customMediumBlue flex justify-center items-center">
                <img src="/wwd-web.svg" alt="" className="" />
              </div>
              <div className="flex flex-col items-center justify-center md:justify-start md:items-start">
                <span className="font-poppins text-center md:text-start uppercase text-[26.48px] md:text-[20px] lg:text-[26.48px] font-semibold leading-[39.72px] md:leading-[30px] lg:leading-[39.72px] tracking-[6%]">Web Development</span>
                <p className="text-center md:text-start font-Chenla text-[14px] leading-[25.75px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing labore et Lorem ipsum dolor sit </p>
              </div>
            </div>
            <div className="basis-1/3 flex flex-col justify-center items-center md:items-start md:justify-start gap-[30px]">
              <div className="h-[108px] w-[108px] rounded-[13.3px] bg-gradient-to-b from-customDarkBlue to-customMediumBlue flex justify-center items-center">
                <img src="/wwd-E-comerce.svg" alt="" />
              </div>
              <div className="flex flex-col items-center justify-center md:justify-start md:items-start">
                <span className="font-poppins text-center md:text-start uppercase text-[26.48px] md:text-[20px] lg:text-[26.48px] font-semibold leading-[39.72px] md:leading-[30px] lg:leading-[39.72px] tracking-[6%]">E-Commerce Solutions</span>
                <p className="font-Chenla text-center md:text-start text-[14px] leading-[25.75px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing labore et Lorem ipsum dolor sit </p>
              </div>
            </div>
            <div className="basis-1/3 flex flex-col justify-center items-center md:items-start md:justify-start gap-[30px]">
              <div className="h-[108px] w-[108px] rounded-[13.3px] bg-gradient-to-b from-customDarkBlue to-customMediumBlue flex justify-center items-center">
                <img src="/wwd-graphic.svg" alt="" />
              </div>
              <div className="flex flex-col items-center justify-center md:justify-start md:items-start">
                <span className="font-poppins text-center md:text-start uppercase text-[26.48px] md:text-[20px] lg:text-[26.48px] font-semibold leading-[39.72px] md:leading-[30px] lg:leading-[39.72px] tracking-[6%]">Web & Graphic Designing</span>
                <p className="font-Chenla text-center md:text-start text-[14px] leading-[25.75px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing labore et Lorem ipsum dolor sit </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="text-white font-poppins font-light text-[24.7px] leading-[37.05px] py-2 px-4 md:px-2 lg:px-4 rounded-[9.61px] bg-gradient-to-b from-customBrightBlue to-customLightBlue2 md:w-[140px] lg:w-[208px] lg:h-[62.85px]">
              See More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}