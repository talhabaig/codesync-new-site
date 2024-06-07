import React from "react";
import { getImagePath } from './utils.js';
export default function OurTeam() {
  const teamMembers = [
    { src: getImagePath("Ehsan.jpg"), name: "Mahad Khursheed", designation: "FrontEnd Developer" },
    { src: getImagePath("Moiz-ahmad.jpg"), name: "Moiz Ahmad", designation: "Full Stack Developer" },
    { src: getImagePath("Ehsan.jpg"), name: "Zeeshan Bajwa", designation: "FrontEnd Developer" },
    { src: getImagePath("Imran-baig.jpg"), name: "Imran Baig", designation: "FrontEnd Developer" },
    { src: getImagePath("Ibad-baig.jpg"), name: "Ibad Baig", designation: "QA" },
    { src: getImagePath("Ahmad-khursheed.jpeg"), name: "Ahmed Khursheed", designation: "Backend Developer" },
    { src: getImagePath("Hamza.jpg"), name: "Hamza", designation: "FrontEnd Developer" },
    { src: getImagePath("Haseeb.jpg"), name: "Haseeb Hamza", designation: "FrontEnd Developer" },
    { src: getImagePath("Ehsan.jpg"), name: "Muhammad Ehsan", designation: "FrontEnd Developer" },
    { src: getImagePath("Ehsan.jpg"), name: "Ahmad Sheikh", designation: "FrontEnd Developer" },
    { src: getImagePath("Ehsan.jpg"), name: "Moaz Mughal", designation: "Backend Developer" },
    { src: getImagePath("Ehsan.jpg"), name: "Abaad Ali", designation: "FrontEnd Developer" },
    { src: getImagePath("Ehsan.jpg"), name: "Samiullah", designation: "QA" },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="pt-12 xl:pt-24">
        <div className="text-center font-poppins">
          <div className="flex items-center gap-2 md:gap-8 justify-center uppercase font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl leading-[20px] md:leading-[50px] lg:leading-[69px] tracking-[1.5%]">
            <img
              src="/hori-line.svg"
              className="w-[110px] h-[9px] md:w-auto md:h-auto"
              alt=""
            />
            <div className="font-bold 2xl:text-[50px] 2xl:leading-[69px] tracking-[1.5%]">
              <span className="text-customBlue1">Our </span>{" "}
              <span className="text-customDarkGray">Team</span>
            </div>
            <img
              src="/hori-line2.svg"
              className="w-[110px] h-[9px] md:w-auto md:h-auto"
              alt=""
            />
          </div>
          <div className="mb-4 md:mb-[25px] text-[18px] md:text-[20px] lg:text-[22px] font-light leading-[32.78px] tracking-[2%]">
            Our dynamic team blends expertise with creativity, delivering
            cutting-edge solutions tailored to your needs
          </div>
        </div>

        {/* <div className="py-12 xl:py-24 bg-[#BEF3FF]">
          <div className="py-24 bg-[#BEF3FF]">
            <div className="overflow-hidden">
              <div className="flex animate-marquee gap-[50px]">
                {teamMembers.concat(teamMembers).map((member, index) => (
                  <div key={index} className="flex-none w-1/5 relative image-background rounded-[22px]">
                    <img
                      src={member.src}
                      alt={`Our team ${member.name}`}
                      className="max-h-[516px] max-w-[356px] rounded-[22px]"
                    />
                    <div className="absolute bottom-6 left-0 w-full bg-transparent bg-opacity-50 p-2 rounded-b-[22px] text-center">
                      <div className="font-semibold text-center text-[25px] leading-[31.19px] text-white">{member.name}</div>
                      <div className="text-[17.83px] font-normal leading-[26.74px] text-center">{member.designation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}