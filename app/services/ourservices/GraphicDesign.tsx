import React from "react";
const GraphicDesignDetails = [
  {
    img: "/services-graphicDesign-img1.svg",
    heading: "Web Designing",
    content:
      "Welcome to Codesync, your destination for exceptional digital experiences where creativity and functionality seamlessly blend. We specialize in creating visually stunning designs and intuitive online platforms that surpass client expectations. Explore our expertise in responsive design, seamless user experiences, and the latest advancements in web technologies to elevate your online presence.",
  },
  {
    img: "/services-graphicDesign-img2.svg",
    heading: "Graphic Designing",
    content:
      "Codesync delivers a wide range of design services, seamlessly integrating traditional print media with modern digital platforms. Whether you need eye-catching print materials such as posters and brochures or dynamic digital assets like websites and social media graphics, our talented designers excel in pushing creative boundaries. Explore our graphic design expertise with proficiency in Adobe Creative Suite, mastering layout, typography, color theory, and composition principles for impactful visual communication.",
  },
];
function GraphicDesign() {
  return (
    <div className="px-8 py-12 sm:p-12 xl:px-36 xl:py-24 2xl:px-48">
      <div className="mb-12 md:mb-16 xl:mb-24">
        <p className="mb-2">
          <h1 className="text-[#0693EB] uppercase font-bold text-[25px] md:text-[40px] 2xl:text-[48.6px] leading-[35px] md:leading-[50px] 2xl:leading-[60.51px]">
            WEB & GRAPHIC DESIGNING
          </h1>
        </p>
        <p className="font-Chenla text-[16px] md:text-xl 2xl:text-2xl leading-[20px] md:leading-[25px] 2xl:leading-[39.96px] mb-[17.2px] tracking-[4%] 2xl:w-[80%]">
          Elevate your digital presence . We specialize in captivating web and
          graphic design solutions tailored to your unique brand identity.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:flex-wrap mb-6 md:mb-12 md:w-[100%]">
        <div className="md:w-[50%]">
          {GraphicDesignDetails.map((detail, index) => (
            <div key={index} className="basis-[46%] lg:flex lg:flex-col mb-2">
              <img className="min-w-[129px] max-w-[129px] min-h-[131px] max-h-[131px]"  src={detail.img} alt="" />
              <p className="my-4">
                <h3 className="font-bold text-2xl 2xl:text-[28.25px] 2xl:leading-[47.04px] tracking-[4%] text-[#0693EB]">
                  {detail.heading}{" "}
                </h3>
              </p>
              <p className="font-normal text-lg 2xl:text-[22px] 2xl:leading-[35.86px] tracking-[2%] text-[#454545]">
                {detail.content}
              </p>
            </div>
          ))}
        </div>
        <div className="md:basis-[46%] 2xl:basis-[42%] md:w-[50%]">
          <img
            src="/services-graphicDesign.png"
            alt=""
            // className="lg:max-w-[40rem] "
          />
        </div>
      </div>
    </div>
  );
}

export default GraphicDesign;
