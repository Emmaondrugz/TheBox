"use client";

import { useState } from "react";
import Image from "next/image";
import "./globals.css";
import FormModal from '../../components/FormModal'

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([])

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);



  return (
    <>
      <div
        className="min-h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/bags-rack-store.jpg')" }}
      >
        {/* Main content */}
        <div className="min-h-screen w-full bg-black/70 flex flex-col text-white">
          {/* The header component */}
          <div className="pt-4 sm:pt-6 text-black w-full flex justify-center">
            <div className="w-[92%] z-100 relative sm:w-11/12 max-w-[640px] bg-white shadow flex items-center justify-between rounded-full pr-2 pl-4 sm: py-2 mx-auto">
              {/* TheBox logo */}
              <div className="flex items-center">
                <Image
                  src="/logo-2.png"
                  alt="TheBox logo"
                  width={100}
                  height={100}
                  className="w-7 h-7 sm:w-9 sm:h-9"
                />
              </div>

              {/* navigation buttons */}
              <div className="flex items-center">
                <button
                  onClick={openModal}
                  className="bg-[#f2f2f2] cursor-pointer py-1.5 sm:py-2 px-4 sm:px-5 rounded-full poppins font-normal hover:bg-[#e4e4e4] transition-colors duration-200"
                >
                  Get started
                </button>
              </div>
            </div>
          </div>

          {/* Hero content */}
          <div className="flex-1 flex items-center justify-center px-4 sm:-mt-40">
            <div className="lg:max-w-[800px] md:max-w-[600px] max-w-[500px] text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold cormorant-garamond">
                E-commerce Secure. Synchronized and Sophisticated.
              </h1>
              <p className="max-w-[600px] mx-auto mt-4 text-sm sm:text-base md:text-lg text-gray-200">
                Experience a shopping backend built for the modern web. From real-time product synchronization to secure JWT-protected checkout flows
              </p>
              <div>
                <button
                  onClick={openModal}
                  className="border border-white cursor-pointer text-sm sm:text-base md:text-lg hover:bg-white hover:text-black transition-all duration-300 px-5 sm:px-6 py-2 mt-6"
                >
                  Start shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-200 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <FormModal closeModal={closeModal} />
        </div>
      )}
    </>
  );
}
