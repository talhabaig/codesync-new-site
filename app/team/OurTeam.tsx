import React from "react";
import { getImagePath } from "./utils.js";
export default function OurTeam() {
  const teamMembers = [
    {
      src: getImagePath("mahad.jpg"),
      name: "Mahad Khursheed",
      designation: "Frontend Developer",
    },
    {
      src: getImagePath("Moiz-ahmad.jpg"),
      name: "Moiz Ahmad",
      designation: "Full Stack Developer",
    },
    {
      src: getImagePath("zeshan.jpg"),
      name: "Zeeshan Bajwa",
      designation: "Frontend Developer",
    },
    {
      src: getImagePath("Imran-baig.jpg"),
      name: "Imran Baig",
      designation: "Frontend Developer",
    },
    {
      src: getImagePath("Ibad-baig.jpg"),
      name: "Ibad Baig",
      designation: "Business Developer",
    },
    {
      src: getImagePath("Ahmad-khursheed.jpeg"),
      name: "Ahmed Khursheed",
      designation: "Backend Developer",
    },
    {
      src: getImagePath("Hamza.jpg"),
      name: "Hamza",
      designation: "Frontend Developer",
    },
    {
      src: getImagePath("Haseeb.jpg"),
      name: "Haseeb Hamza",
      designation: "Frontend Developer",
    },
    {
      src: getImagePath("Ehsan.jpg"),
      name: "Muhammad Ehsan",
      designation: "Frontend Developer",
    },
    {
      src: getImagePath("Ahmad-sheikh.jpg"),
      name: "Ahmad Sheikh",
      designation: "Frontend Developer",
    },
    {
      src: getImagePath("muaz.jpeg"),
      name: "Muaz Mughal",
      designation: "Backend Developer",
    },
    {
      src: getImagePath("Abaad-ali.jpeg"),
      name: "Abaad Ali",
      designation: "Frontend Developer",
    },
    {
      src: getImagePath("samiullah.jpg"),
      name: "Samiullah",
      designation: "Business Developer",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="pt-12 xl:pt-24">
        <div className="text-center font-poppins">
          <div className="flex items-center gap-2 md:gap-8 justify-center uppercase font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl leading-[20px] md:leading-[50px] lg:leading-[69px] tracking-[1.5%]">
            <img
              src="/hori-line.svg"
              className="w-[90px] h-[9px] md:w-auto md:h-auto"
              alt=""
            />
            <div className="font-bold text-[30px] leading-[35px] 2xl:text-[50px] 2xl:leading-[69px] tracking-[1.5%]">
              <span className="text-customBlue1">Our </span>{" "}
              <span className="text-customDarkGray">Team</span>
            </div>
            <img
              src="/hori-line2.svg"
              className="w-[90px] h-[9px] md:w-auto md:h-auto"
              alt=""
            />
          </div>
          <div className="px-4 md:px-0 mb-4 md:mb-[25px] text-[16px] md:text-[20px] lg:text-[22px] font-light leading-[25px] md:leading-[32.78px] tracking-[2%]">
            Our dynamic team blends expertise with creativity, delivering
            cutting-edge solutions tailored to your needs
          </div>
        </div>

        <div className="py-12 xl:py-24 bg-[#BEF3FF]">
          <div className="py-12 md:py-24 bg-[#BEF3FF]">
            <div className="overflow-hidden">
              <div className="flex animate-marquee gap-[50px]">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex-none w-1/2 md:w-1/5 relative rounded-[22px] cursor-pointer"
                  >
                    <img
                      src={member.src}
                      alt={`Our team ${member.name}`}
                      className="w-full h-full object-cover rounded-[22px] z-10"
                    />
                    <div className="absolute top-0 left-0 w-full h-full rounded-[22px] bg-gradient-to-t from-[#0693EB] to-[rgba(255, 255, 255, 0)] to-[45.01%]"/>
                    <div className="absolute bottom-5 md:bottom-6 left-0 w-full bg-transparent bg-opacity-50 p-2 rounded-b-[22px] text-center">
                      <div className="font-semibold text-center text-[18px] leading-[22px] md:text-[25px] md:leading-[31.19px] text-white">
                        {member.name}
                      </div>
                      <div className="text-[15px] md:text-[17.83px] font-normal leading-[20px] md:leading-[26.74px] text-center">
                        {member.designation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
