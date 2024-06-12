import React from "react";

function MobileDevelopment() {
  const MobileDevelopmentDetail = [
    {
      img: "/OurServices-img1.svg",
      heading: "FRONT-END",
      content:
        "Codesync Company delivers top-notch Frontend Development Services, ensuring UI excellence, robust frameworks (REACT, ANGULAR, or VUE.JS), and seamless user experiences across devices. From design to maintenance, we elevate your web presence for lasting impact.",
    },
    {
      img: "/OurServices-img2.svg",
      heading: "BACK-END",
      content:
        "Codesync provides robust Backend Development Services: DATABASE DESIGN & MANAGEMENT, SERVER-SIDE Scripting, API DEVELOPNMENT, CLOUD Infrastructure, DATA SECURITY, LOAD Balancing, Scalability, Performance Optimization, Testing, and Ongoing maintenance. Secure, efficient backend systems guaranteed.",
    },
    {
      img: "/OurServices-img3.svg",
      heading: "Full-Cycle",
      content:
        "Codesync Company offers Full-Cycle Development, covering concept Ideation UI/UX DESIGN FRONTEND & BACKEND DEVELOPNMENT, QUALITY ASSURANCE, Deployment, and Ongoing Maintenance. Our approach ensures seamless digital solutions from inception to operation",
    },
  ];
  return (
    <div className="px-8 py-12 sm:p-12 xl:px-36 xl:py-24 2xl:px-48">
      <div className="mb-12 md:mb-16 xl:mb-24">
        <p className="">
          <span className="text-[#0693EB] uppercase font-bold text-[25px] md:text-[40px] 2xl:text-[48.6px] leading-[40px] md:leading-[50px] 2xl:leading-[60.51px]">
            MOBILE APP DEVELOPMENT
          </span>
        </p>
        <p className="font-Chenla text-[16px] md:text-xl 2xl:text-2xl leading-[20px] md:leading-[25px] 2xl:leading-[39.96px] mb-[17.2px] tracking-[4%] 2xl:w-[80%]">
          Crafting engaging mobile experiences with our expert Mobile App
          Development solutions, bringing your vision to life across all devices
          for exceptional user experiences.
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:flex-wrap mb-6 md:mb-12">
        {MobileDevelopmentDetail.map((detail, index) => (
          <div key={index} className="basis-[46%]">
            <img src={detail.img} alt="" />
            <p className="my-4">
              <span className="font-bold text-2xl 2xl:text-[28.25px] 2xl:leading-[47.04px] tracking-[4%] text-[#0693EB]">
                {detail.heading}{" "}
              </span>
            </p>
            <p className="font-normal text-lg 2xl:text-[22px] 2xl:leading-[35.86px] mb-[7rem] tracking-[2%] text-[#454545]">
              {detail.content}
            </p>
          </div>
        ))}
        <div className="md:basis-[46%] 2xl:basis-[42%]">
          <img src="/Ourservices-img.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default MobileDevelopment;
