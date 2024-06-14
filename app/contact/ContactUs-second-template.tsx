"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type InputValues = {
  firstname: string;
  email: string;
  PhoneNumber: string;
  message: string;
};

type Interests = {
  web: boolean;
  mobile: boolean;
  design: boolean;
  others: boolean;
};

export default function ContactUs2() {
  const routes = useRouter();
  const [inputVal, setInputVal] = useState<InputValues>({
    firstname: "",
    email: "",
    PhoneNumber: "",
    message: "",
  });
  const [inputCheck, setInputCheck] = useState<Interests>({
    web: false,
    mobile: false,
    design: false,
    others: false,
  });
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone: string) => {
    const phonePattern = /^\d{10,}$/;
    return phonePattern.test(phone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setInputCheck((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setInputVal((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(inputVal.email)) {
      setEmailError(true);
      return;
    }

    if (!validatePhone(inputVal.PhoneNumber)) {
      setPhoneError(true);
      return;
    }

    setIsSending(true);

    const selectedInterests = Object.keys(inputCheck).filter(
      (key) => inputCheck[key as keyof Interests]
    );

    const data = {
      service_id: "service_lrbfgto",
      template_id: "template_8rl61km",
      user_id: "1H1lVLszHQKK8Rwn0",
      template_params: {
        userName: inputVal.firstname,
        userEmail: inputVal.email,
        phoneNumber: inputVal.PhoneNumber,
        message: inputVal.message,
        interests: selectedInterests.join(", "),
      },
    };

    try {
      const res = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        data
      );
      setInputVal({
        firstname: "",
        email: "",
        PhoneNumber: "",
        message: "",
      });
      setInputCheck({
        web: false,
        mobile: false,
        design: false,
        others: false,
      });
      routes.push("/thankyou");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
      <div className="p-12 xl:px-24 xl:pb-16 xl:pt-24">
        <div className="text-center font-poppins mb-12 md:mb-4 3xl:mb-20">
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
          <div className="mb-4 md:mb-0 3xl:mb-5 text-[16px] lg:text-[22px] font-light leading-[25px] lg:leading-[32.78px] tracking-[2%] md:w-[70%] xl:w-1/2 2xl:w-[45%] md:mx-auto">
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

        <div className="basis-full md:basis-1/2 bg-[#ECEEF0] px-12 py-6 xl:px-24 xl:py-12">
          <form onSubmit={handleSubmit} className="">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex gap-1">
                  <input
                    type="checkbox"
                    name="web"
                    checked={inputCheck.web}
                    id="web"
                    onChange={handleChange}
                    className="min-w-5 min-h-5"
                  />
                  <label htmlFor="web" className="select-none">
                    <span>WEB</span>
                  </label>
                </div>
                <div className="flex gap-1">
                  <input
                    type="checkbox"
                    name="mobile"
                    checked={inputCheck.mobile}
                    id="mobile"
                    onChange={handleChange}
                    className="min-w-5 min-h-5"
                  />
                  <label htmlFor="mobile" className="select-none">
                    <span>MOBILE</span>
                  </label>
                </div>
                <div className="flex gap-1">
                  <input
                    type="checkbox"
                    name="design"
                    checked={inputCheck.design}
                    id="design"
                    onChange={handleChange}
                    className="min-w-5 min-h-5"
                  />
                  <label htmlFor="design" className="select-none">
                    <span>DESIGN</span>
                  </label>
                </div>
                <div className="flex gap-1">
                  <input
                    type="checkbox"
                    name="others"
                    checked={inputCheck.others}
                    id="others"
                    onChange={handleChange}
                    className="min-w-5 min-h-5"
                  />
                  <label htmlFor="others" className="select-none">
                    <span>OTHERS</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="block text-[16px] leading-[22px] text-[#333333] font-medium"
                  htmlFor="firstname"
                >
                  Full Name
                </label>
                <input
                  className="w-full px-3 py-3 border border-gray-300 rounded-[4px] focus:outline-none focus:border-blue-500"
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={inputVal.firstname}
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="block text-[16px] leading-[22px] text-[#333333] font-medium"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-3 border border-gray-300 rounded-[4px] focus:outline-none focus:border-blue-500"
                  type="email"
                  id="email"
                  name="email"
                  value={inputVal.email}
                  placeholder="Enter your email address "
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="block text-[16px] leading-[22px] text-[#333333] font-medium"
                  htmlFor="num" 
                >
                  Phone Number
                </label>
                <input
                  className="w-full px-3 py-3 border border-gray-300 rounded-[4px] focus:outline-none focus:border-blue-500"
                  type="number"
                  id="num"
                  value={inputVal.PhoneNumber}
                  name="PhoneNumber"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="block text-[16px] leading-[22px] text-[#333333] font-medium "
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="w-full px-3 py-3 border border-gray-300 rounded-[4px] focus:outline-none focus:border-blue-500 mb-3"
                  id="message"
                  name="message"
                  value={inputVal.message}
                  placeholder="Write your message here"
                  onChange={handleChange}
                  rows={10}
                  required
                ></textarea>
              </div>
            </div>
            <div className="text-end">
              <button
                className={`bg-customBlue1 text-[#F8F9FA] px-12 py-4 rounded-[4px] hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-[14px] leading-[21px] ${
                  isSending ||
                  !inputVal.firstname ||
                  !inputVal.email ||
                  !inputVal.PhoneNumber ||
                  !inputVal.message ||
                  emailError ||
                  phoneError
                    ? "bg-gray-400 cursor-not-allowed"
                    : ""
                }`}
                type="submit"
                disabled={
                  !inputVal.firstname ||
                  !inputVal.email ||
                  !inputVal.PhoneNumber ||
                  !inputVal.message ||
                  emailError ||
                  phoneError
                }
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}