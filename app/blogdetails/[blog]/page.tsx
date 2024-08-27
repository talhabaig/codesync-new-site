"use client";
import React, { useEffect } from "react";
import data from "portfolio.json";
interface Props {
  params: {
    blog: string;
  };
}

const Page: React.FC<Props> = (props) => {
  const blogId = Number(props.params.blog);
  const item = data.find((item) => item.id === blogId);
  
  return (
    <>
      {item && (
        <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
          
          <div className="p-8 md:px-24">
            <div className="flex justify-center md:my-4">
              <div className="2xl:basis-[60%] 3xl:basis-[57%] ">
                <div className="mb-4">
                  <h1 className="font-poppins font-bold text-[18px] md:text-[22px] lg:text-[26px] leading-[22px] md:leading-[25px] lg:leading-[31.46px] mb-4">
                    Top Trends Shaping Business Transformation Initiatives in 2024
                  </h1>
                  <div className="">
                    <img src="/images/blog/blog4.jpg" alt=""/>
                  </div>
                </div>
                <div>
                  <div className="mb-1"><span className="font-semibold font-poppins">Author: </span>Jane Doe</div>
                  <div><span className="font-semibold font-poppins">Published Date: </span>August 27, 2024</div>
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-[24px] md:text-[27.3px] leading-[36px] md:leading-[45.5px] tracking-[4%] text-[#000000]">Introduction</h3>
                  <p className="mb-4 md:mb-2 lg:mb-4 font-poppins font-light text-[16px] md:text-[13.3px] lg:text-[16px] xl:text-[18px] leading-[24px] md:leading-[22px] xl:leading-[28.78px] tracking-[2%]">In today's rapidly evolving business landscape, transformation has become a necessity rather than an option. Companies across various sectors are embracing innovative approaches to stay competitive and relevant. As we move further into 2024, several key trends are emerging that are poised to shape the future of business transformation. In this blog, we'll explore these trends and their implications for businesses aiming to lead in the digital age.</p>
                  <h3 className="font-poppins font-semibold text-[24px] md:text-[27.3px] leading-[36px] md:leading-[45.5px] tracking-[4%] text-[#000000]">1. The Rise of AI-Driven Decision Making</h3>
                  <p className="mb-4 md:mb-2 lg:mb-4 font-poppins font-light text-[16px] md:text-[13.3px] lg:text-[16px] xl:text-[18px] leading-[24px] md:leading-[22px] xl:leading-[28.78px] tracking-[2%]">Artificial Intelligence (AI) continues to be a game-changer in business transformation. Companies are increasingly leveraging AI to make data-driven decisions that improve efficiency, reduce costs, and enhance customer experiences. From predictive analytics to automated customer service, AI is empowering businesses to operate smarter and faster. The integration of AI in business processes is no longer a luxury but a critical component of staying ahead in a competitive market.</p>
                  <h3 className="font-poppins font-semibold text-[24px] md:text-[27.3px] leading-[36px] md:leading-[45.5px] tracking-[4%] text-[#000000]">2. Hybrid Work Models</h3>
                  <p className="mb-4 md:mb-2 lg:mb-4 font-poppins font-light text-[16px] md:text-[13.3px] lg:text-[16px] xl:text-[18px] leading-[24px] md:leading-[22px] xl:leading-[28.78px] tracking-[2%]">The pandemic has permanently altered the way we work. In 2024, hybrid work models are becoming the norm, with companies offering employees the flexibility to work both remotely and in-office. This shift requires businesses to rethink their operations, from HR policies to IT infrastructure. Ensuring seamless collaboration and communication in a hybrid environment is key to maintaining productivity and employee satisfaction.</p>
                  <h3 className="font-poppins font-semibold text-[24px] md:text-[27.3px] leading-[36px] md:leading-[45.5px] tracking-[4%] text-[#000000]">Conclusion</h3>
                  <p className="mb-4 md:mb-2 lg:mb-4 font-poppins font-light text-[16px] md:text-[13.3px] lg:text-[16px] xl:text-[18px] leading-[24px] md:leading-[22px] xl:leading-[28.78px] tracking-[2%]">The trends shaping business transformation in 2024 highlight the need for companies to be agile, innovative, and customer-focused. By embracing AI-driven decision-making, hybrid work models, sustainability, cybersecurity, and customer-centric innovation, businesses can position themselves for success in the digital era. As we look to the future, the ability to adapt and evolve will be the defining factor in achieving long-term growth and relevance.</p>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
