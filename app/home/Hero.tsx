"use client";
import React, { useEffect, useState } from 'react';
import Button from '@/app/components/common/Button';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Hero() {
  const pathname = usePathname();
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [index, setIndex] = useState(1);
  const [typingSpeed, setTypingSpeed] = useState(200);
  const dataText = [
    "Unlocking the Power of Strategic Programming Phases With us",
    "Unlock Your Potential with Strategic Programming",
    "Empower Growth Through Expert Programming"
  ];
  useEffect(() => {
    const handleType = () => {
      const i = loopNum % dataText.length;
      const currentText = dataText[i].split(" ");
      const fullText = currentText.slice(1).join(" ");
      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      if (!isDeleting && text === fullText) {
        setIsDeleting(true);
        setTypingSpeed(100);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setIndex(1);
        setTypingSpeed(150);
      } else {
        setIndex(prevIndex => prevIndex + 1);
      }
    };
    const timer = setTimeout(() => {
      handleType();
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting]);
  const getFirstWord = (phrase: string) => {
    return phrase.split(" ")[0];
  };

  return (
    <div className="w-full text-white max-h-[818px] bg-gradient-to-b md:bg-gradient-to-r from-customBlue1 to-customMint">
      <div className="flex flex-col md:flex-row justify-center items-center md:pt-8 lg:pt-9 xl:pt-12 2xl:pt-16">
        <div className='basis-full md:basis-[45%] lg:basis-1/2 flex justify-center md:justify-end items-start pt-12 md:pt-0'>
          <div className="flex flex-col basis-[70%] md:basis-[86%] 2xl:basis-[85%]">
            <div className="uppercase font-poppins font-bold text-2xl md:text-xl lg:text-3xl xl:text-3xl 2xl:text-[50px]  leading-[35px] md:leading-[30px] lg:leading-[40px] lg:mb-2 xl:leading-[45px] 2xl:leading-[4Z5px] tracking-[15%] max-h-[10.4rem] min-h-[10.4rem] md:max-h-[6rem] md:min-h-[6rem] lg:max-h-[7rem] lg:min-h-[7rem] 2xl:max-h-[12rem] 2xl:min-h-[12rem]">
              <span className="typing-container">
                <span className='text-customCyan'>{getFirstWord(dataText[loopNum % dataText.length])}</span> {text}
              </span>
            </div>
            <p className="mb-4 md:mb-2 lg:mb-4 font-poppins font-light text-[16px] md:text-[13.3px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] leading-[24px] md:leading-[24px] xl:leading-[32.78px] tracking-[2%]">
              Enhance programming effectiveness through clear objective
              definition, comprehensive planning, structured development, thorough
              testing, and continuous improvement.
            </p>
            <div className='xl:mb-8'>
              <Link href="/hireus" className={` ${pathname === "/hireus"}`}>
                <Button customClass="text-white font-medium text-[21.72px] leading-[32.58px] py-2 px-4 bg-gradient-to-t from-customBlue2 to-customBlue3 h-[55.26px] rounded-[8.45px] hover:transition-transform hover:duration-300 hover:ease-in-out  hover:shadow-[0_0_15px_#005BA1]" >Hire us now</Button>
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
