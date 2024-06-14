"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function Footer() {
  const pathname = usePathname();
  return (
    <div className="w-full bg-[#012959] text-white">
      <div className="p-12 lg:p-16 lg:pr-2 xl:p-28 ">
        <div className="flex flex-col md:flex-row md:justify-center gap-8 md:gap-3 lg:gap-8">
          <div className="basis-1/3 flex flex-col gap-4 xl:gap-8">
            <div className="flex flex-col md:gap-4 lg:mb-4">
              <Link href="/">
                <div className="md:pt-1">
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
                  <img
                    src="/icons/mdi_phone.svg"
                    className="h-[20px] w-[20px] lg:h-[30px] lg:w-[30px]"
                    alt=""
                  />
                </div>
                <div>+ 92 331 9660156</div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <img
                    src="/icons/entypo_email.svg"
                    className="h-[20px] w-[20px] lg:h-[27px] lg:w-[27px]"
                    alt=""
                  />
                </div>
                <div>
                  <a href="mailto:hr@codesyncs.com" target="_blank">
                    hr@codesyncs.com
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
          <div className="basis-1/3 flex flex-col gap-4 md:gap-[28px]">
            <span className="font-poppins font-semibold text-[26.48px] leading-[39.72px] tracking-[6%] uppercase">
              Our services
            </span>
            <div className="flex text-[#FFFFFF] flex-col gap-[15px] font-poppins font-light text-18px 2xl:text-[20px] leading-[32.78px] tracking-[2%]">
              <span>Web/Mobile development</span>
              <span>Web design</span>
              <span>E-commerce solutions</span>
              <span>Responsive design</span>
              <span>Quality assurance and testing</span>
              <span>Support and maintenance</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 xl:gap-[28px] bg-none xl:bg-cover xl:bg-center xl:bg-[url('/footer-bg.png')] xl:min-w-[500px] xl:min-h-[400px] xl:max-w-[500px] xl:max-h-[400px]">
            <span className="uppercase font-poppins font-semibold text-[26.48px] leading-[39.72px] tracking-[6%]">
              Information
            </span>
            <div className="flex flex-col gap-[15px] font-poppins font-light text-18px 2xl:text-[20px] leading-[32.78px] tracking-[2%]">
              <Link href="/services" className={` ${pathname === "/services"}`}>
                <span className="">Services</span>
              </Link>
              <Link
                href="/portfolio"
                className={` ${pathname === "/portfolio"}`}
              >
                <span className="">Portfolio</span>
              </Link>
              <Link href="/team" className={` ${pathname === "/team"}`}>
                <span className="">About Us</span>
              </Link>
              <Link href="/contact" className={` ${pathname === "/contact"}`}>
                <span className="">Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
