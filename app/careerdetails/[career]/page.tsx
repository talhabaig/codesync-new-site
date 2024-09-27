"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import "react-quill/dist/quill.bubble.css"; // Import Quill's CSS
import dynamic from 'next/dynamic';
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogTitle } from '@headlessui/react';
import Button from "@/app/components/common/Button";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  totalPositions: string;
  salary: string;
  jobcontent: string;
}

interface Props {
  params: {
    career: string;
  };
}

const CareerDetailPage: React.FC<Props> = ({ params }) => {
  const [career, setCareer] = useState<Career | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
  });

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = () => {
    console.log(formData);
    setIsOpen(false);
  };
  const closeDialog = () => {
    setIsOpen(false);
  };

  if (!career) {
    return <div className="h-[400px] flex justify-center items-center"><p>Loading...</p></div>;
  }

  return (
    <div className="w-full">
      <div className="2xl:container 2xl:mx-auto">
        <div className="p-8 md:p-12 lg:px-16 lg:py-16 xl:px-24">
          <div className="text-[18px] mb-4 flex gap-2 items-center">
            <h1>Job Openings</h1> 
            <span className="text-[#005baa]">
              <FontAwesomeIcon icon={faAngleRight} />
            </span> 
            <span className="text-[#005baa]">{career.position}</span>
          </div>
          <div className="flex flex-col md:flex-row font-poppins">
            <div className="md:basis-[65%] xl:basis-[70%] md:pr-4">
              <div className="">
                <div className="uppercase text-[#005baa] text-[2rem] mb-6">We're Hiring</div>
                <div className="text-3xl mb-2 font-poppins font-semibold text-[24px] md:text-[27.3px] lg:text-[37px] leading-[36px] md:leading-[45.5px] lg:leading-[60px] tracking-[4%] text-[#000000]">{career.position}</div>
                <div>
                  <div className="font-poppins">
                    <ReactQuill value={career.jobcontent} readOnly theme="bubble" />
                  </div>
                </div>

              </div>
            </div>
            <div className="md:basis-[35%] xl:basis-[30%] font-poppins">
              <div className="bg-[#F2F7FB] p-4 lg:p-6 xl:p-10 flex flex-col gap-4 md:gap-2 lg:gap-4">
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
                <Button
                  customClass="mt-1 bg-customBlue1 text-white font-medium text-[17.72px] leading-[28.58px] py-[6px] px-4 rounded-[4.45px] hover:shadow-[0_0_15px_#FFFFFF]"
                  onClick={() => setIsOpen(true)}
                >
                  How to Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
          
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
          <div className="bg-white w-full max-w-lg px-6 py-8 mx-auto rounded-lg shadow-lg z-20 relative max-h-[400px] lg:max-h-[550px] overflow-y-auto">
          <button
            onClick={closeDialog} className="absolute top-2 right-2"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
            <DialogTitle className="text-2xl font-semibold mb-4">Apply for {career.position}
              
            </DialogTitle>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block font-medium">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="resume" className="block font-medium">Upload Resume</label>
                <input
                  type="file"
                  id="resume"
                  className="w-full border border-gray-300 p-2 rounded"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <Button
                customClass="w-full mt-4 bg-customBlue1 text-white font-medium py-2 rounded"
                type="submit"
              >
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CareerDetailPage;
