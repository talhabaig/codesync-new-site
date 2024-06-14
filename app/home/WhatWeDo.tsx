export default function WhatWeDo() {
  const services = [
    {
      imgSrc: "/wwd-web.svg",
      title: "Web Development",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing labore et Lorem ipsum dolor sit",
    },
    {
      imgSrc: "/wwd-E-comerce.svg",
      title: "E-Commerce Solutions",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing labore et Lorem ipsum dolor sit",
    },
    {
      imgSrc: "/wwd-graphic.svg",
      title: "Web & Graphic Designing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et Lorem ipsum dolor sit amet, consectetur adipiscing labore et Lorem ipsum dolor sit",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="2xl:container 2xl:mx-auto py-12 px-8 md:p-12 xl:p-24 2xl:px-12 2xl:pb-32">
        <div className="text-center font-poppins">
          <div className="flex items-center gap-2 mb-2 2xl:mb-3 md:gap-8 justify-center uppercase font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl 2xl:leading-[69px] tracking-[1.5%]">
            <img src="/hori-line.svg" className='w-[85px] h-[9px] md:w-[120px] md:h-[12px] lg:w-auto lg:h-auto' alt="" />
            <div>
              <span className="text-customBlue1">What</span>{" "}
              <span className="text-customDarkGray">we do?</span>
            </div>
            <img src="/hori-line2.svg" className='w-[85px] h-[9px] md:w-[120px] md:h-[12px] lg:w-auto lg:h-auto' alt="" />
          </div>
          <div className="mb-4 md:mb-[25px] text-[18px] md:text-[20px] lg:text-[22px] font-light leading-[32.78px] tracking-[2%] text-customDarkGray">
            We let our ideas grow!
          </div>
        </div>

        <div className="pt-12 lg:pt-16">
          <div className="flex flex-wrap flex-col md:flex-row gap-8 md:gap-6 2xl:gap-12 3xl:gap-[110px] md:px-2 xl:px-0 mb-12 md:mb-16 lg:mb-24">
            {services.map((service, index) => (
              <div key={index} className="md:basis-[48%] lg:basis-[30%] 3xl:basis-[28%] flex flex-col justify-center items-center md:items-start md:justify-start gap-[30px]">
                <div className="h-[108px] w-[108px] rounded-[13.3px] bg-gradient-to-b from-customDarkBlue to-customMediumBlue flex justify-center items-center">
                  <img src={service.imgSrc} alt="" className="" />
                </div>
                <div className="flex flex-col items-center justify-center md:justify-start md:items-start">
                  <span className="font-poppins text-center md:text-start uppercase text-[26.48px] md:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[26.48px] font-semibold leading-[39.72px] md:leading-[30px] lg:leading-[39.72px] tracking-[6%]">{service.title}</span>
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