"use client";
import React from "react";

function ServicesTab({ tabs, setSelectedTab }: any) {
  return (
    <div
      className="p-12 xl:px-36 xl:py-24"
      style={{ backgroundImage: 'url("/Frame.svg")' }}
    >
      <div className="flex flex-col md:flex-row gap-[40px] md:gap-[30px] lg:gap-[10px] xl:gap-[55px] justify-around">
        {tabs.map((tab: any, index: number) => (
          <div
            onClick={() => setSelectedTab(tab.tab)}
            key={index}
            className="group basis-1/4 flex flex-col justify-start items-center gap-[20px] hover:text-customBlue1 md:gap-[30px] lg:gap-[25px] xl:gap-[30px] cursor-pointer"
          >
            <div className="w-[140px] h-[140px] xl:h-[229px] xl:w-[229px] group-hover:w-[150px] group-hover:h-[150px] md:group-hover:h-[140px] md:group-hover:w-[140px] xl:group-hover:h-[235px] xl:group-hover:w-[235px] rounded-[28.2px] bg-gradient-to-b from-customDarkBlue to-customMediumBlue flex justify-center items-center group-hover:shadow-[0_0_30px_#15a7c5] group-hover:outline group-hover:outline-4 group-hover:outline-white ">
              <img
                src={tab.icon}
                alt=""
                className="h-[100px] w-[100px] xl:h-auto xl:w-auto"
              />
            </div>
            <div className="flex flex-col items-center justify-center md:justify-start md:items-start">
              <span className="font-poppins text-[#3F3F3F] text-center uppercase text-[26.48px] md:text-[18px] xl:text-[26.48px] font-bold leading-[39.72px] md:leading-[30px] xl:leading-[39.72px] tracking-[6%] group-hover:text-customBlue1">
                {tab.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesTab;
