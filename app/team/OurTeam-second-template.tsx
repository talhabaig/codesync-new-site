import React from "react";
import { getImagePath } from "./utils.js";
const teamMembers = [
  {
    name: "Mahad Khursheed",
    designation: "Frontend Developer",
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    image: getImagePath("mahad.jpg"),
    social: {
      twitter: {
        url: "https://twitter.com/mahad",
      },
      linkedin: {
        url: "https://linkedin.com/in/mahad",
      },
      other: {
        url: "https://social3.com/mahad",
      },
    },
  },
  {
    name: "Moiz Ahmad",
    designation: "Full Stack Developer",
    bio: "Lead engineering teams at Figma, Pitch, and Protocol Labs.",
    image: getImagePath("Moiz-ahmad.jpg"),
    social: {
      twitter: {
        url: "https://twitter.com/Moiz",
      },
      linkedin: {
        url: "https://linkedin.com/in/Moiz",
      },
      other: {
        url: "https://social3.com/Moiz",
      },
    },
  },
  {
    name: "Zeeshan Bajwa",
    designation: "Frontend Developer",
    bio: "Lead engineering teams at Figma, Pitch, and Protocol Labs.",
    image: getImagePath("zeshan.jpg"),
    social: {
      twitter: {
        url: "https://twitter.com/Zeeshan",
      },
      linkedin: {
        url: "https://linkedin.com/in/Zeeshan",
      },
      other: {
        url: "https://social3.com/Zeeshan",
      },
    },
  },
  {
    name: "Imran Baig",
    designation: "Frontend Developer",
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    image: getImagePath("Imran-baig2.jpg"),
    social: {
      twitter: {
        url: "https://twitter.com/Imran",
      },
      linkedin: {
        url: "https://linkedin.com/in/Imran",
      },
      other: {
        url: "https://social3.com/Imran",
      },
    },
  },
  {
    name: "Ibad Baig",
    designation: "Business Developer",
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    image: getImagePath("Ibad-baig2.jpg"),
    social: {
      twitter: {
        url: "https://twitter.com/Ibad",
      },
      linkedin: {
        url: "https://linkedin.com/in/Ibad",
      },
      other: {
        url: "https://social3.com/Ibad",
      },
    },
  },
  {
    name: "Ahmed Khursheed",
    designation: "Backend Developer",
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    image: getImagePath("Ahmad-khursheed.jpeg"),
    social: {
      twitter: {
        url: "https://twitter.com/Ahmed",
      },
      linkedin: {
        url: "https://linkedin.com/in/Ahmed",
      },
      other: {
        url: "https://social3.com/Ahmed",
      },
    },
  },
  {
    name: "Hamza",
    designation: "Frontend Developer",
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    image: getImagePath("Hamza.jpg"),
    social: {
      twitter: {
        url: "https://twitter.com/Hamza",
      },
      linkedin: {
        url: "https://linkedin.com/in/Hamza",
      },
      other: {
        url: "https://social3.com/Hamza",
      },
    },
  },
  {
    name: "Haseeb Hamza",
    designation: "FrontEnd Developer",
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    image: getImagePath("haseeb2.jpg"),
    social: {
      twitter: {
        url: "https://twitter.com/Haseeb",
      },
      linkedin: {
        url: "https://linkedin.com/in/Haseeb",
      },
      other: {
        url: "https://social3.com/Haseeb",
      },
    },
  },
  {
    name: "Muhammad Ehsan",
    designation: "Frontend Developer",
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    image: getImagePath("ehsan2.jpg"),
    social: {
      twitter: {
        url: "https://twitter.com/Ehsan",
      },
      linkedin: {
        url: "https://linkedin.com/in/Ehsan",
      },
      other: {
        url: "https://social3.com/Ehsan",
      },
    },
  },
  {
    name: "Ahmad Sheikh",
    designation: "FrontEnd Developer",
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    image: getImagePath("Ahmad-sheikh2.jpg"),
    social: {
      twitter: {
        url: "https://twitter.com/Ahmad",
      },
      linkedin: {
        url: "https://linkedin.com/in/Ahmad",
      },
      other: {
        url: "https://social3.com/Ahmad",
      },
    },
  },
  {
    name: "Muaz Mughal",
    designation: "Backend Developer",
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    image: getImagePath("muaz.jpeg"),
    social: {
      twitter: {
        url: "https://twitter.com/Muaz",
      },
      linkedin: {
        url: "https://linkedin.com/in/Muaz",
      },
      other: {
        url: "https://social3.com/Muaz",
      },
    },
  },
  {
    name: "Abaad Ali",
    designation: "Frontend Developer",
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    image: getImagePath("Abaad-ali.jpeg"),
    social: {
      twitter: {
        url: "https://twitter.com/Abaad",
      },
      linkedin: {
        url: "https://linkedin.com/in/Abaad",
      },
      other: {
        url: "https://social3.com/Abaad",
      },
    },
  },
  {
    name: "Samiullah",
    designation: "Business Developer",
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    image: getImagePath("samiullah.jpg"),
    social: {
      twitter: {
        url: "https://twitter.com/Samiullah",
      },
      linkedin: {
        url: "https://linkedin.com/in/Samiullah",
      },
      other: {
        url: "https://social3.com/Samiullah",
      },
    },
  },
];
export default function OurTeam2() {
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
          <div className="px-4 md:px-0 mb-4 md:mb-[25px] text-[16px] md:text-[20px] lg:text-[22px] font-light leading-[25px] md:leading-[32.78px] tracking-[2%] md:w-[70%] xl:w-1/2 2xl:w-[43%] md:mx-auto">
            Our dynamic team blends expertise with creativity, delivering
            cutting-edge solutions tailored to your needs
          </div>
        </div>

        <div className="py-12 md:p-16 lg:py-12 lg:px-8 2xl:py-24 2xl:px-20 bg-[#BEF3FF]">
          
          <div className="py-0 px-[30px] md:px-[25px] lg:px-[20px] 2xl:px-[35.68px] flex flex-col md:flex-row flex-wrap gap-4 lg:gap-3 2xl:gap-8 justify-center">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="md:basis-[46%] lg:basis-[30.9%] xl:basis-[23%] 2xl:basis-[23%] p-[26px] md:p-[26px] lg:p-[22px] xl:p-[26.74px] rounded-[22px] bg-[#F9FAFB] shadow-xl cursor-pointer 2xl:max-w-[320px]"
              >
                <div className="flex flex-col items-center justify-center gap-[22.28px]">
                  <div className="w-[89.13px] h-[89.13px]">
                    <img
                      className="rounded-[50%] object-cover w-full h-full"
                      src={member.image}
                      alt={member.name}
                    />
                  </div>
                  <div className="flex flex-col font-inter">
                    <span className="text-center font-medium text-[20.05px] leading-[31.19px]">
                      {member.name}
                    </span>
                    <span className="text-[#0693EB] text-center font-normal text-[17.83px] leading-[26.74px]">
                      {member.designation}
                    </span>
                    <p className="text-center font-normal text-[#667085] text-[17.83px] leading-[26.74px]">
                      {member.bio}
                    </p>
                  </div>
                  <div className="flex gap-[17.83px] justify-center">
                    <a
                      href={member.social.twitter.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="../icons/twitter.svg" alt="Twitter" />
                    </a>
                    <a
                      href={member.social.linkedin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="../icons/linkedin-gray.svg" alt="LinkedIn" />
                    </a>
                    <a
                      href={member.social.other.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="../icons/social icon3.svg" alt="Other" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
