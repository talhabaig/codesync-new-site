import React from "react";

export default function Hero() {
  return (
    <div className="w-full text-white max-h-[818px] bg-gradient-to-r from-[#237DCE] to-[#C3FAFA]">
      <div className="bg-[url('/projectdetails-hero-bg.svg')] bg-right bg-no-repeat p-24 flex">
        <div className="flex flex-col basis-[65%] pt-20">
          <div className="uppercase font-poppins font-bold text-2xl md:text-xl lg:text-3xl xl:text-4xl 2xl:text-[50px] leading-[35px] md:leading-[30px] lg:leading-[40px] lg:mb-2 xl:leading-[45px] 2xl:leading-[55px] tracking-[15%]">
            <span className="">Embold</span>
          </div>
          <p className="mb-4 md:mb-2 lg:mb-4 font-work-sans font-light text-[16px] md:text-[13.3px] lg:text-[16px] xl:text-[18px] 2xl:text-[26px] leading-[24px] md:leading-[24px] xl:leading-[31.46px]">
          We had the privilege of creating a dynamic website for prominent influencers. This website is a vibrant reflection of the influencer's personal brand and online presence.
          </p>
        </div>
      </div>
    </div>
  );
}
