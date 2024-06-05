"use client"; 
import React, { useState } from "react";

export default function WhyCodesync() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickDot = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full text-white bg-gradient-to-r from-[#0F70C9] to-[#073E71]">
      <div className="2xl:container 2xl:mx-auto py-12 px-8 md:p-12 xl:p-24 2xl:px-12">
        <div className="text-center font-poppins mb-12 xl:mb-24">
          <div className="flex items-center gap-2 md:gap-8 justify-center uppercase font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl leading-[20px] md:leading-[50px] lg:leading-[69px] tracking-[1.5%] mb-4">
            {/* <div className="h-[7px] w-[100px] md:w-[160px] rounded-lg bg-gradient-to-r  via-[#16B3C3] to-[#5BB1FF]"></div> */}
            <img src="/hori-line.svg" alt="" />
            <div>
              <span className="text-white">Why CodeSyncs?</span>{" "}
            </div>
            <img src="/hori-line2.svg" alt="" />
            {/* <div className="h-[7px] w-[100px] md:w-[160px] rounded-lg bg-gradient-to-r from-[#5BB1FF] via-[#16B3C3]"></div> */}
          </div>
          <div className="text-white mb-4 md:mb-[25px] text-[18px] md:text-[20px] lg:text-[22px] font-light leading-[32.78px] tracking-[2%]">
          Codesync is the partner of choice
          </div>
        </div>

        <div className="">
          <div className="flex flex-col md:flex-row">
            <div className="lg:px-12 2xl:px-6 basis-[55%] md:basis-[45%] 2xl:basis-[52%] flex justify-center">
              <div className="max-w-lg mx-auto relative overflow-hidden">
                <div className="carousel flex transition-transform ease-in-out duration-300">
                  <div
                    className={`carousel-item w-full ${
                      currentIndex === 0 ? "" : "hidden"
                    }`}
                  >
                    <img src="/Whycodesync.svg" alt="" className="w-full" />
                    <div className="rounded-[100%] mx-auto bg-gradient-to-r from-[#00000011] via-[#3131313a] to-[#0000002e] h-9 w-[82%] shadow-md ring-[#67656511] ring-offset-4"></div>
                  </div>
                  <div
                    className={`carousel-item w-full flex justify-center  ${
                      currentIndex === 1 ? "" : "hidden"
                    }`}
                  >
                    <img src="/carousel-img-2.svg" alt="" className="w-[75%] md:w-[70%] md:h-[320px]" />
                  </div>
                </div>
                <div className="flex justify-center mt-8">
                  <div
                    className={`dot mr-2 w-4 h-4 rounded-full cursor-pointer ${
                      currentIndex === 0 ? "bg-[#00FFFF]" : "bg-[#0C6DC7]"
                    }`}
                    onClick={() => handleClickDot(0)}
                  ></div>
                  <div
                    className={`dot ml-2 w-4 h-4 rounded-full cursor-pointer ${
                      currentIndex === 1 ? "bg-[#00FFFF]" : "bg-[#0C6DC7]"
                    }`}
                    onClick={() => handleClickDot(1)}
                  ></div>
                </div>
              </div>
            </div>
            <div className="lg:px-12 basis-[45%] md:basis-[55%] 2xl:basis-[48%] flex">
              <div className="flex items-center basis-[25%] md:basis-[35%]">
                <img src="/whycodesynline.svg" className="" alt="" />
              </div>
              <div className="basis-[75%] md:basis-[65%] py-8 flex flex-col items-center justify-between">
                <div>
                  <span className="font-poppins font-medium text-[18px] md:text-[26.48px] leading-[39.72px]tracking-[6%]">Tailored Solutions</span>
                  <p className="font-Chenla text-[14px] leading-[22px] md:leading-[25.75px] ">We offers industry-specific software solutions tailored to diverse business needs, emphasizing customization for optimal fit.</p>
                </div>
                <div>
                  <span className="font-poppins font-medium text-[18px] md:text-[26.48px] leading-[39.72px]tracking-[6%]">Work with Experts</span>
                  <p className="font-Chenla text-[14px] leading-[22px] md:leading-[25.75px] text-[#FFFFFF]">Benefit from the experience, knowledge, unique perspective, and efficiency that our experts bring to each project.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}