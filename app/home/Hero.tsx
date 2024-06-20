"use client";
import React, { useEffect, useState } from 'react';
import Button from '@/app/components/common/Button';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Hero() {
  const pathname = usePathname();
  const [text, setText] = useState('');
  const fullText = 'Unlocking the Power of Strategic Programming Phases With us';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) {
        setTimeout(() => {
          setText('');
          index = 0;
        }, 10000); // Adjust delay before restarting typing
      }
    }, 200); // Adjust typing speed here (milliseconds per character)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full text-white max-h-[818px] bg-gradient-to-b md:bg-gradient-to-r from-customBlue1 to-customMint">
      <div className="flex flex-col md:flex-row justify-center items-center md:pt-8 lg:pt-9 xl:pt-12 2xl:pt-16">
        <div className='basis-full md:basis-[45%] lg:basis-1/2 flex justify-center md:justify-end items-start pt-12 md:pt-0'>
          <div className="flex flex-col basis-[70%] md:basis-[86%] 2xl:basis-[85%]">
            <div className="uppercase font-poppins font-bold text-2xl md:text-xl lg:text-3xl xl:text-4xl 2xl:text-[50px] leading-[35px] md:leading-[30px] lg:leading-[40px] lg:mb-2 xl:leading-[45px] 2xl:leading-[55px] tracking-[15%]">
              <span className="text-customCyan typing-container">{text}</span>
            </div>
            <p className="mb-4 md:mb-2 lg:mb-4 font-poppins font-light text-[16px] md:text-[13.3px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] leading-[24px] md:leading-[24px] xl:leading-[32.78px] tracking-[2%]">
              Enhance programming effectiveness through clear objective
              definition, comprehensive planning, structured development, thorough
              testing, and continuous improvement.
            </p>
            <div className='xl:mb-8'>
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
            <img src="/home-header.svg" className="w-full" alt="Header Image" />
          </div>
        </div>
      </div>
    </div>
  );
}
