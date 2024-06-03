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
              <div className="md:pt-1">
                <img src="/CodeSyncLogo.svg" alt="Logo" className="h-[64px] w-[329.16px] md:h-[39px] md:w-[210px] xl:h-[64px] xl:w-[329.16px]"></img>
              </div>
              <div className="font-poppins font-light text-18px lg:text-[20px] leading-[32.78px] tracking-[2%]">(C) IT Solution</div>
            </div>
            <div className="flex flex-col gap-[15px] font-poppins font-light text-18px 2xl:text-[22px] leading-[32.78px] tracking-[2%]">
              <div className="flex items-center gap-2">
                <div>
                  <img src="/icons/mdi_phone.svg" className="h-[20px] w-[20px] lg:h-[30px] lg:w-[30px]" alt="" />
                </div>
                <div>+ 92 331 9660156</div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <img src="/icons/entypo_email.svg" className="h-[20px] w-[20px] lg:h-[27px] lg:w-[27px]" alt="" />
                </div>
                <div><a href="mailto:contact@codesync.com">contact@codesync.com</a></div>
              </div>
            </div>
            <div className="flex gap-2">
              <img src="/icons/insta.svg" className="h-[42px] w-[42px] lg:h-[52px] lg:w-[52px] cursor-pointer" alt="" />
              <img src="/icons/linkedin.svg" className="h-[42px] w-[42px] lg:h-[52px] lg:w-[52px] cursor-pointer" alt="" />
              <img src="/icons/fb.svg" className="h-[42px] w-[42px] lg:h-[52px] lg:w-[52px] cursor-pointer" alt="" />
            </div>
          </div>
          <div className="basis-1/3 flex flex-col gap-4 md:gap-[28px]">
            <span className="font-poppins font-semibold text-[26.48px] leading-[39.72px] tracking-[6%] uppercase">Our services</span>
            <div className="flex text-[#FFFFFF] flex-col gap-[15px] font-poppins font-light text-18px 2xl:text-[20px] leading-[32.78px] tracking-[2%]">
              <span>Web/Mobile development</span>
              <span>Web design</span>
              <span>E-commerce solutions</span>
              <span>Responsive design</span>
              <span>Quality assurance and testing</span>
              <span>Support and maintenance</span>
            </div>
          </div>
          <div className="basis-1/3 flex flex-col gap-4 md:gap-[28px]" style={{ backgroundImage: 'url("/path/to/your/image.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <span className="uppercase font-poppins font-semibold text-[26.48px] leading-[39.72px] tracking-[6%]">Information</span>
            <div className="flex flex-col gap-[15px] font-poppins font-light text-18px 2xl:text-[20px] leading-[32.78px] tracking-[2%]">
              <Link href="/verify" className={` ${pathname === "/verify"}`}>
                <span className="">Services</span>
              </Link>
              <Link href="/quotes" className={` ${pathname === "/quotes"}`}>
                <span className="">Portfolio</span>
              </Link>
              <Link href="/team" className={` ${pathname === "/"}`}>
                <span className="">About Us</span>
              </Link>
              <Link href="/" className={` ${pathname === "/"}`}>
                <span className="">Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}