"use client";
import { useState, useEffect } from "react";

const testimonials = [
  {
    text: "Codesync's fledgling frontend team is a promising addition to the market. Their dedication to quality, rapid responsiveness, and inventive solutions is commendable.",
    author: "Andreas Markle",
    position: "CEO, Artonio",
    image: "/testimonial-images/Ellipse1.png",
  },
  {
    text: "Their innovative solutions and quick response times are exactly what we needed. Highly recommend them for any project.",
    author: "Sarah Johnson",
    position: "CTO, TechCorp",
    image: "/testimonial-images/Ellipse2.png",
  },
  {
    text: "The team's commitment to quality and efficiency is unmatched. They have been a great asset to our development process.",
    author: "Michael Lee",
    position: "Product Manager, InnovateX",
    image: "/testimonial-images/Ellipse3.png",
  },
  {
    text: "Working with Codesync has been a game-changer for our business. Their skills and expertise are top-notch.",
    author: "Emily Davis",
    position: "Founder, Creative Solutions",
    image: "/testimonial-images/Ellipse4.png",
  },
];

export default function ClientTestimonial() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(
    testimonials[0]
  );
  const selectedIndex = testimonials.findIndex(
    (t) => t === selectedTestimonial
  );

  const [basePosition, setBasePosition] = useState(15);
  const [gap, setGap] = useState(20.5);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateBasePositionAndGap = () => {
      if (window.innerWidth < 375) {
        setBasePosition(10);
        setGap(22);
      } else if (window.innerWidth >= 375 && window.innerWidth < 425) {
        setBasePosition(13);
        setGap(21);
      } else if (window.innerWidth >= 425 && window.innerWidth < 576) {
        setBasePosition(15);
        setGap(20);
      } else if (window.innerWidth >= 576 && window.innerWidth < 768 ) {
        setBasePosition(16);
        setGap(20);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1400) {
        setBasePosition(14);
        setGap(22);
      } else if (window.innerWidth >= 1400) {
        setBasePosition(17);
        setGap(20);
      }
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      updateBasePositionAndGap();
    };

    updateBasePositionAndGap();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calculateArrowPosition = (index: number): number => {
    return basePosition + gap * index;
  };

  return (
    <div className="w-full text-white bg-gradient-to-b from-[#04396A] to-[#074a88]">
      <div className="2xl:container 2xl:mx-auto py-12 px-6 md:p-12 xl:p-24 2xl:px-12">
        <div className="text-center font-poppins mb-12 md:mb-24">
          <div className="flex items-center gap-2 md:gap-8 justify-center uppercase font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl leading-[20px] md:leading-[50px] lg:leading-[69px] tracking-[1.5%] mb-4">
            <img
              src="/hori-line.svg"
              className="w-[70px] sm:w-[90px] h-[9px] lg:w-auto lg:h-auto"
              alt=""
            />
            <div>
              <span className="font-poppins font-bold text-xl md:text-2xl lg:text-3xl 2xl:text-[50px] md:leading-[30px] 2xl:leading-[69px] text-[#FFFFFF] tracking-[1.5%]">
                Client Testimonial
              </span>
            </div>
            <img
              src="/hori-line2.svg"
              className="w-[70px] sm:w-[90px] h-[9px] lg:w-auto lg:h-auto"
              alt=""
            />
          </div>
          <div className="text-white mb-4 md:mb-[25px] text-[18px] md:text-[20px] lg:text-[22px] font-light leading-[32.78px] tracking-[2%]">
            We love our clients
          </div>
        </div>

        <div>
          <div className="mx-auto mb-12 lg:mb-14 polygon p-6 md:p-12 bg-gradient-to-b from-[#0D86FF] to-[#17BABA] xs:max-w-[377px] sm:max-w-[480px] md:max-w-[650px] lg:max-w-[800px] xl:max-w-[860px] 2xl:max-w-[950px] rounded-[23px] relative">
            <div className="flex gap-2 sm:gap-6 xl:gap-12 items-center mb-8">
              <img
                src="/testimonial-images/Asset1.png"
                className="h-[20px] w-[20px] md:h-auto md:w-auto"
                alt=""
              />
              <div className="font-normal font-poppins text-sm md:text-xl lg:text-2xl leading-6 md:leading-9 text-[#FFFFFF]">
                {selectedTestimonial.text}
              </div>
              <img
                src="/testimonial-images/Asset2.png"
                className="h-[20px] w-[20px] md:h-auto md:w-auto"
                alt=""
              />
            </div>
            <div className="flex justify-end">
              <span className="text-xl md:text-2xl tracking-[1.5%]">
                <span className="font-bold">{selectedTestimonial.author}</span>
                <br />
                <span>{selectedTestimonial.position}</span>
              </span>
            </div>
            <img
              src="/testimonial-images/Polygon.png"
              className="absolute bottom-[-20px] md:bottom-[-28px] w-[40px] h-[34px] lg:h-auto lg:w-auto"
              style={{ left: `${calculateArrowPosition(selectedIndex)}%` }}
              alt=""
            />
          </div>

          <div className="flex justify-center gap-[14px] xs:gap-[18px] sm:gap-6 md:gap-10 lg:gap-16 xl:gap-20">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <img
                  src={testimonial.image}
                  className={`rounded-[50%] h-[50px] w-[50px] xs:h-[60px] xs:w-[60px] sm:h-[70px] sm:w-[70px] md:h-[100px] md:w-[100px] lg:h-[112px] lg:w-[112px] hover:shadow-[0_0_40px_#0E78E1] footer-social-icon hover:translate-y-[-6px] ${
                    selectedTestimonial.image === testimonial.image
                      ? "translate-y-[-6px] shadow-[0_0_40px_#0E78E1]"
                      : ""
                  }`}
                  alt={testimonial.author}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
