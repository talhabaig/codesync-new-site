import React from 'react'

const services = [
  {
    title: "Web Development",
    icon: "./icons/OurServices-icon1.svg",
    description: "Our software company offers a comprehensive suite of services designed to meet your digital needs. From custom software development to web and mobile app solutions.",
    details: [
      {
        img: "/OurServices-img1.svg",
        heading: "FRONT-END",
        content: "Codesync Company delivers top-notch Frontend Development Services, ensuring UI excellence, robust frameworks (REACT, ANGULAR, or VUE.JS), and seamless user experiences across devices. From design to maintenance, we elevate your web presence for lasting impact."
      },
      {
        img: "/OurServices-img2.svg",
        heading: "BACK-END",
        content: "Codesync provides robust Backend Development Services: DATABASE DESIGN & MANAGEMENT, SERVER-SIDE Scripting, API DEVELOPNMENT, CLOUD Infrastructure, DATA SECURITY, LOAD Balancing, Scalability, Performance Optimization, Testing, and Ongoing maintenance. Secure, efficient backend systems guaranteed."
      }
    ]
  },
  {
    title: "WEB & GRAPHIC DESIGNING",
    icon: "./icons/OurServices-icon2.svg",
  },
  {
    title: "E-COMMERCE SOLUTIONS",
    icon: "./icons/OurServices-icon3.svg",
  },
  {
    title: "MOBILE APP DEVELOPMENT",
    icon: "./icons/OurServices-icon4.svg",
  }
]

export default function OurServices() {
  return (
    <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="py-12 xl:py-24 2xl:pb-32">
        <div className="text-center font-poppins">
          <div className="flex items-center gap-2 md:gap-8 justify-center uppercase font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl leading-[20px] md:leading-[50px] lg:leading-[69px] tracking-[1.5%]">
            <img src="/hori-line.svg" className='w-[110px] h-[9px] md:w-auto md:h-auto' alt="" />
            <div className="font-bold 2xl:text-[50px] 2xl:leading-[69px] tracking-[1.5%]">
              <span className="text-customBlue1">Our </span>{" "}
              <span className="text-customDarkGray">services</span>
            </div>
            <img src="/hori-line2.svg" className='w-[110px] h-[9px] md:w-auto md:h-auto' alt="" />
          </div>
          <div className="mb-4 md:mb-[25px] text-[18px] md:text-[20px] lg:text-[22px] font-light leading-[32.78px] tracking-[2%]">
            We let our ideas grow!
          </div>
        </div>

        <div className="p-12 xl:px-36 xl:py-24" style={{ backgroundImage: 'url("/Frame.svg")' }}>
          <div className="flex flex-col md:flex-row gap-[55px] justify-around">
            {services.map((service, index) => (
              <div key={index} className="basis-1/4 flex flex-col justify-center items-center gap-[30px] cursor-pointer">
                <div className="h-[229px] w-[229px] rounded-[28.2px] bg-gradient-to-b from-customDarkBlue to-customMediumBlue flex justify-center items-center">
                  <img src={service.icon} alt="" className="" />
                </div>
                <div className="flex flex-col items-center justify-center md:justify-start md:items-start">
                  <span className="font-poppins text-[#3F3F3F] text-center uppercase text-[26.48px] md:text-[20px] lg:text-[26.48px] font-bold leading-[39.72px] md:leading-[30px] lg:leading-[39.72px] tracking-[6%] hover:text-customBlue1">{service.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {services[0].details && (
          <div className='p-12 xl:px-36 xl:py-24'>
            <div className='mb-24'>
              <span className='text-[#0693EB] font-bold text-[48.6px] leading-[60.51px]'>{services[0].title.toUpperCase()} </span>
              <p className='font-Chenla text-2xl leading-[39.96px] mb-[17.2px] tracking-[4%] 2xl:w-[73%]'>{services[0].description}</p>
            </div>

            <div className='flex flex-col md:flex-row md:gap-[28.9px]'>
              {services[0].details.map((detail, index) => (
                <div key={index} className='basis-[42%]'>
                  <img src={detail.img} alt="" />
                  <span className='font-bold text-[28.25px] leading-[47.04px] mb-[19.11px] tracking-[4%] text-[#0693EB]'>{detail.heading} </span>
                  <p className='font-normal text-[22px] leading-[35.86px] mb-[19.11px] tracking-[2%] text-[#454545]'>{detail.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}