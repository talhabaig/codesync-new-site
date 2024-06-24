"use client"
import React from 'react'
import Button from '../components/common/Button'
import Icon from '../components/common/icon'
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Hero() {
  const pathname = usePathname();
  return (
    <div className="w-full text-white max-h-[818px] bg-gradient-to-b md:bg-gradient-to-r from-customBlue1 to-customMint">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="pl-4 lg:pl-8 xl:pl-8 2xl:pl-20 flex justify-start items-start md:items-center 2xl:items-start md:basis-[45%] lg:basis-1/2">
          <div className="py-8 md:py-12 2xl:pt-24 flex flex-col basis-[90%] md:basis-[86%] md:pl-4 2xl:basis-[72%]">
            <div className="uppercase font-poppins font-bold text-2xl md:text-xl lg:text-3xl xl:text-4xl 2xl:text-[50px] leading-[35px] md:leading-[30px] lg:leading-[40px] lg:mb-2 xl:leading-[45px] 2xl:leading-[69px] tracking-[1.5%]">
              <span className="text-[#ffffff]">Our Diverse Range of IT</span>{" "}
              <span className="text-[#00FFFF]">Services</span>
            </div>
            <p className="mb-4 md:mb-2 lg:mb-4 2xl:mb-[25px] font-poppins font-light text-[16px] md:text-[13.3px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] leading-[24px] md:leading-[24px] xl:leading-[32.78px] tracking-[2%]">
              Elevate your digital presence with our diverse IT services, from
              web development to innovative software solutions.
            </p>
            <div className="xl:mb-8">
              
              <Link href="/hireus" className={` ${pathname === "/hireus"}`}>
                <Button customClass="text-white font-medium text-[21.72px] leading-[32.58px] py-2 px-4 bg-gradient-to-t from-customBlue2 to-customBlue3 h-[55.26px] rounded-[8.45px] hover:transform hover:transition-transform hover:duration-300 hover:ease-in-out hover:scale-105 hover:shadow-[0_0_15px_#005BA1]">
                  Hire us now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className='basis-full md:basis-[55%] lg:basis-1/2'>
        <div className="flex flex-col justify-end items-end">
          <div className='relative'>
          <img src="/services-hero.svg" className="w-full 2xl:h-[580px] mt-16" alt="Header Image" />
          <Icon name='animated-icons/gear' className='rotate-infinite absolute top-[3.25rem] sm:top-[3.5rem] md:top-[3.5rem] lg:top-[3.5rem] xl:top-[40px] right-[28%] w-[25px] sm:w-[30px] md:w-[34px] xl:w-[40px] 2xl:w-[54px] '/>
          <Icon name='animated-icons/big-gear'  className='reverse-rotate-infinite absolute top-16 md:top-[72px] lg:top-[72px] right-[18%] w-[35px] md:w-[43px] xl:w-[64px]'/>
          <Icon name='animated-icons/light-gear' className='rotate-infinite absolute top-16 md:top-20 right-[8%] w-[25px] md:w-[34px] xl:w-[54px]'/>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
