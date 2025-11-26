"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTransition, animated } from "react-spring";
import WebDevelopment from "./ourservices/WebDevelopment";
import GraphicDesign from "./ourservices/GraphicDesign";
import EcommerceSolutions from "./ourservices/EcommerceSolutions";
import MobileDevelopment from "./ourservices/MobileDevelopment";
import ServicesTab from "./ourservices/ServicesTab";

// ---------------- OUR SERVICES ARRAY ----------------
const serviceTab = [
  {
    id: 1,
    title: "Web Development",
    icon: "/icons/OurServices-icon1.svg",
    tab: <WebDevelopment />,
    name: "web-development",
  },
  {
    id: 2,
    title: "WEB & GRAPHIC DESIGNING",
    icon: "/icons/OurServices-icon2.svg",
    tab: <GraphicDesign />,
    name: "graphic-design",
  },
  {
    id: 3,
    title: "E-COMMERCE SOLUTIONS",
    icon: "/icons/OurServices-icon3.svg",
    tab: <EcommerceSolutions />,
    name: "ecommerce",
  },
  {
    id: 4,
    title: "MOBILE APP DEVELOPMENT",
    icon: "/icons/OurServices-icon4.svg",
    tab: <MobileDevelopment />,
    name: "mobile-development",
  },
];

// ------------------- OUR STACKS ARRAY -------------------
const stackList = [
  { id: 1, name: "React", logo: "/icons/react.svg" },
  { id: 2, name: "Angular", logo: "/icons/angular.svg" },
  { id: 3, name: "Vue.js", logo: "/icons/vue.svg" },
  { id: 4, name: ".NET", logo: "/icons/dotnet.svg" },
  { id: 5, name: "Node.js", logo: "/icons/node.svg" },
  { id: 6, name: "SQL", logo: "/icons/sql.svg" },
  { id: 7, name: "MongoDB", logo: "/icons/mongo.svg" },
  { id: 8, name: "Python", logo: "/icons/python.svg" },
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
    <>
      {/* ========== OUR STACKS SECTION ========== */}
      <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue pt-14 md:pt-20 lg:pt-24">
        <div className="text-center font-poppins mb-10">
          {/* Top horizontal line and title */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-2">
            <img
              src="/hori-line.svg"
              className="w-[70px] sm:w-[90px] h-[9px] md:w-[120px] md:h-[12px]"
              alt=""
            />
            <div className="text-center">
              <h1 className="font-bold uppercase text-lg md:text-2xl lg:text-3xl xl:text-5xl 2xl:text-[50px] 2xl:leading-[69px] text-customDarkGray tracking-[1.5%]">
                <span className="text-customBlue1">Our</span> Stacks
              </h1>
              <p className="mt-2 text-[18px] md:text-[20px] lg:text-[22px] font-light text-gray-800">
                Technologies we work with
              </p>
            </div>
            <img
              src="/hori-line2.svg"
              className="w-[70px] sm:w-[90px] h-[9px] md:w-[120px] md:h-[12px]"
              alt=""
            />
          </div>
        </div>

        {/* Logos grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 px-6 md:px-16 lg:px-24 justify-items-center">
          {stackList.map((stack) => (
            <div key={stack.id} className="flex flex-col items-center text-center">
              <img
                src={stack.logo}
                alt={stack.name}
                className="w-20 h-20 md:w-24 md:h-24 object-contain"
              />
              <p className="mt-3 text-base md:text-lg font-medium text-gray-800">
                {stack.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ========== OUR SERVICES SECTION ========== */}
      <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
        <div className="py-12 md:py-20 xl:py-28 2xl:pb-32">
          <div className="text-center font-poppins">
            <div className="flex items-center gap-2 mb-2 md:gap-8 justify-center uppercase font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl leading-[20px] md:leading-[50px] lg:leading-[69px] tracking-[1.5%]">
              <img
                src="/hori-line.svg"
                className="w-[70px] sm:w-[90px] h-[9px] md:w-[120px] md:h-[12px]"
                alt=""
              />
              <div className="text-center">
                <h1 className="font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl 2xl:text-[50px] 2xl:leading-[69px] tracking-[1.5%]">
                  <span className="text-customBlue1">Our </span>
                  <span className="text-customDarkGray">services</span>
                </h1>
                <h2 className="mb-4 md:mb-[25px] text-[18px] md:text-[20px] lg:text-[22px] font-light">
                  We let our ideas grow!
                </h2>
              </div>
              <img
                src="/hori-line2.svg"
                className="w-[70px] sm:w-[90px] h-[9px] md:w-[120px] md:h-[12px]"
                alt=""
              />
            </div>
          </div>

          <ServicesTab tabs={serviceTab} setSelectedTab={handleTabClick} />

          <div ref={contentRef} className="w-full mt-6">
            {transitions((style, item) =>
              item ? <animated.div style={style}>{item}</animated.div> : null
            )}
          </div>
        </div>
      </div>
    </>
  );
}
