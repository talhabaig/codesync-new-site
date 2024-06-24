import React from "react";
import data from "portfolio.json";

interface propstype {
  title: string | undefined;
  description: string | undefined;
  sitename: string | undefined;
  sitelink: string | undefined;
}
export default function Hero({ title, description,sitename,sitelink }: propstype) {
  console.log();
  return (
    <div className="w-full text-white max-h-[818px] bg-gradient-to-r from-[#237DCE] to-[#C3FAFA]">
      <div className="bg-[url('/projectdetails-hero-bg.svg')] bg-right bg-no-repeat p-12 md:p-24 flex">
        <div className="flex flex-col md:basis-[85%] lg:basis-[75%] xl:basis-[65%] xl:pt-20">
          <div className="uppercase font-poppins font-bold text-2xl md:text-xl lg:text-3xl xl:text-4xl 2xl:text-[50px] leading-[35px] md:leading-[30px] lg:leading-[40px] lg:mb-2 xl:leading-[45px] 2xl:leading-[55px] tracking-[15%]">
            <span className="">{title}</span>
          </div>
          <p className="mb-4 md:mb-2 lg:mb-4 font-work-sans font-light text-[16px] md:text-[16.3px] lg:text-[20px] xl:text-[22px] 2xl:text-[26px] leading-[24px] md:leading-[24px] lg:leading-[28px] xl:leading-[31.46px]">
            <span>
              {description}
            </span>&nbsp;
              <a
                href={sitelink}
                target="_blank" className="underline text-customNavy hover:text-customBlue1 font-medium"
              >{sitename}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
