"use client"
import React, { useEffect } from "react";
import Hero from "./Hero";
import data from "portfolio.json";


export default function ProjectDetails() {

  useEffect (()=>{
    const item = data.find((item) => item.id)
  },[])
  return (
    <>
      <Hero />
      
      {/* {data.map((project, index) => (
        <div key={index} className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue ">
          <div className="bg-[url('/Frame.svg')] bg-no-repeat bg-cover bg-bottom h-[537px] w-full flex justify-center p-8 md:p-24">
            <div className="2xl:basis-[60%] 3xl:basis-[57%] text-customBlue1 font-work-sans font-medium text-[26px] leading-[31.46px] text-center">
              {project.details.image1Desc}
            </div>
          </div>
          <div className="mt-[-260px]">
            <div className="flex justify-center">
              <div className="basis-[80%] mb-12">
                <img src={project.details.image1} className="" alt="" />
              </div>
            </div>
            <div className="flex justify-center p-8 md:py-16 md:px-24">
              <div className="basis-[57%] text-customBlue1 font-work-sans font-medium text-[26px] leading-[31.46px] text-center">
                {project.details.image2Desc}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="basis-[80%] mb-12">
                <img src={project.details.image2} className="" alt="" />
              </div>
            </div>
            <div className="flex justify-center p-8 md:py-16 md:px-24">
              <div className="basis-[57%] text-customBlue1 font-work-sans font-medium text-[26px] leading-[31.46px] text-center">
                {project.details.image3Desc}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="basis-[80%] mb-12">
                <img src={project.details.image3} className="" alt="" />
              </div>
            </div>
          </div>
        </div>
      ))} */}
    </>
  );
}