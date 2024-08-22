"use client";
import { useEffect, useRef } from "react";

export default function WhatWeDo() {
  const whatwedoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fly-in-top");
          } else {
            entry.target.classList.remove("fly-in-top");
          }
        });
      },
      { threshold: 0 }
    );

    whatwedoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      whatwedoRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  const services = [
    {
      imgSrc: "/wwd-web.svg",
      title: "Web Development",
      description: "We offer specialized e-commerce solutions designed to meet the varied needs of businesses in the digital marketplace. Our expertise encompasses everything from developing user-friendly online stores to integrating secure payment gateways, guaranteeing a smooth and secure shopping experience for your customers. Leveraging our innovative strategies and advanced technology, we enhance your online presence, boost sales, and foster long-term customer relationships. Partner with us to turn your e-commerce vision into a successful and thriving reality.",
    },
    {
      imgSrc: "/wwd-E-comerce.svg",
      title: "E-Commerce Solutions",
      description: "Our web development team is committed to creating robust, scalable, and high-performance websites that drive business growth. We specialize in delivering bespoke web solutions tailored to the specific needs of each client. From intuitive front-end design to reliable back-end development, our expert developers utilize the latest technologies and industry best practices to build visually captivating and highly functional websites. Partner with us to establish a powerful online presence that excels in today’s competitive digital landscape.",
    },
    {
      imgSrc: "/wwd-graphic.svg",
      title: "Web & Graphic Designing",
      description: "Our web and graphic design services are expertly crafted to enhance your brand and engage your audience. Our skilled designers blend creativity with technical proficiency to deliver visually captivating designs that effectively convey your brand’s message. From logo creation and brand identity development to website layout design, we ensure each element aligns with your business objectives and appeals to your target audience. Collaborate with us to transform your creative vision into a compelling digital presence and leave a lasting impact in the online world.",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="py-12 px-0 md:px-0 md:py-20 xl:px-0 xl:py-28 2xl:px-0 2xl:pb-32">
        <div className="text-center font-poppins">
          <div className="flex items-center gap-2 mb-2 2xl:mb-3 md:gap-8 justify-center uppercase font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl 2xl:leading-[69px] tracking-[1.5%]">
            <img src="/hori-line.svg" className='w-[70px] sm:w-[90px] h-[9px] md:w-[120px] md:h-[12px] lg:w-auto lg:h-auto' alt="" />
            <h1>
              <span className="text-customBlue1">What</span>{" "}
              <span className="text-customDarkGray">we do?</span>
            </h1>
            <img src="/hori-line2.svg" className='w-[70px] sm:w-[90px] h-[9px] md:w-[120px] md:h-[12px] lg:w-auto lg:h-auto' alt="" />
          </div>
          <h2 className="mb-4 md:mb-[25px] text-[18px] md:text-[20px] lg:text-[22px] font-light leading-[32.78px] tracking-[2%] text-customDarkGray">
            We let our ideas grow!
          </h2>
        </div>

        <div className="pt-12 lg:pt-16 px-4 xs:px-8 md:px-12 lg:px-[56px] xl:px-24" style={{ backgroundImage: 'url("/Frame2.svg")' }}>
          <div className="flex flex-wrap flex-col md:flex-row gap-8 md:gap-6 2xl:gap-12 3xl:gap-[100px] md:px-2 xl:px-0 pb-12 pd:mb-16 lg:pb-24">
            {services.map((service, index) => (
              <div ref={(el) => (whatwedoRefs.current[index] = el)} key={index} className="md:basis-[30.5%] lg:basis-[31%] xl:basis-[30%] 3xl:basis-[28%] flex flex-col justify-center items-center md:items-start md:justify-start gap-[30px] initial-hidden">
                <div className="h-[108px] w-[108px] rounded-[13.3px] bg-gradient-to-b from-customDarkBlue to-customMediumBlue flex justify-center items-center hover:shadow-[0_0_30px_#5ba5f9] hover:outline hover:outline-4 hover:outline-white cursor-pointer">
                  <img src={service.imgSrc} alt="" className="" />
                </div>
                <div className="flex flex-col items-center justify-center md:justify-start md:items-start">
                  <h3 className="font-poppins text-center md:text-start uppercase text-[26.48px] md:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[26.48px] font-semibold leading-[39.72px] md:leading-[30px] lg:leading-[39.72px] tracking-[6%]">{service.title}</h3>
                  <p className="text-center md:text-start font-Chenla text-[14px] leading-[25.75px]">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="flex justify-center">
            <button className="text-white font-poppins font-light text-[24.7px] leading-[37.05px] py-2 px-4 md:px-2 lg:px-4 rounded-[9.61px] bg-gradient-to-b from-customBrightBlue to-customLightBlue2 md:w-[140px] lg:w-[208px] lg:h-[62.85px]">
              See More
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}