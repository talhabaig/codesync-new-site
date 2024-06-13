"use client";
import React, { useEffect } from "react";
import Hero from "../Hero";
import data from "portfolio.json";
import { getImagePath } from "../utils";
interface Props {
  params: {
    project: string;
  };
}

const Page: React.FC<Props> = (props) => {
  const projectId = Number(props.params.project);
  const item = data.find((item) => item.id === projectId);
  // useEffect(()=>{
  //   console.log("zzzzzzzzz",item)
  // })
  return (
    <>
      <Hero
        title={item?.title}
        description={item?.description}
        sitename={item?.details.siteName}
        sitelink={item?.details.siteLink}
      />
      {item && (
        <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
          <div className="hidden md:block bg-[url('/Frame.svg')] bg-no-repeat bg-cover bg-bottom h-[300px] md:h-[350px] lg:h-[400px] xl:h-[537px] w-full p-8 md:p-24">
            
          </div>
          <div className="md:mt-[-300px] lg:mt-[-320px] xl:mt-[-460px] p-8 md:px-24">
            <div className="flex justify-center md:my-4">
              <div className="2xl:basis-[60%] 3xl:basis-[57%] text-customBlue1 font-work-sans font-medium text-[18px] md:text-[22px] lg:text-[26px] leading-[22px] md:leading-[25px] lg:leading-[31.46px] text-center">
                {item.details.image1Desc}
              </div>
            </div>
            <div className="flex justify-center my-8 xl:my-12">
              <div className="xl:basis-[80%]">
                <img
                  src={getImagePath(item.details.image1)}
                  className="w-full"
                  alt={item.title}
                />
              </div>
            </div>
            <div className="flex justify-center md:my-4">
              <div className="2xl:basis-[60%] 3xl:basis-[57%] text-customBlue1 font-work-sans font-medium text-[18px] md:text-[22px] lg:text-[26px] leading-[22px] md:leading-[25px] lg:leading-[31.46px] text-center">
                {item.details.image2Desc}
              </div>
            </div>
            <div className="flex justify-center my-8 xl:my-12">
              <div className="xl:basis-[80%]">
                <img
                  src={getImagePath(item.details.image2)}
                  className="w-full"
                  alt={item.title}
                />
              </div>
            </div>
            <div className="flex justify-center md:my-4">
              <div className="2xl:basis-[60%] 3xl:basis-[57%] text-customBlue1 font-work-sans font-medium text-[18px] md:text-[22px] lg:text-[26px] leading-[22px] md:leading-[25px] lg:leading-[31.46px] text-center">
                {item.details.image3Desc}
              </div>
            </div>
            <div className="flex justify-center my-8 xl:my-12">
              <div className="xl:basis-[80%]">
                <img
                  src={getImagePath(item.details.image3)}
                  className="w-full"
                  alt={item.title}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
