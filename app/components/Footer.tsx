"use client";
import {
  faFaceSmileBeam,
  faLocationDot,
  faPhone,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export function Footer() {
  const [loading, setLoading] = useState("");
  const router = useRouter();
  
  const handleLinkClick = (path: string, tab: string) => {
    setLoading(tab);
    setTimeout(() => {
      router.push(`${path}?tab=${tab}`);
    }, 500);
  };

  const handleSimpleLinkClick = (path: string) => {
    setLoading(path);
    setTimeout(() => {
      window.location.href = path;
    }, 500);
  };

  const pathname = usePathname();

  return (
    <div className="w-full bg-[#012959] text-white">
      <div className="p-12 lg:p-16 lg:pr-2 xl:px-28 xl:pt-28 xl:pr-0">
        <div className="flex flex-col md:flex-row md:justify-center gap-8 md:gap-3 lg:gap-8">
          <div className="xl:p-4 basis-1/3 flex flex-col gap-4 xl:gap-8">
            <div className="flex flex-col md:gap-4 lg:mb-4">
              <Link href="/">
                <div className="">
                  <img
                    src="/CodeSyncLogo.svg"
                    alt="Logo"
                    className="h-[64px] w-[329.16px] md:h-[39px] md:w-[210px] xl:h-[64px] xl:w-[329.16px] cursor-pointer"
                  ></img>
                </div>
              </Link>
              <div className="font-poppins font-light text-18px lg:text-[20px] leading-[32.78px] tracking-[2%]">
                (C) IT Solution
              </div>
            </div>
            <div className="flex flex-col gap-[15px] font-poppins font-light text-18px 2xl:text-[22px] leading-[32.78px] tracking-[2%]">
              <div className="flex items-center gap-2">
                <div>
                <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                <a href="tel:+923319660156">+ 92 331 9660156</a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <img
                    src="/icons/entypo_email.svg"
                    className="h-[20px] w-[20px] lg:h-[22px] lg:w-[22px]"
                    alt=""
                  />
                </div>
                <div>
                  <a href="mailto:hr@codesyncs.com" target="_blank">
                    hr@codesyncs.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div>
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div>
                  <a
                    href="https://goo.gl/maps/6x5jkDZgode7pP4v6"
                    target="_blank"
                  >
                    House# 14 SubhanAllah Garden Welfare Society Lahore
                  </a>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href="https://www.instagram.com/codesync.12/?igsh=YjgwZjE0YXhuYzlh"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/insta.svg"
                  className="h-[42px] w-[42px] lg:h-[52px] lg:w-[52px] cursor-pointer footer-social-icon hover:translate-y-[-6px]"
                  alt=""
                />
              </a>

              <a
                href="https://www.linkedin.com/company/codessync/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/linkedin.svg"
                  className="h-[42px] w-[42px] lg:h-[52px] lg:w-[52px] cursor-pointer footer-social-icon hover:translate-y-[-6px]"
                  alt=""
                />
              </a>
              <a
                href="https://www.facebook.com/people/CodeSync/61556573407579/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/fb.svg"
                  className="h-[42px] w-[42px] lg:h-[52px] lg:w-[52px] cursor-pointer footer-social-icon hover:translate-y-[-6px]"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className="xl:p-4 basis-1/3 flex flex-col gap-4 xl:gap-[28px]">
            <h3 className="font-poppins font-semibold text-[26.48px] leading-[39.72px] tracking-[6%] uppercase">
              Our services
            </h3>
            <div className="flex text-[#FFFFFF] flex-col gap-[15px] font-poppins font-light text-18px 2xl:text-[20px] leading-[32.78px] tracking-[2%]">
              <span onClick={() => handleLinkClick("/services", "web-development")} className="cursor-pointer">Web Development</span>
              <span onClick={() => handleLinkClick("/services", "graphic-design")} className="cursor-pointer">WEB & GRAPHIC DESIGNING</span>
              <span onClick={() => handleLinkClick("/services", "ecommerce")} className="cursor-pointer">E-COMMERCE SOLUTIONS</span>
              <span onClick={() => handleLinkClick("/services", "mobile-development")} className="cursor-pointer">MOBILE APP DEVELOPMENT</span>
            </div>
          </div>
          <div className="xl:p-4 basis-1/3 flex flex-col gap-4 xl:gap-[28px] bg-none xl:bg-contain xl:bg-no-repeat xl:bg-top xl:bg-[url('/footer-bg.png')]">
            <h3 className="uppercase font-poppins font-semibold text-[26.48px] leading-[39.72px] tracking-[6%]">
              Information
            </h3>
            <div className="flex flex-col gap-[15px] font-poppins font-light text-18px 2xl:text-[20px] leading-[32.78px] tracking-[2%]">
              <span
                className={`cursor-pointer ${loading === "/info-services" ? "font-medium" : ""}`}
                onClick={() => handleSimpleLinkClick("/services")}
              >
                {loading === "/services" ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  "Services"
                )}
              </span>
              <Link href="/portfolio" className={` ${pathname === "/portfolio"}`}>
                <span
                  className={`cursor-pointer ${loading === "/portfolio" ? "font-medium" : ""}`}
                  onClick={() => handleSimpleLinkClick("/portfolio")}
                >
                  {loading === "/portfolio" ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    "Portfolio"
                  )}
                </span>
              </Link>
              <Link href="/blog" className={` ${pathname === "/blog"}`}>
                <span
                  className={`cursor-pointer ${loading === "/blog" ? "font-medium" : ""}`}
                  onClick={() => handleSimpleLinkClick("/blog")}
                >
                  {loading === "/blog" ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    "Blog"
                  )}
                </span>
              </Link>
              {/* <Link href="/career" className={` ${pathname === "/career"}`}>
                <span
                  className={`cursor-pointer ${loading === "/career" ? "font-medium" : ""}`}
                  onClick={() => handleSimpleLinkClick("/career")}
                >
                  {loading === "/career" ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    "Career"
                  )}
                </span>
              </Link> */}

              <Link href="/contact" className={` ${pathname === "/contact"}`}>
                <span
                  className={`cursor-pointer ${loading === "/contact" ? "font-medium" : ""}`}
                  onClick={() => handleSimpleLinkClick("/contact")}
                >
                  {loading === "/contact" ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    "Contact Us"
                  )}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
