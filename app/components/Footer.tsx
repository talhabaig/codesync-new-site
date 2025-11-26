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
import Image from "next/image";

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
      <div className="p-6 md:p-8 lg:p-10 xl:px-20 xl:pt-16">
        <div className="flex flex-col md:flex-row md:justify-center gap-6 md:gap-4 lg:gap-6">

          {/* Left Section */}
          <div className="xl:p-2 basis-1/3 flex flex-col gap-3 xl:gap-5">
            <div className="flex flex-col gap-2">
              <Link href="/">
                <Image
                  src="/CodeSyncLogo.svg"
                  alt="Logo"
                  width={220}
                  height={50}
                  className="cursor-pointer"
                />
              </Link>

              <div className="font-poppins font-light text-[14px] lg:text-[16px]">
                (C) IT Solution
              </div>
            </div>

            <div className="flex flex-col gap-2 font-poppins font-light text-[15px] leading-[26px]">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
                <a href="tel:+923319660156">+92 331 9660156</a>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  src="/icons/entypo_email.svg"
                  width={18}
                  height={18}
                  alt="Email Icon"
                />
                <a href="mailto:hr@codesyncs.com" target="_blank">hr@codesyncs.com</a>
              </div>

              <div className="flex items-start gap-2">
                <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4 mt-1" />
                <a
                  href="https://goo.gl/maps/6x5jkDZgode7pP4v6"
                  target="_blank"
                >
                  House# 14 SubhanAllah Garden Lahore
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2">
              <a href="https://www.instagram.com/codesync.12/?igsh=YjgwZjE0YXhuYzlh" target="_blank">
                <Image
                  src="/icons/insta.svg"
                  width={38}
                  height={38}
                  alt="Instagram"
                  className="cursor-pointer hover:translate-y-[-4px]"
                />
              </a>

              <a href="https://www.linkedin.com/company/codessync/" target="_blank">
                <Image
                  src="/icons/linkedin.svg"
                  width={38}
                  height={38}
                  alt="LinkedIn"
                  className="cursor-pointer hover:translate-y-[-4px]"
                />
              </a>

              <a href="https://www.facebook.com/people/CodeSync/61556573407579/" target="_blank">
                <Image
                  src="/icons/fb.svg"
                  width={38}
                  height={38}
                  alt="Facebook"
                  className="cursor-pointer hover:translate-y-[-4px]"
                />
              </a>
            </div>
          </div>

          {/* Middle Section */}
          <div className="xl:p-2 basis-1/3 flex flex-col gap-3 xl:gap-4">
            <h3 className="font-poppins font-semibold text-[20px] tracking-[4%] uppercase">
              Our Services
            </h3>

            <div className="flex flex-col gap-2 font-poppins font-light text-[15px] leading-[26px]">
              <span onClick={() => handleLinkClick("/services", "web-development")} className="cursor-pointer">Web Development</span>
              <span onClick={() => handleLinkClick("/services", "graphic-design")} className="cursor-pointer">Graphic Designing</span>
              <span onClick={() => handleLinkClick("/services", "ecommerce")} className="cursor-pointer">E-Commerce Solutions</span>
              <span onClick={() => handleLinkClick("/services", "mobile-development")} className="cursor-pointer">Mobile App Development</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="xl:p-2 basis-1/3 flex flex-col gap-3 xl:gap-4">
            <h3 className="uppercase font-poppins font-semibold text-[20px] tracking-[4%]">
              Information
            </h3>

            <div className="flex flex-col gap-2 font-poppins font-light text-[15px] leading-[26px]">
              <span
                className="cursor-pointer"
                onClick={() => handleSimpleLinkClick("/services")}
              >
                {loading === "/services" ? <FontAwesomeIcon icon={faSpinner} spin /> : "Services"}
              </span>

              <Link href="/portfolio">
                <span
                  className="cursor-pointer"
                  onClick={() => handleSimpleLinkClick("/portfolio")}
                >
                  {loading === "/portfolio" ? <FontAwesomeIcon icon={faSpinner} spin /> : "Portfolio"}
                </span>
              </Link>

              <Link href="/blog">
                <span
                  className="cursor-pointer"
                  onClick={() => handleSimpleLinkClick("/blog")}
                >
                  {loading === "/blog" ? <FontAwesomeIcon icon={faSpinner} spin /> : "Blog"}
                </span>
              </Link>

              <Link href="/career">
                <span
                  className="cursor-pointer"
                  onClick={() => handleSimpleLinkClick("/career")}
                >
                  {loading === "/career" ? <FontAwesomeIcon icon={faSpinner} spin /> : "Career"}
                </span>
              </Link>

              <Link href="/contact">
                <span
                  className="cursor-pointer"
                  onClick={() => handleSimpleLinkClick("/contact")}
                >
                  {loading === "/contact" ? <FontAwesomeIcon icon={faSpinner} spin /> : "Contact Us"}
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
