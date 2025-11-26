"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface propstype {
  title: string | undefined;
  description: string | undefined;
  sitename: string | undefined;
  sitelink: string | undefined;
}

export default function Hero({
  title,
  description,
  sitename,
  sitelink,
}: propstype) {

  const router = useRouter();

  return (
    <div className="w-full text-white max-h-[818px] bg-gradient-to-r from-[#237DCE] to-[#C3FAFA] relative">

      {/* 🔙 Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-3 left-3 md:top-4 md:left-4 
                   px-3 py-1.5 md:px-4 md:py-2 
                   bg-white/20 hover:bg-white/30 backdrop-blur-md 
                   text-black rounded-lg text-sm md:text-base font-medium"
      >
        ← Back
      </button>

      <div className="bg-[url('/projectdetails-hero-bg.svg')] bg-right bg-no-repeat 
                      p-6 sm:p-8 md:p-12 lg:p-24 flex">

        <div
          className="flex flex-col md:basis-[85%] lg:basis-[75%] xl:basis-[65%]
                     xl:pt-20 
                     mt-14 sm:mt-20 md:mt-24 lg:mt-0"
        >

          {/* Title */}
          <div
            className="fly-in-1s uppercase font-poppins font-bold 
                       text-xl sm:text-2xl md:text-xl lg:text-3xl xl:text-4xl 
                       2xl:text-[50px] 
                       leading-[30px] sm:leading-[35px] md:leading-[30px] 
                       lg:leading-[40px] xl:leading-[45px] 2xl:leading-[55px] 
                       tracking-[15%] mb-3"
          >
            <span>{title}</span>
          </div>

          {/* Description */}
          <p
            className="fly-in-1-5s mb-4 md:mb-2 lg:mb-4 
                       font-work-sans font-light 
                       text-[15px] sm:text-[16px] md:text-[16.3px] 
                       lg:text-[20px] xl:text-[22px] 2xl:text-[26px] 
                       leading-[22px] sm:leading-[24px] md:leading-[24px] 
                       lg:leading-[28px] xl:leading-[31.46px]"
          >
            <span>{description}</span>&nbsp;
            <a
              href={sitelink}
              target="_blank"
              className="font-bold italic text-black cursor-pointer underline"
            >
              {sitename}
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}
