import React from "react";
import { FeedReadMore } from "../components/common/readMore";

const projectArr = [
  {
    img: "",
    heading: "embold",
    description:
      "We had the privilege of creating a dynamic website for prominent influencers. This website is a vibrant reflection of the influencer's personal brand and online presence.",
  },
  {
    img: "",
    heading: "froth-id",
    description:
      "We had the privilege of creating a dynamic website for prominent influencers. This website is a vibrant reflection of the influencer's personal brand and online presence.",
  },
  {
    img: "",
    heading: "amina",
    description:
      "We had the privilege of creating a dynamic website for prominent influencers. This website is a vibrant reflection of the influencer's personal brand and online presence.",
  },
  {
    img: "",
    heading: "iba",
    description:
      "We had the privilege of creating a dynamic website for prominent influencers. This website is a vibrant reflection of the influencer's personal brand and online presence.",
  },
];

function OurPortfolio() {
  return (
    <div className="bg-[#BEF3FF] px-[12rem] py-[4rem] w-full">
      <div className="flex flex-col md:flex md:flex-row md:flex-wrap">
        {projectArr.map((project, index) => (
          <div
            key={index}
            className="flex flex-col gap-3  w-full pb-[5rem] md:flex md:flex-row"
          >
            <div className="bg-[#94c0ff] rounded-[9.99px] p-[36px] flex justify-center items-center">
              <div className="max-h-[170px] min-h-[170px] max-w-[200px] min-w-[200px] md:max-h-[70px] md:min-h-[70px] md:max-w-[70px] md:min-w-[70px]">
                <img
                  className="h-full w-full"
                  src="/testimonial-images/character_7.png"
                  alt={project.heading}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[12px]">
              <span className="text-[40px] font-semibold text-[#0693EB] uppercase md:text-[25px]">
                {project.heading}
              </span>
              <span className="max-w-[21rem] text-[#454545] leading-[26.62px] font-light md:max-w-[12rem] md:text-[15px]">
                <FeedReadMore maxLength={100}>
                  {project.description}
                </FeedReadMore>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurPortfolio;
