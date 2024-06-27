export default function WhatWeDo() {
  const services = [
    {
      imgSrc: "/wwd-web.svg",
      title: "Web Development",
      description: "We specialize in providing comprehensive e-commerce solutions that cater to the diverse needs of businesses in the digital marketplace. Our expertise spans from creating user-friendly online stores to implementing secure payment gateways, ensuring a seamless shopping experience for your customers. With our innovative approach and cutting-edge technology, we help businesses optimize their online presence, increase sales, and build lasting customer relationships. Trust us to transform your e-commerce vision into a thriving reality.",
    },
    {
      imgSrc: "/wwd-E-comerce.svg",
      title: "E-Commerce Solutions",
      description: "Our web development team is dedicated to building robust, scalable, and high-performing websites that drive business growth. We pride ourselves on delivering custom web solutions tailored to meet the unique needs of each client. From front-end design to back-end development, our skilled developers use the latest technologies and best practices to create websites that are not only visually appealing but also highly functional and responsive. Let us help you establish a powerful online presence that stands out in today’s competitive digital landscape.",
    },
    {
      imgSrc: "/wwd-graphic.svg",
      title: "Web & Graphic Designing",
      description: "Our web and graphic design services are crafted to elevate your brand and captivate your audience. Our talented designers combine creativity with technical expertise to produce visually stunning designs that communicate your brand's message effectively. Whether it’s designing a logo, creating a brand identity, or developing a website layout, we ensure that every design element aligns with your business goals and resonates with your target audience. Partner with us to bring your creative vision to life and make a lasting impression in the digital world.",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="2xl:container 2xl:mx-auto py-12 px-8 md:px-12 md:py-20 xl:px-24 xl:py-28 2xl:px-12 2xl:pb-32">
        <div className="text-center font-poppins">
          <div className="flex items-center gap-2 mb-2 2xl:mb-3 md:gap-8 justify-center uppercase font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl 2xl:leading-[69px] tracking-[1.5%]">
            <img src="/hori-line.svg" className='w-[70px] sm:w-[90px] h-[9px] md:w-[120px] md:h-[12px] lg:w-auto lg:h-auto' alt="" />
            <div>
              <span className="text-customBlue1">What</span>{" "}
              <span className="text-customDarkGray">we do?</span>
            </div>
            <img src="/hori-line2.svg" className='w-[70px] sm:w-[90px] h-[9px] md:w-[120px] md:h-[12px] lg:w-auto lg:h-auto' alt="" />
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