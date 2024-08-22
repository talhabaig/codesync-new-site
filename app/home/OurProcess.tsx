"use client";
import { useEffect, useRef } from "react";

export default function OurProcess() {
  const airplaneRefs = useRef<(HTMLImageElement | null)[]>([]);
  // const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  // const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('right')) {
              entry.target.classList.add("fly-in-right");
            } else {
              entry.target.classList.add("fly-in-left");
            }
          } else {
            if (entry.target.classList.contains('right')) {
              entry.target.classList.remove("fly-in-right");
            } else {
              entry.target.classList.remove("fly-in-left");
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // titleRefs.current.forEach((ref) => {
    //   if (ref) observer.observe(ref);
    // });

    // paragraphRefs.current.forEach((ref) => {
    //   if (ref) observer.observe(ref);
    // });

    airplaneRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      // titleRefs.current.forEach((ref) => {
      //   if (ref) observer.unobserve(ref);
      // });

      // paragraphRefs.current.forEach((ref) => {
      //   if (ref) observer.unobserve(ref);
      // });

      airplaneRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="w-full bg-white bg-gradient-to-tr from-[#a0b4e5] from-0% via-white via-50% to-[#a0b4e5] to-100%">
      <div className="2xl:container 2xl:mx-auto p-12 lg:p-20 xl:p-24">
        <div className="mb-16 md:mb-20 2xl:mb-28 lg-32 mt-12">
          <div className="text-center font-poppins font-semibold text-[18px] md:text-[21px] leading-[31.5px] tracking-[14.5%] uppercase">
            What's the process?
          </div>
          <hr className="w-20 md:w-24 mx-auto border-b-[3px] mt-3 border-[#1C7CD4]" />
          <h1 className="text-center font-poppins font-bold text-2xl md:text-4xl md:leading-[45px] lg:text-[55px] lg:leading-[68.48px] mb-3">
            <span className="text-[#323232]">Our</span> <span className="text-[#1C7CD4]">Process</span>
          </h1>
          <h2 className="text-center text-#323232 font-light text-lg lg:text-[21px] lg:leading-[34.96px] tracking-[4%]">
            POWERED BY CREATIVITY, INNOVATION AND EXCELLENCE
          </h2>
        </div>
        <div className="max-w-[1200px] mx-auto xl:px-12 2xl:px-0">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-0">
            <div className="md:basis-[25%] xl:basis-[35%] flex justify-center md:justify-start">
              <img src="/OurProcess1.svg" alt="" className="h-[128px] w-[130px] md:h-auto md:w-auto" />
            </div>
            <div className="md:basis-[60%] xl:basis-[57%]">
              {/* ref={(el) => (titleRefs.current[0] = el)} */}
              <h3 className="text-center md:text-left font-poppins font-semibold text-[24px] md:text-[27.3px] leading-[36px] md:leading-[45.5px] tracking-[4%] text-[#000000] right">
                REQUIREMENTS
              </h3>
              {/* ref={(el) => (paragraphRefs.current[0] = el)} */}
              <p className="text-center md:text-left font-poppins font-light text-[16px] leading-[24px] lg:text-[20px] xl:text-[22px] 3xl:text-[26px] lg:leading-[34px] xl:leading-[38px] 3xl:leading-[43.29px] tracking-[4%] mb-[21.65px] text-[#000000] right">
                Benefit from the experience, knowledge, unique perspective, and efficiency that our experts bring to each project.
              </p>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div>
              <img src="/OurProcessline.svg" alt="" className="mx-auto h-[80px] lg:h-[127.07px] w-[75%] xl:w-[80%]" />
            </div>
            <img ref={(el) => (airplaneRefs.current[0] = el)} src="/airoplane.svg" className="absolute top-[12px] left-[220px] lg:top-[30px] xl:left-[350px]" alt="" />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-0">
            <div className="md:basis-[25%] xl:basis-[35%] flex justify-center md:order-2 md:justify-end">
              <img src="/OurProcess2.svg" alt="" className="h-[128px] w-[130px] md:h-auto md:w-auto" />
            </div>
            <div className="md:basis-[60%] xl:basis-[57%] md:order-1">
              <h3 className="text-center md:text-left font-poppins font-semibold text-[24px] md:text-[27.3px] leading-[36px] md:leading-[45.5px] tracking-[4%] text-[#000000] left">
                DESIGN
              </h3>
              <p className="text-center md:text-left font-poppins font-light text-[16px] leading-[24px] lg:text-[20px] xl:text-[22px] 3xl:text-[26px] lg:leading-[34px] xl:leading-[38px] 3xl:leading-[43.29px] tracking-[4%] mb-[21.65px] text-[#000000] left">
                Benefit from the experience, knowledge, unique perspective, and efficiency that our experts bring to each project.
              </p>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div>
              <img src="/OurProcessline2.svg" alt="" className="mx-auto h-[80px] lg:h-[127.07px] w-[75%] xl:w-[80%]" />
            </div>
            <img ref={(el) => (airplaneRefs.current[1] = el)} src="/airoplane2.svg" className="absolute top-[12px] right-[220px] lg:top-[30px] xl:right-[350px] right" alt="" />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-0">
            <div className="md:basis-[25%] xl:basis-[35%] flex justify-center md:justify-start">
              <img src="/OurProcess3.svg" alt="" className="h-[128px] w-[130px] md:h-auto md:w-auto" />
            </div>
            <div className="md:basis-[60%] xl:basis-[57%]">
              <h3 className="text-center md:text-left font-poppins font-semibold text-[24px] md:text-[27.3px] leading-[36px] md:leading-[45.5px] tracking-[4%] text-[#000000] right">
                DEVELOPMENT
              </h3>
              <p className="text-center md:text-left font-poppins font-light text-[16px] leading-[24px] lg:text-[20px] xl:text-[22px] 3xl:text-[26px] lg:leading-[34px] xl:leading-[38px] 3xl:leading-[43.29px] tracking-[4%] mb-[21.65px] text-[#000000] right">
                Benefit from the experience, knowledge, unique perspective, and efficiency that our experts bring to each project.
              </p>
            </div>
          </div>
          <div className="relative hidden md:block ">
            <div>
              <img src="/OurProcessline.svg" alt="" className="mx-auto h-[80px] lg:h-[127.07px] w-[75%] xl:w-[80%]" />
            </div>
            <img ref={(el) => (airplaneRefs.current[2] = el)} src="/airoplane.svg" className="absolute top-[12px] left-[220px] lg:top-[30px] xl:left-[350px]" alt="" />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-0">
            <div className="md:basis-[25%] xl:basis-[35%] flex justify-center md:order-2 md:justify-end">
              <img src="/OurProcess4.svg" alt="" className="h-[128px] w-[130px] md:h-auto md:w-auto" />
            </div>
            <div className="md:basis-[60%] xl:basis-[57%] md:order-1">
              <h3 className="text-center md:text-left font-poppins font-semibold text-[24px] md:text-[27.3px] leading-[36px] md:leading-[45.5px] tracking-[4%] text-[#000000] left">
                TESTING
              </h3>
              <p className="text-center md:text-left font-poppins font-light text-[16px] leading-[24px] lg:text-[20px] xl:text-[22px] 3xl:text-[26px] lg:leading-[34px] xl:leading-[38px] 3xl:leading-[43.29px] tracking-[4%] mb-[21.65px] text-[#000000] left">
                Benefit from the experience, knowledge, unique perspective, and efficiency that our experts bring to each project.
              </p>
            </div>
          </div>
          <div className="relative hidden md:block ">
            <div>
              <img src="/OurProcessline2.svg" alt="" className="mx-auto h-[80px] lg:h-[127.07px] w-[75%] xl:w-[80%]" />
            </div>
            <img ref={(el) => (airplaneRefs.current[3] = el)} src="/airoplane2.svg" className="absolute top-[12px] right-[220px] lg:top-[30px] xl:right-[350px] right" alt="" />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-0">
            <div className="md:basis-[25%] xl:basis-[35%] flex justify-center md:justify-start">
              <img src="/OurProcess5.svg" alt="" className="h-[128px] w-[130px] md:h-auto md:w-auto" />
            </div>
            <div className="md:basis-[60%] xl:basis-[57%]">
              <h3 className="text-center md:text-left font-poppins font-semibold text-[24px] md:text-[27.3px] leading-[36px] md:leading-[45.5px] tracking-[4%] text-[#000000] right">
                LAUNCH
              </h3>
              <p className="text-center md:text-left font-poppins font-light text-[16px] leading-[24px] lg:text-[20px] xl:text-[22px] 3xl:text-[26px] lg:leading-[34px] xl:leading-[38px] 3xl:leading-[43.29px] tracking-[4%] mb-[21.65px] text-[#000000] right">
                Benefit from the experience, knowledge, unique perspective, and efficiency that our experts bring to each project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
