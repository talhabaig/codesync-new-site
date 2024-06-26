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
        <div className="pl-4 lg:pl-8 xl:pl-8 2xl:pl-20 flex justify-start items-start md:items-center md:basis-[45%] lg:basis-1/2">
          <div className="py-8 md:py-0 flex flex-col basis-[90%] md:basis-[90%] md:pl-4 2xl:basis-[85%] 3xl:basis-[80%]">
            <div className="fly-in-left uppercase font-poppins font-bold text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[45px] 3xl:text-[50px] lg:mb-2 2xl:leading-[58px] 3xl:leading-[69px] tracking-[1.5%]">
              <span className="text-[#ffffff]">Our Diverse Range of IT</span>{" "}
              <span className="text-[#00FFFF]">Services</span>
            </div>
            <p className="fly-in-1-5s mb-4 md:mb-2 lg:mb-4 2xl:mb-[25px] font-poppins font-light text-[16px] md:text-[13.3px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] leading-[24px] md:leading-[24px] xl:leading-[32.78px] tracking-[2%]">
              Elevate your digital presence with our diverse IT services, from
              web development to innovative software solutions.
            </p>
            <div className="fly-in-2s">
              
              <Link href="/hireus" className={` ${pathname === "/hireus"}`}>
                <Button customClass="text-white font-medium text-[21.72px] leading-[32.58px] py-2 px-4 bg-gradient-to-t from-customBlue2 to-customBlue3 h-[55.26px] rounded-[8.45px] hover:transition-transform hover:duration-300 hover:ease-in-out hover:shadow-[0_0_15px_#005BA1]">
                  Hire us now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className='basis-full md:basis-[55%] lg:basis-1/2 md:pt-16 3xl:pr-8'>
        <div className="flex flex-col md:flex-row justify-end md:justify-center items-center 3xl:justify-end">
          <div className='relative'>
            <img src="/services-hero.svg" className="w-full md:h-[262px] lg:h-[330px] xl:h-[400px] 2xl:h-[490px] 3xl:h-[515px]" alt="Header Image" />
            <Icon name='animated-icons/gear' className='rotate-infinite absolute top-[3.25rem] sm:top-[3.5rem] md:top-[-20px] lg:top-[-10px] xl:top-[-10px] 2xl:top-[0px] 3xl:top-[0px] right-[28%] w-[25px] sm:w-[30px] md:w-[34px] xl:w-[40px] 2xl:w-[54px] '/>
            <Icon name='animated-icons/big-gear' className='reverse-rotate-infinite absolute top-16 md:top-[10px] lg:top-[10px] xl:top-[20px] 2xl:top-[30px] 3xl:top-[30px] right-[18%] w-[35px] md:w-[43px] xl:w-[56px] 2xl:w-[62px]'/>
            <Icon name='animated-icons/light-gear' className='rotate-infinite absolute top-16 md:top-[-10px] lg:top-2 xl:top-1 2xl:top-4 3xl:top-4 right-[8%] w-[25px] md:w-[34px] xl:w-[46px]'/>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
