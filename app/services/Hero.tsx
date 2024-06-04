import React from 'react'
import Button from '../components/common/Button'

export default function Hero() {
  return (
    <div className="w-full text-white max-h-[818px] bg-gradient-to-b md:bg-gradient-to-r from-customBlue1 to-customMint">
    <div className="2xl:container 2xl:mx-auto flex flex-col md:flex-row justify-center md:pt-8 lg:pt-9 xl:pt-12 2xl:pt-16">
      <div className="flex justify-center items-center md:basis-[45%] lg:basis-1/2">
        <div className="flex flex-col basis-[90%]">
          <div className="uppercase font-poppins font-bold text-2xl md:text-xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-[35px] md:leading-[30px] lg:leading-[40px] lg:mb-2 xl:leading-[45px] 2xl:leading-[55px] tracking-[15%]">
            <span className="text-[#ffffff]">Our Diverse Range of</span> <span className="text-[#00FFFF]">Services</span> 
          </div>
          <p className="mb-4 md:mb-2 lg:mb-4 font-poppins font-light text-[16px] md:text-[13.3px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] leading-[24px] md:leading-[24px] xl:leading-[32.78px] tracking-[2%]">
          Elevate your digital presence with our diverse IT services, from web development to innovative software solutions.
          </p>
          <div className='xl:mb-8'>
            {/* <button className="text-white font-medium text-[21.72px] leading-[32.58px] py-2 px-4 bg-gradient-to-t from-customBlue2 to-customBlue3 h-[55.26px] rounded-[8.45px]">
              Hire us now
            </button> */}
            <Button customClass="text-white font-medium text-[21.72px] leading-[32.58px] py-2 px-4 bg-gradient-to-t from-customBlue2 to-customBlue3 h-[55.26px] rounded-[8.45px]" >Hire us now</Button>
          </div>
        </div>
      </div>
      <div className='md:basis-[55%] lg:basis-1/2'>
        <div className="">
          <img src="/services-hero.svg" className="w-full" alt="Header Image" />
        </div>
      </div>
      
    </div>
  </div>
  )
}
