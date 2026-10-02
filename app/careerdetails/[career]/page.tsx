"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Dialog, DialogTitle } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faClose } from "@fortawesome/free-solid-svg-icons";
import Button from "@/app/components/common/Button";
import { useGetPublicJobBySlug } from "../../../features/jobs/hooks/useGetPublicJobBySlug";
import { jobTypeLabel } from "../../../features/jobs/types";

interface Props {
  params: {
    career: string;
  };
}

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  portfolio: "",
};

function formatDate(value: string | null) {
  if (!value) return "Open";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Open";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function CareerDetailPage({ params }: Props) {
  const slug = params.career;
  const { data: career, isLoading, error } = useGetPublicJobBySlug(slug);
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone: string) => {
    const phonePattern = /^\d{10,}$/;
    return phonePattern.test(phone);
  };

  const closeDialog = () => {
    setFormData(emptyForm);
    setEmailError(false);
    setPhoneError(false);
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError(true);
      return;
    }
    if (!validatePhone(formData.phone)) {
      setPhoneError(true);
      return;
    }

    setEmailError(false);
    setPhoneError(false);
    setIsSending(true);

    const data = {
      service_id: "service_lrbfgto",
      template_id: "template_8rl61km",
      user_id: "1H1lVLszHQKK8Rwn0",
      template_params: {
        userName: formData.name,
        userEmail: formData.email,
        phoneNumber: formData.phone,
        linkedin: formData.linkedin,
        github: formData.github,
        portfolio: formData.portfolio,
        jobPosition: career?.title,
      },
    };

    try {
      await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
      setFormData(emptyForm);
      setIsOpen(false);
    } catch (submitError) {
      console.error("Error sending email", submitError);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-customBlue1" />
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="flex min-h-[50vh] w-full flex-col items-center justify-center bg-gradient-to-r from-customLightBlue to-customVeryLightBlue px-6">
        <p className="text-center text-lg text-customDarkGray/80">This job could not be found.</p>
        <Link href="/career" className="mt-4 font-medium text-customBlue1 hover:underline">
          Back to jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="2xl:container 2xl:mx-auto">
        <div className="p-8 md:p-12 lg:px-16 lg:py-16 xl:px-24">
          <div className="mb-4 flex items-center gap-2 text-[18px]">
            <Link href="/career" className="hover:text-[#005baa]">
              Job Openings
            </Link>
            <span className="text-[#005baa]">
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
            <span className="text-[#005baa]">{career.title}</span>
          </div>
          <div className="flex flex-col font-poppins md:flex-row">
            <div className="md:basis-[65%] md:pr-4 xl:basis-[70%]">
              <div className="mb-6 text-[2rem] uppercase text-[#005baa]">We&apos;re Hiring</div>
              <div className="mb-2 font-poppins text-3xl text-[24px] font-semibold leading-[36px] tracking-[4%] text-[#000000] md:text-[27.3px] md:leading-[45.5px] lg:text-[37px] lg:leading-[60px]">
                {career.title}
              </div>
              {career.shortDescription ? (
                <p className="mb-6 text-base leading-relaxed text-gray-600 md:text-lg">{career.shortDescription}</p>
              ) : null}
              <div
                className="prose prose-lg max-w-none text-left text-customDarkGray [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:font-semibold [&_img]:my-4 [&_img]:rounded-xl [&_li]:mb-1 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
                dangerouslySetInnerHTML={{ __html: career.description }}
              />
            </div>
            <div className="font-poppins md:basis-[35%] xl:basis-[30%]">
              <div className="flex flex-col gap-4 bg-[#C8E3F9] p-4 md:gap-2 lg:gap-4 lg:p-6 xl:p-10">
                <div className="text-lg font-medium text-[#636363]">Join Us</div>
                <div className="text-2xl font-medium">{career.title}</div>
                <div className="flex flex-col gap-2 text-lg font-light">
                  <span>Type:</span>
                  <span className="text-[#005baa]">{jobTypeLabel(career.jobType)}</span>
                </div>
                <div className="flex flex-col gap-2 text-lg font-light">
                  <span>Department:</span>
                  <span className="text-[#005baa]">{career.department}</span>
                </div>
                <div className="flex flex-col gap-2 text-lg font-light">
                  <span>Salary Range:</span>
                  <span className="text-[#005baa]">{career.salaryRange}</span>
                </div>
                <div className="flex flex-col gap-2 text-lg font-light">
                  <span>Last Applied Date:</span>
                  <span className="text-[#005baa]">{formatDate(career.expiresAt)}</span>
                </div>
                <div className="flex flex-col gap-2 text-lg font-light">
                  <span>Location:</span>
                  <span className="text-[#005baa]">{career.location}</span>
                </div>
                <Button
                  customClass="mt-1 rounded-[4.45px] bg-customBlue1 px-4 py-2 text-[17.72px] font-medium leading-[28.58px] text-white hover:shadow-[0_0_15px_#FFFFFF]"
                  onClick={() => setIsOpen(true)}
                >
                  Apply To This Job
                </Button>
                <Link
                  href="/career"
                  className="mt-1 inline-block w-full rounded-[4.45px] px-4 py-[6px] text-center text-[17.72px] font-medium leading-[28.58px] text-customBlue1 outline outline-1 outline-customBlue1 hover:bg-customBlue1 hover:text-white hover:shadow-[0_0_15px_#FFFFFF]"
                >
                  View All Jobs
                </Link>
              </div>
            </div>
          </div>
          <hr className="my-6" />
        </div>
      </div>

      <Dialog open={isOpen} onClose={closeDialog} className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
          <div className="relative z-20 mx-auto max-h-[400px] w-full max-w-lg overflow-y-auto rounded-lg bg-white px-6 py-8 shadow-lg md:max-h-[550px]">
            <button type="button" onClick={closeDialog} className="absolute right-2 top-2">
              <FontAwesomeIcon icon={faClose} />
            </button>
            <DialogTitle className="mb-4 text-2xl font-semibold">Apply for {career.title}</DialogTitle>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded border border-gray-300 p-2"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-full rounded border p-2 ${emailError ? "border-red-500" : "border-gray-300"}`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                {emailError && <span className="text-sm text-red-500">Invalid email format</span>}
              </div>
              <div>
                <label htmlFor="phone" className="block font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className={`w-full rounded border p-2 ${phoneError ? "border-red-500" : "border-gray-300"}`}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                {phoneError && <span className="text-sm text-red-500">Invalid phone format</span>}
              </div>
              <div>
                <label htmlFor="linkedin" className="block font-medium">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="mt-1 w-full rounded border border-gray-300 p-2"
                />
              </div>
              <div>
                <label htmlFor="github" className="block font-medium">
                  Github URL
                </label>
                <input
                  type="url"
                  id="github"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="mt-1 w-full rounded border border-gray-300 p-2"
                />
              </div>
              <div>
                <label htmlFor="portfolio" className="block font-medium">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  id="portfolio"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="mt-1 w-full rounded border border-gray-300 p-2"
                />
              </div>
              <Button
                customClass="mt-4 w-full rounded bg-customBlue1 py-2 font-medium text-white"
                type="submit"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
