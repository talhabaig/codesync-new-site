"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import "react-quill/dist/quill.bubble.css"; // Import Quill's CSS
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

// Dynamically import the Quill editor to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Career {
  id: string;
  position: string;
  type: string;
  department: string;
  location: string;
  date: string;
  lastDate: string;
  createdAt: string;
  totalPositions:string;
  salary:string;
}

interface Props {
  params: {
    career: string;
  };
}

const CareerDetailPage: React.FC<Props> = ({ params }) => {
  const [career, setCareer] = useState<Career | null>(null);
  const careerId = params.career; 

  useEffect(() => {
    const fetchCareerDetails = async () => {
      const careerRef = doc(db, "careers", careerId); 
      const careerSnap = await getDoc(careerRef);

      if (careerSnap.exists()) {
        setCareer(careerSnap.data() as Career);
      } else {
        console.error("No such career found!");
      }
    };

    fetchCareerDetails();
  }, [careerId]);

  if (!career) {
    return <div className="h-[400px] flex justify-center items-center"><p>Loading...</p></div>;
  }

  return (
    <div className="w-full">
      <div className="2xl:container 2xl:mx-auto">
        <div className="p-8 md:px-24 md:py-12 lg:py-16">
          <div className="text-[18px] mb-4 flex gap-2 items-center">
            <h1>Jop Openings</h1> 
            <span className="text-[#005baa]">
              <FontAwesomeIcon icon={faAngleRight} />
            </span> 
            <span className="text-[#005baa]">{career.position}</span>
          </div>
          <div className="flex font-poppins">
            <div className="basis-[70%] pr-4">
              <div className="">
                <div className="uppercase  text-[#005baa] text-[2rem] mb-6">We're Hiring</div>
                <div className="text-3xl mb-2 font-poppins font-semibold text-[24px] md:text-[27.3px] lg:text-[37px] leading-[36px] md:leading-[45.5px] lg:leading-[60px] tracking-[4%] text-[#000000]">{career.position}</div>
                
              </div>
            </div>
            <div className="basis-[30%] font-poppins bg-[#F2F7FB] p-4 md:p-8 lg:p-10 flex flex-col gap-4">
              <div className="text-[#636363] font-medium text-lg">Join Us</div>
              <div className="font-medium text-2xl">{career.position}</div>
              <div className="font-light text-lg flex flex-col gap-2">
                <span>Type:</span>
                <span className="text-[#005baa]">{career.type}</span>
              </div>
              <div className="font-light text-lg flex flex-col gap-2">
                <span>Salary Range:</span>
                <span className="text-[#005baa]">{career.salary} PKR</span>
              </div>
              <div className="font-light text-lg flex flex-col gap-2">
                <span>No. of Positions:</span>
                <span className="text-[#005baa]">{career.totalPositions}</span>
              </div>
              <div className="font-light text-lg flex flex-col gap-2">
                <span>Date Posted:</span>
                <span className="text-[#005baa]">{career.date}</span>
              </div>
              <div className="font-light text-lg flex flex-col gap-2">
                <span>Last Applied Date:</span>
                <span className="text-[#005baa]">{career.lastDate}</span>
              </div>
              <div className="font-light text-lg flex flex-col gap-2">
                <span>Location:</span>
                <span className="text-[#005baa]">{career.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetailPage;
