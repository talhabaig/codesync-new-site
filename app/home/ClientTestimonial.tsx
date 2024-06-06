export default function ClientTestimonial() {
  return (
    <div className="w-full text-white bg-gradient-to-b from-[#04396A] to-[#074a88]">
      <div className="2xl:container 2xl:mx-auto py-12 px-8 md:p-12 xl:p-24 2xl:px-12">
        <div className="text-center font-poppins mb-12 md:mb-24">
          <div className="flex items-center gap-2 md:gap-8 justify-center uppercase font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl leading-[20px] md:leading-[50px] lg:leading-[69px] tracking-[1.5%] mb-4">
            {/* <div className="h-[7px] w-[100px] md:w-[160px] rounded-lg bg-gradient-to-r  via-[#16B3C3] to-[#5BB1FF]"></div> */}
            <img src="/hori-line.svg" className='w-[90px] h-[9px] lg:w-auto lg:h-auto' alt="" />
            <div>
              <span className="font-poppins font-bold text-lg md:text-2xl 2xl:text-[50px] leading-[20px] md:leading-[30px] 2xl:leading-[69px] text-[#FFFFFF] tracking-[1.5%]">Client Testimonial</span>{" "}
            </div>
            <img src="/hori-line2.svg" className='w-[90px] h-[9px] lg:w-auto lg:h-auto' alt="" />
            {/* <div className="h-[7px] w-[100px] md:w-[160px] rounded-lg bg-gradient-to-r from-[#5BB1FF] via-[#16B3C3]"></div> */}
          </div>
          <div className="text-white mb-4 md:mb-[25px] text-[18px] md:text-[20px] lg:text-[22px] font-light leading-[32.78px] tracking-[2%]">
          We love our clients
          </div>
        </div>

        <div>
          <div className="mx-auto mb-12 p-6 md:p-12 bg-gradient-to-b from-[#0D86FF] to-[#17BABA] max-w-[950px] rounded-[23px] relative">
            <div className="flex gap-2 sm:gap-6 xl:gap-12 items-center mb-8">
              <img src="/testimonial-images/Asset1.png" className="h-[20px] w-[20px] md:h-auto md:w-auto" alt="" />
              <div className="font-normal font-poppins text-sm md:text-xl lg:text-2xl leading-6 md:leading-9 text-[#FFFFFF]">
                Codesync's fledgling frontend team is a promising addition to the market. their dedication to quality, rapid responsiveness, and inventive solutions is commendable.
              </div>
              <img src="/testimonial-images/Asset2.png" className="h-[20px] w-[20px] md:h-auto md:w-auto" alt="" />
            </div>
            <div className="flex justify-end">
              <span className="text-2xl tracking-[1.5%]"><span className="font-bold">Andreas markle</span><br /><span>CEO, Artonio</span></span>
            </div>
            <img src="/testimonial-images/Polygon.png" className="absolute bottom-[-28px] left-[30%] sm:left-[35%]"  alt="" />
          </div>
          
          <div className="flex justify-center gap-7 md:gap-20">
            <div className="">
              <img src="/testimonial-images/Ellipse1.png" className="rounded-[50%] shadow-[0_0_30px_#0E78E1]" alt="" />
            </div>
            <div>
              <img src="/testimonial-images/Ellipse2.png" className="rounded-[50%] shadow-[0_0_50px_#0E78E1]" alt="" />
            </div>
            <div>
              <img src="/testimonial-images/Ellipse3.png" className="rounded-[50%] shadow-[0_0_30px_#0E78E1]" alt="" />
            </div>
            <div>
              <img src="/testimonial-images/Ellipse4.png" className="rounded-[50%] shadow-[0_0_30px_#0E78E1]" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}