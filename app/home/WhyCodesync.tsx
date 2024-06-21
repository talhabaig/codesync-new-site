"use client";
import React, { useEffect } from "react";
import { useKeenSlider, KeenSliderInstance } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const carousel = (slider: KeenSliderInstance) => {
  const z = 300;
  function rotate() {
    const deg = 360 * slider.track.details.progress;
    slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
  }
  slider.on("created", () => {
    const deg = 360 / slider.slides.length;
    slider.slides.forEach((element: HTMLElement, idx: number) => {
      element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`;
    });
    rotate();
  });
  slider.on("detailsChanged", rotate);
};

export default function WhyCodesync() {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      selector: ".carousel__cell",
      renderMode: "custom",
      mode: "free-snap",
    },
    [carousel]
  );

  useEffect(() => {
    if (!instanceRef.current) return;

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [instanceRef]);

  return (
    <div className="w-full text-white bg-gradient-to-r from-[#0F70C9] to-[#073E71]">
      <div className="2xl:container 2xl:mx-auto py-12 px-8 md:p-12 xl:p-24 2xl:px-12">
        <div className="text-center font-poppins mb-12 xl:mb-24">
          <div className="flex items-center gap-2 md:gap-8 justify-center uppercase font-bold text-xl md:text-2xl lg:text-3xl xl:text-5xl lg:leading-[69px] tracking-[1.5%] mb-4">
            <img src="/hori-line.svg" className='w-[70px] h-[9px] sm:w-[90px] md:w-auto md:h-auto' alt="" />
            <div>
              <span className="text-white">Why CodeSyncs?</span>{" "}
            </div>
            <img src="/hori-line2.svg" className='w-[70px] h-[9px] sm:w-[90px] md:w-auto md:h-auto' alt="" />
          </div>
          <div className="text-white mb-4 md:mb-[25px] text-[18px] md:text-[20px] lg:text-[22px] font-light leading-[32.78px] tracking-[2%]">
            Codesync is the partner of choice
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-center">
          <div className="scene lg:px-12 2xl:px-6 basis-[55%] md:basis-[45%] 2xl:basis-[52%] flex justify-center">
            <div className="max-w-lg mx-auto carousel keen-slider" ref={sliderRef}>
              <div className="carousel__cell">
                <img src="/Whycodesync.svg" alt="" className="w-full" />
                <div className="rounded-[100%] mx-auto bg-gradient-to-r from-[#00000011] via-[#3131313a] to-[#0000002e] h-9 w-[82%] shadow-md ring-[#67656511] ring-offset-4"></div>
              </div>
              <div className="carousel__cell">
                <img src="/icons/portfolio-hero-section.svg" alt="" className="w-[75%] md:w-[70%]" />
              </div>
              
            </div>
          </div>
          <div className="lg:px-12 basis-[45%] md:basis-[55%] 2xl:basis-[48%] flex">
            <div className="hidden md:block md:basis-[35%]">
              <div className="flex items-center">
                <img src="/whycodesynline.svg" className="" alt="" />
              </div>
            </div>
            <div className="md:basis-[65%] py-8 flex flex-col items-center justify-between">
              <div className="mb-6">
                <span className="font-poppins font-medium text-[18px] md:text-[26.48px] leading-[39.72px]tracking-[6%]">Tailored Solutions</span>
                <p className="font-Chenla text-[14px] leading-[22px] md:leading-[25.75px] ">We offer industry-specific software solutions tailored to diverse business needs, emphasizing customization for optimal fit.</p>
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
  );
}