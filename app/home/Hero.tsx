import Button from '@/app/components/common/Button';

export default function Hero() {
  return (
    <div className="w-full text-white max-h-[818px] bg-gradient-to-b md:bg-gradient-to-r from-customBlue1 to-customMint">
      <div className="2xl:container 2xl:mx-auto flex flex-col md:flex-row justify-center items-end md:pt-8 lg:pt-9 xl:pt-12 2xl:pt-16">
        <div className="md:basis-[45%] lg:basis-1/2 flex flex-col max-w-[80%] sm:max-w-[70%] lg:max-w-[80%] md:pl-12 mx-auto xl:pl-16 2xl:pl-20 py-10 xl:py-20">
          <div className="uppercase font-poppins font-bold text-2xl md:text-xl lg:text-3xl xl:text-4xl leading-[35px] md:leading-[30px] lg:leading-[40px] lg:mb-2 xl:leading-[45px] 2xl:leading-[55px] tracking-[15%]">
            <span className="text-customCyan">Unlocking</span> the Power of
            Strategic Programming Phases With us
          </div>
          <p className="mb-4 md:mb-2 lg:mb-4 font-poppins font-light text-[16px] md:text-[13.3px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] leading-[24px] md:leading-[24px] xl:leading-[32.78px] tracking-[2%]">
            Enhance programming effectiveness through clear objective
            definition, comprehensive planning, structured development, thorough
            testing, and continuous improvement
          </p>
          <div className='xl:mb-8'>
            {/* <button className="text-white font-medium text-[21.72px] leading-[32.58px] py-2 px-4 bg-gradient-to-t from-customBlue2 to-customBlue3 h-[55.26px] rounded-[8.45px]">
              Hire us now
            </button> */}
            <Button customClass="text-white font-medium text-[21.72px] leading-[32.58px] py-2 px-4 bg-gradient-to-t from-customBlue2 to-customBlue3 h-[55.26px] rounded-[8.45px]" >Hire us now</Button>
          </div>
        </div>
        <div className="md:basis-[55%] lg:basis-1/2">
          <img src="/home-header.svg" className="w-full" alt="Header Image" />
        </div>
      </div>
    </div>
  );
}