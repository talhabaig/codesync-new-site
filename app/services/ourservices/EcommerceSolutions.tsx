import React from "react";

function EcommerceSolutions() {
  return (
    <div className="px-8 py-12 sm:p-12 xl:px-36 xl:py-24 2xl:px-48">
      <div className="mb-12 md:mb-16 xl:mb-24">
        <p className="">
          <h1 className="text-[#0693EB] font-bold text-[25px] md:text-[40px] 2xl:text-[48.6px] leading-[40px] md:leading-[50px] 2xl:leading-[60.51px]">
            E-COMMERCE SOLUTIONS
          </h1>
        </p>
        <p className="font-Chenla text-[16px] md:text-xl 2xl:text-2xl leading-[20px] md:leading-[25px] 2xl:leading-[39.96px] mb-[17.2px] tracking-[4%] 2xl:w-[80%]">
          Transform your online business with our advanced E-commerce Solutions.
          Maximize sales and enhance customer experience with customizable
          storefronts and seamless payment processing.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-0 md:justify-between md:items-center">
        <div className="md:basis-[46%] 2xl:basis-[49%] flex items-center">
          <div className="">
            <img src="/EcommerceSolution.svg" alt="" />
            <p className="my-4">
              <h3 className="font-bold text-2xl 2xl:text-[28.25px] 2xl:leading-[47.04px] tracking-[4%] text-[#0693EB]">
                E-Commerce Solution
              </h3>
            </p>
            <p className="font-normal text-lg 2xl:text-[22px] 2xl:leading-[35.86px] mb-[19.11px] tracking-[2%] text-[#454545]">
            Codesync provides a comprehensive E-Commerce solution crafted to optimize online transactions for buying and selling products and services. Our platform features advanced tools and technologies to simplify product catalog management, including easy addition, editing, and organization of items. Customize essential product attributes such as pricing, availability, variations, size, color, and inventory levels with ease. Enhance your online store's performance with built-in SEO capabilities, seamless email marketing integration, social media sharing options, discount code management, loyalty programs, and tailored product recommendations.
            </p>
          </div>
        </div>
        <div className="md:basis-[46%] 2xl:basis-[42%]">
          <img src="/EcommerceSolution.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default EcommerceSolutions;
