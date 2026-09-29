"use client";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useGetPublicTeamMembers } from "../../features/team/hooks/useGetPublicTeamMembers";
import { PublicTeamMember } from "../../features/team/types";
import { SafeImage } from "../components/ui/SafeImage";

const PHOTO_FALLBACK = "/icon.png";

function TeamCarousel({ members }: { members: PublicTeamMember[] }) {
  const animation = { duration: 20000, easing: (t: number) => t };
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
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
    <div className="overflow-hidden">
      <div ref={ref} className="keen-slider flex px-[50px]">
        {members.map((member, index) => (
          <div
            key={member.id}
            className={`keen-slider__slide max-h-[516px] max-w-[330px] flex-none relative rounded-[22px] cursor-pointer number-slide${
              index + 1
            }`}
          >
            <SafeImage
              src={member.image}
              fallback={PHOTO_FALLBACK}
              alt={`Our team ${member.name}`}
              className="z-10 h-full w-full rounded-[22px] object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full rounded-[22px] bg-gradient-to-t from-[#0693EB] to-[rgba(255, 255, 255, 0)] to-[45.01%]" />
            <div className="absolute bottom-5 md:bottom-6 left-0 w-full bg-transparent bg-opacity-50 p-2 rounded-b-[22px] text-center">
              <h3 className="font-semibold text-center text-[18px] leading-[22px] md:text-[25px] md:leading-[31.19px] text-white">
                {member.name}
              </h3>
              <div className="text-[15px] md:text-[17.83px] font-normal leading-[20px] md:leading-[26.74px] text-center">
                {member.designation}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OurTeam() {
  const { data: teamMembers, isLoading } = useGetPublicTeamMembers({
    getAll: true,
    sortBy: "displayOrder",
    sortOrder: "asc",
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
            <h1 className="font-bold text-xl md:text-[30px] lg:text-[40px] md:leading-[35px] lg:leading-[50px] 2xl:text-[50px] 2xl:leading-[69px] tracking-[1.5%] md:mb-2">
              <span className="text-customBlue1">Our </span>{" "}
              <span className="text-customDarkGray">Team</span>
            </h1>
            <img
              src="/hori-line2.svg"
              className="w-[70px] sm:w-[90px] h-[9px] md:w-[120px] md:h-[12px] lg:w-auto lg:h-auto"
              alt=""
            />
          </div>
          <div className="px-4 md:px-0 mb-4 md:mb-[25px] text-[16px] md:text-[20px] lg:text-[22px] font-light leading-[25px] md:leading-[32.78px] tracking-[2%] flex justify-center">
            <h2 className="md:basis-[70%] xl:basis-1/2 2xl:basis-[43%]">
              Our dynamic team blends expertise with creativity, delivering
              cutting-edge solutions tailored to your needs
            </h2>
          </div>
        </div>

        <div className="py-8 sm:py-12 xl:py-24 bg-[#BEF3FF]">
          <div className="py-12 md:py-24 bg-[#BEF3FF]">
            {isLoading ? (
              <div className="flex gap-8 overflow-hidden px-[50px]">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[360px] max-w-[330px] min-w-[220px] flex-1 animate-pulse rounded-[22px] bg-white/60"
                  />
                ))}
              </div>
            ) : teamMembers.length === 0 ? (
              <p className="px-6 py-8 text-center text-customDarkGray/70">No team members yet.</p>
            ) : (
              <TeamCarousel key={teamMembers.map((member) => member.id).join("-")} members={teamMembers} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
