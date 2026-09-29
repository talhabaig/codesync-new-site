"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGetPublicTestimonials } from "../../features/testimonials/hooks/useGetPublicTestimonials";
import { SafeImage } from "../components/ui/SafeImage";

const PHOTO_FALLBACK = "/testimonial-images/Ellipse1.png";

export default function ClientTestimonial() {
  const { data: testimonials, isLoading } = useGetPublicTestimonials({
    getAll: true,
    sortBy: "displayOrder",
    sortOrder: "asc",
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [arrowLeft, setArrowLeft] = useState<number | null>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const avatarRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const selectedTestimonial =
    testimonials.find((item) => item.id === selectedId) ?? testimonials[0] ?? null;

  useEffect(() => {
    if (!testimonials.length) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !testimonials.some((item) => item.id === selectedId)) {
      setSelectedId(testimonials[0].id);
    }
  }, [testimonials, selectedId]);

  useLayoutEffect(() => {
    const updateArrow = () => {
      const bubble = bubbleRef.current;
      const selected = selectedTestimonial
        ? avatarRefs.current[selectedTestimonial.id]
        : null;
      if (!bubble || !selected) {
        setArrowLeft(null);
        return;
      }
      const bubbleRect = bubble.getBoundingClientRect();
      const avatarRect = selected.getBoundingClientRect();
      const arrowWidth = 40;
      setArrowLeft(
        avatarRect.left + avatarRect.width / 2 - bubbleRect.left - arrowWidth / 2
      );
    };

    updateArrow();
    window.addEventListener("resize", updateArrow);
    return () => window.removeEventListener("resize", updateArrow);
  }, [selectedTestimonial, testimonials]);

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
              <h1 className="font-poppins font-bold text-xl md:text-2xl lg:text-3xl 2xl:text-[50px] md:leading-[30px] 2xl:leading-[69px] text-[#FFFFFF] tracking-[1.5%]">
                Client Testimonial
              </h1>
            </div>
            <img
              src="/hori-line2.svg"
              className="w-[70px] sm:w-[90px] h-[9px] lg:w-auto lg:h-auto"
              alt=""
            />
          </div>
          <h2 className="text-white mb-4 md:mb-[25px] text-[18px] md:text-[20px] lg:text-[22px] font-light leading-[32.78px] tracking-[2%]">
            We love our clients
          </h2>
        </div>

        {isLoading ? (
          <div className="mx-auto h-[280px] max-w-[950px] animate-pulse rounded-[23px] bg-white/10" />
        ) : !selectedTestimonial ? null : (
          <div>
            <div
              ref={bubbleRef}
              className="mx-auto mb-12 lg:mb-14 polygon p-6 md:p-12 bg-gradient-to-b from-[#0D86FF] to-[#17BABA] xs:max-w-[377px] sm:max-w-[480px] md:max-w-[650px] lg:max-w-[800px] xl:max-w-[860px] 2xl:max-w-[950px] rounded-[23px] relative"
            >
              <div className="flex gap-2 sm:gap-6 xl:gap-12 min-h-[216px] max-h-[216px] xs:min-h-[120px] xs:max-h-[120px] sm:min-h-[130px] sm:max-h-[130px] md:min-h-[140px] md:max-h-[140px] items-center mb-8">
                <img
                  src="/testimonial-images/Asset1.png"
                  className="h-[20px] w-[30px] md:h-[30px] md:w-[40px] lg:h-auto lg:w-auto"
                  alt=""
                />
                <div className="font-normal font-poppins text-sm md:text-lg lg:text-xl leading-6 xl:leading-9 text-[#FFFFFF]">
                  {selectedTestimonial.testimonial}
                </div>
                <img
                  src="/testimonial-images/Asset2.png"
                  className="h-[20px] w-[30px] md:h-[30px] md:w-[40px] lg:h-auto lg:w-auto"
                  alt=""
                />
              </div>
              <div className="flex justify-end">
                <span className="text-sm xs:text-lg md:text-xl lg:text-2xl tracking-[1.5%]">
                  <h3 className="font-bold">{selectedTestimonial.clientName}</h3>
                  <span>
                    {selectedTestimonial.designation}, {selectedTestimonial.company}
                  </span>
                </span>
              </div>
              <img
                src="/testimonial-images/Polygon.png"
                className="absolute bottom-[-20px] md:bottom-[-28px] w-[40px] h-[34px] lg:h-auto lg:w-auto"
                style={{
                  left: arrowLeft == null ? "15%" : `${arrowLeft}px`,
                  visibility: arrowLeft == null ? "hidden" : "visible",
                }}
                alt=""
              />
            </div>

            <div className="flex flex-wrap justify-center gap-[14px] xs:gap-[18px] sm:gap-6 md:gap-10 lg:gap-16 xl:gap-20">
              {testimonials.map((testimonial) => (
                <button
                  key={testimonial.id}
                  type="button"
                  ref={(node) => {
                    avatarRefs.current[testimonial.id] = node;
                  }}
                  className="cursor-pointer bg-transparent p-0"
                  onClick={() => setSelectedId(testimonial.id)}
                >
                  <SafeImage
                    src={testimonial.photo}
                    fallback={PHOTO_FALLBACK}
                    className={`rounded-[50%] object-cover h-[50px] w-[50px] xs:h-[60px] xs:w-[60px] sm:h-[70px] sm:w-[70px] md:h-[100px] md:w-[100px] lg:h-[112px] lg:w-[112px] hover:shadow-[0_0_40px_#0E78E1] footer-social-icon hover:translate-y-[-6px] ${
                      selectedTestimonial.id === testimonial.id
                        ? "translate-y-[-6px] shadow-[0_0_40px_#0E78E1]"
                        : ""
                    }`}
                    alt={testimonial.clientName}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
