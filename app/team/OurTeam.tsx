"use client";
import React from "react";
import { getImagePath } from "./utils.js";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function OurTeam() {
  const teamMembers = [
    {
      src: getImagePath("mahad.jpg"),
      name: "Mahad Khursheed",
      designation: "Frontend Developer",
    },
    {
      src: getImagePath("moiz.jpg"),
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
      name: "Samiullah Baig",
      designation: "Business Developer",
    },
  ];
  const animation = { duration: 20000, easing: (t: number) => t };
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    // drag: false,
    slides: {
      perView: 4,
      origin: "auto",
    },
    breakpoints: {
      "(max-width: 767px)": {
        slides: { perView: 2, spacing: 30 },
      },
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 35 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 40 },
      },
      "(min-width: 1730px)": {
        slides: { perView: 4, spacing: 50 },
      },
      "(min-width: 2100px)": {
        slides: { perView: 6, spacing: 50 },
      },
    },
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });
  return (
    <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="pt-12 md:pt-20 xl:pt-28">
        <div className="text-center font-poppins">
          <div className="flex items-center gap-2 md:gap-8 justify-center uppercase font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl leading-[20px] md:leading-[50px] lg:leading-[69px] tracking-[1.5%] mb-2">
            <img
              src="/hori-line.svg"
              className="w-[70px] sm:w-[90px] h-[9px] md:w-[120px] md:h-[12px] lg:w-auto lg:h-auto"
              alt=""
            />
            <div className="font-bold text-xl md:text-[30px] lg:text-[40px] md:leading-[35px] lg:leading-[50px] 2xl:text-[50px] 2xl:leading-[69px] tracking-[1.5%] md:mb-2">
              <span className="text-customBlue1">Our </span>{" "}
              <span className="text-customDarkGray">Team</span>
            </div>
            <img
              src="/hori-line2.svg"
              className="w-[70px] sm:w-[90px] h-[9px] md:w-[120px] md:h-[12px] lg:w-auto lg:h-auto"
              alt=""
            />
          </div>
          <div className="px-4 md:px-0 mb-4 md:mb-[25px] text-[16px] md:text-[20px] lg:text-[22px] font-light leading-[25px] md:leading-[32.78px] tracking-[2%] flex justify-center">
            <div className="basis-[80%]">
              Our dynamic team blends expertise with creativity, delivering
              cutting-edge solutions tailored to your needs
            </div>
          </div>
        </div>

        <div className="py-12 xl:py-24 bg-[#BEF3FF]">
          <div className="py-12 md:py-24 bg-[#BEF3FF]">
            <div className="overflow-hidden">
              <div ref={ref} className="keen-slider flex px-[50px]">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className={`keen-slider__slide max-h-[516px] max-w-[330px] flex-none relative rounded-[22px] cursor-pointer number-slide${
                      index + 1
                    }`}
                  >
                    <img
                      src={member.src}
                      alt={`Our team ${member.name}`}
                      className="w-full h-full object-cover rounded-[22px] z-10"
                    />
                    <div className="absolute top-0 left-0 w-full h-full rounded-[22px] bg-gradient-to-t from-[#0693EB] to-[rgba(255, 255, 255, 0)] to-[45.01%]" />
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
