import React from "react";

export default function ContactUs2() {
  return (
    <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="p-12 xl:px-24 xl-pb-16 xl:pt-24">
        <div className="text-center font-poppins mb-12 2xl:mb-24">
          <div className="flex items-center gap-2 md:gap-8 justify-center uppercase font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl leading-[20px] md:leading-[50px] lg:leading-[69px] tracking-[1.5%] mb-2">
            <img
              src="/hori-line.svg"
              className="w-[90px] h-[9px] md:w-auto md:h-auto"
              alt=""
            />
            <div className="font-bold text-[25px] leading-[32px] 2xl:text-[50px] 2xl:leading-[69px] tracking-[1.5%]">
              <span className="text-customBlue1">Contact </span>{" "}
              <span className="text-customDarkGray">Us</span>
            </div>
            <img
              src="/hori-line2.svg"
              className="w-[90px] h-[9px] md:w-auto md:h-auto"
              alt=""
            />
          </div>
          <div className="mb-4 md:mb-[25px] text-[16px] lg:text-[22px] font-light leading-[25px] lg:leading-[32.78px] tracking-[2%] md:w-[70%] xl:w-1/2 2xl:w-[45%] md:mx-auto">
            Get in touch with us to discuss your projects, explore
            opportunities, and collaborate for success.
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="basis-full md:basis-1/2 bg-gradient-to-b from-customBlue1 to-[#00B2FF] py-12 px-8 2xl:p-24 flex flex-col gap-12 items-center justify-center">
          <div className="flex justify-center">
            <div className="lg:basis-[86%] xl:basis-[77%]">
              <div className="font-poppins font-bold text-[#FFFFFF] text-[30px] lg:text-[45px] xl:text-[48px] leading-[40px] lg:leading-[63px] mb-2 xl:leading-[63.98px]">
                Let's talk with Us
              </div>
              <p className="font-light text-[20px] lg:text-[24px] xl:text-[27px] leading-[30px] lg-leading-[40px] xl:leading-[48px] text-[#FFFFFF]">
                Have a project in mind that you think we’d be a great fit for
                it? We’d love to know what you’re thinking
              </p>
            </div>
          </div>
          <div>
            <img src="/contactus-img.svg" alt="" />
          </div>
        </div>

        <div className="basis-full md:basis-1/2 bg-[#ECEEF0] p-12 xl:p-24">
          <form className="">
            <div className="">
              <div className="">
                <label
                  className="block text-[16px] leading-[22px] text-[#333333] font-medium mb-4"
                  htmlFor="firstname"
                >
                  Full Name
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-8"
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="Enter your full name here"
                  required
                />
              </div>

              <div className="">
                <label
                  className="block text-[16px] leading-[22px] text-[#333333] font-medium mb-4"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-6"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address here"
                  required
                />
              </div>
              <div className="">
                <label
                  className="block text-[16px] leading-[22px] text-[#333333] font-medium mb-4"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-3"
                  id="message"
                  name="message"
                  placeholder="Write your message here"
                  rows={10}
                  required
                ></textarea>
              </div>
            </div>
            <div className="text-end">
              <button
                className="bg-customBlue1 text-[#F8F9FA] px-12 py-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-[14px] leading-[21px]"
                type="submit"
              >
                Send Messages
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
