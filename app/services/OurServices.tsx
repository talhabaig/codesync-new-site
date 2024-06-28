"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTransition, animated } from "react-spring";
import WebDevelopment from "./ourservices/WebDevelopment";
import GraphicDesign from "./ourservices/GraphicDesign";
import EcommerceSolutions from "./ourservices/EcommerceSolutions";
import MobileDevelopment from "./ourservices/MobileDevelopment";
import ServicesTab from "./ourservices/ServicesTab";

const serviceTab = [
  {
    id: 1,
    title: "Web Development",
    icon: "./icons/OurServices-icon1.svg",
    tab: <WebDevelopment />,
    name: "web-development"
  },
  {
    id: 2,
    title: "WEB & GRAPHIC DESIGNING",
    icon: "./icons/OurServices-icon2.svg",
    tab: <GraphicDesign />,
    name: "graphic-design"
  },
  {
    id: 3,
    title: "E-COMMERCE SOLUTIONS",
    icon: "./icons/OurServices-icon3.svg",
    tab: <EcommerceSolutions />,
    name: "ecommerce"
  },
  {
    id: 4,
    title: "MOBILE APP DEVELOPMENT",
    icon: "./icons/OurServices-icon4.svg",
    tab: <MobileDevelopment />,
    name: "mobile-development"
  },
];

interface OurServicesProps {
  selectedTab: string | null;
}

export default function OurServices({ selectedTab }: OurServicesProps) {
  const [currentTab, setCurrentTab] = useState(serviceTab[0].tab);
  const contentRef = useRef<HTMLDivElement>(null);

  const transitions = useTransition(currentTab, {
    from: { opacity: 0, transform: "scale(0.9)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.9)" },
    config: { duration: 300 },
  });

  const handleTabClick = (tabContent: any) => {
    setCurrentTab(tabContent);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (selectedTab) {
      const tab = serviceTab.find((tab) => tab.name === selectedTab);
      if (tab) {
        setCurrentTab(tab.tab);
      }
    }
  }, [selectedTab]);

  return (
    <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="py-12 md:py-20 xl:py-28 2xl:pb-32">
        <div className="text-center font-poppins">
          <div className="flex items-center gap-2 mb-2 md:gap-8 justify-center uppercase font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl leading-[20px] md:leading-[50px] lg:leading-[69px] tracking-[1.5%]">
            <img
              src="/hori-line.svg"
              className="w-[70px] sm:w-[90px] h-[9px] md:w-[120px] md:h-[12px] lg:w-auto lg:h-auto"
              alt=""
            />
            <div className="font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl 2xl:text-[50px] 2xl:leading-[69px] tracking-[1.5%]">
              <span className="text-customBlue1">Our </span>{" "}
              <span className="text-customDarkGray">services</span>
            </div>
            <img
              src="/hori-line2.svg"
              className="w-[70px] sm:w-[90px] h-[9px] md:w-[120px] md:h-[12px] lg:w-auto lg:h-auto"
              alt=""
            />
          </div>
          <div className="mb-4 md:mb-[25px] text-[18px] md:text-[20px] lg:text-[22px] font-light leading-[32.78px] tracking-[2%]">
            We let our ideas grow!
          </div>
        </div>

        <ServicesTab tabs={serviceTab} setSelectedTab={handleTabClick} />
        <div ref={contentRef} className="w-full">
          {transitions((style, item) =>
            item ? <animated.div style={style}>{item}</animated.div> : null
          )}
        </div>
      </div>
    </div>
  );
}
