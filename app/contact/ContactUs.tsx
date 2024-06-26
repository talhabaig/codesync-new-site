import React from "react";

export default function ContactUs() {
  return (
    <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="p-12 md:py-20 xl:px-24 xl:py-28">
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
          Get in touch with us to discuss your projects, explore opportunities, and collaborate for success.
          </div>
        </div>

        <div className="flex justify-center">
          <form className="basis-full md:basis-[80%] lg:basis-[70%] xl:basis-[60%]">
            <div className="flex justify-between flex-wrap">
              <div className="basis-full md:basis-[48.2%] 2xl:basis-[32.5%] mb-4">
                <label
                  className="block text-[16px] leading-[22px] text-[#0693EB] font-normal mb-2"
                  htmlFor="firstname"
                >
                  First Name
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="Enter your first name here"
                  required
                />
              </div>
              <div className="basis-full md:basis-[48.2%] xl:basis-[32.5%] mb-4">
                <label
                  className="block text-[16px] leading-[22px] text-[#0693EB] font-normal mb-2"
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Enter your last name here"
                  required
                />
              </div>
              <div className="basis-full xl:basis-[32.5%] mb-4">
                <label
                  className="block text-[16px] leading-[22px] text-[#0693EB] font-normal mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address here"
                  required
                />
              </div>
              <div className="basis-full mb-4">
                <label
                  className="block text-[16px] leading-[22px] text-[#0693EB] font-normal mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  id="message"
                  name="message"
                  placeholder="Write your message here"
                  rows={10}
                  required
                ></textarea>
              </div>
            </div>
            <div className="text-center">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
