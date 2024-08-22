import React from "react";

function MobileDevelopment() {
  const MobileDevelopmentDetail = [
    {
      img: "/OurServices-img1.svg",
      heading: "FRONT-END",
      content:
        "At Codesync Company, we specialize in top-tier Frontend Development Services that deliver outstanding UI design and flawless user experiences across all devices. Leveraging powerful frameworks like React, Angular, Vue.js, and Next.js, we ensure your website stands out. From concept to continuous maintenance, our expertise elevates your web presence and makes a lasting impression.",
    },
    {
      img: "/OurServices-img2.svg",
      heading: "BACK-END",
      content:
        "Codesync delivers powerful Backend Development Services, including database design and management, server-side scripting, API development, cloud infrastructure, data security, load balancing, scalability, performance optimization, testing, and ongoing maintenance. We ensure secure, efficient backend systems tailored to your needs.",
    },
    {
      img: "/OurServices-img3.svg",
      heading: "Full-Cycle",
      content:
        "Codesync provides comprehensive Full-Cycle Development services, encompassing concept ideation, UI/UX design, frontend and backend development, quality assurance, deployment, and ongoing maintenance. Our all-inclusive approach guarantees seamless digital solutions from initial concept to final operation.",
    },
  ];
  return (
    <div className="px-8 py-12 sm:p-12 xl:px-36 xl:py-24 2xl:px-48">
      <div className="">
        <p className="">
          <h1 className="text-[#0693EB] uppercase font-bold text-[25px] md:text-[40px] 2xl:text-[48.6px] leading-[35px] md:leading-[50px] 2xl:leading-[60.51px]">
            MOBILE APP DEVELOPMENT
          </h1>
        </p>
        <p className="font-Chenla text-[16px] md:text-xl 2xl:text-2xl leading-[20px] md:leading-[25px] 2xl:leading-[39.96px] mb-[17.2px] tracking-[4%] 2xl:w-[80%]">
          Crafting engaging mobile experiences with our expert Mobile App
          Development solutions, bringing your vision to life across all devices
          for exceptional user experiences.
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:flex-wrap gap-12 mb-6 md:mb-12">
        {MobileDevelopmentDetail.map((detail, index) => (
          <div key={index} className="basis-[46%]">
            <img src={detail.img} alt="" />
            <p className="my-4">
              <h3 className="font-bold text-2xl 2xl:text-[28.25px] 2xl:leading-[47.04px] tracking-[4%] text-[#0693EB]">
                {detail.heading}{" "}
              </h3>
            </p>
            <p className="font-normal text-lg 2xl:text-[22px] 2xl:leading-[35.86px] tracking-[2%] text-[#454545]">
              {detail.content}
            </p>
          </div>
        ))}
        <div className="md:basis-[46%] 2xl:basis-[42%] flex justify-center items-center">
          <img src="/Ourservices-img.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default MobileDevelopment;
