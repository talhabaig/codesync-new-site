"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import styles from "../styles/layout.module.css";


export const Nav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-customNavy text-white relative p-[16px] md:py-[18px] md:px-[2rem] lg:py-[15px] lg:px-[3rem] 2xl:py-[24px] 2xl:px-[6rem]">
      <div className=" h-full flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/CodeSyncLogo.svg"
              alt="Logo"
              className="w-[150px] md:w-[170px] lg:w-[200px]"
            />
          </Link>
        </div>
        <div className="md:hidden">
          <button ref={buttonRef} onClick={handleToggle} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
        <div
          ref={menuRef}
          className={`${styles.navMenu} ${isOpen ? styles.open : ""}`}
        >
          <div className="flex flex-col md:flex-row md:gap-1 md:items-center lg:gap-3 xl:gap-3 py-4 px-6 md:p-0">
            <Link href="/">
              <div
                onClick={handleClose}
                className={`nav-link ${styles.link} ${
                  pathname === "/" ? `${styles.active} active` : ""
                } md:px-3 lg:px-[18px] py-[10px] font-poppins font-normal md:text-md lg:text-lg leading-[27px]`}
              >
                Home
              </div>
            </Link>
            <Link href="/services">
              <div
                onClick={handleClose}
                className={`nav-link ${styles.link} ${
                  pathname === "/services" ? `${styles.active} active` : ""
                } md:px-3 lg:px-[18px] py-[10px] font-poppins font-normal md:text-md lg:text-lg leading-[27px]`}
              >
                Services
              </div>
            </Link>
            <Link href="/portfolio">
              <div
                onClick={handleClose}
                className={`nav-link ${styles.link} ${
                  pathname === "/portfolio" ? `${styles.active} active` : ""
                } md:px-3 lg:px-[18px] py-[10px] font-poppins font-normal md:text-md lg:text-lg leading-[27px]`}
              >
                Portfolio
              </div>
            </Link>
            <Link href="/team">
              <div
                onClick={handleClose}
                className={`nav-link ${styles.link} ${
                  pathname === "/team" ? `${styles.active} active` : ""
                } md:px-3 lg:px-[18px] py-[10px] font-poppins font-normal md:text-md lg:text-lg leading-[27px]`}
              >
                Our Team
              </div>
            </Link>
          </div>
          <div className="px-[20px] md:px-[1px] md:mt-0">
            <Link
              href="/contact"
              className={`${styles.link} ${
                pathname === "/contact" ? styles.active : ""
              }`}
            >
              <button
                onClick={handleClose}
                className="text-white mb-5 md:mb-0 font-normal py-2 px-4 md:px-2 lg:px-4 rounded bg-gradient-to-b from-customBlue4 to-customSky hover:from-[#156fba] hover:to-[#4ba5ea] lg:w-[135px] lg:h-[46px] hover:transform hover:transition-transform hover:duration-300 hover:ease-out hover:shadow-[0_0_15px_#156fba]"
              >
                Contact Us
              </button>
            </Link>
          </div>
        </div>
       
      </div>
    </nav>
  );
};
