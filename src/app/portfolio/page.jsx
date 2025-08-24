"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const projectList = [
  {
    id: 1,
    color: "from-blue-300 to-violet-300",
    title: "E-Commerce Website",
    desc: "An E-Commerce clothing website built using MERN Stack technologies",
    img: "/websiteDesign.png",
    link: "https://github.com/rishab-699"
  },
  {
    id: 2,
    color: "from-violet-300 to-purple-300",
    title: "Accounts Manager",
    desc: "A Tally-like accounts manager built using MERN Stack technologies",
    img: "/websiteDesign.png",
    link: "https://github.com/rishab-699"
  },
  {
    id: 3,
    color: "from-purple-300 to-red-300",
    title: "ChatGPT AI-Bot",
    desc: "A ChatGPT-powered chatbot website built with React & Node.js",
    img: "/websiteDesign.png",
    link: "https://github.com/rishab-699"
  },
  {
    id: 4,
    color: "from-red-300 to-blue-300",
    title: "Blog Website",
    desc: "A blogging platform built using MERN Stack technologies",
    img: "/websiteDesign.png",
    link: "https://github.com/rishab-699"
  }
];

const PortfolioPage = () => {
  const containerRef = useRef(null);

  // Calculate dynamic section height based on number of projects
  const sectionHeight = projectList.length * 100; // in vh

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animate exactly n-1 widths
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-100%`]
  );

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div ref={containerRef} className="relative text-xl">
        {/* Header */}
        <div className="w-full h-[calc(100vh-6rem)] text-center flex items-center justify-center text-8xl font-bold">
          MY WORKS
        </div>

        {/* Horizontal scroll section */}
        {/* Horizontal scroll section */}
<div style={{ height: `${sectionHeight}vh` }} className="w-screen relative">
  <div className="sticky top-0 h-screen flex items-center overflow-hidden">
    <motion.div style={{ x }} className="flex h-full bg-gradient-to-r from-red-50 to-blue-300">
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-red-50 to-blue-300"></div>
      {projectList.map((item) => (
        <div
          key={item.id}
          className={`w-screen h-screen flex items-center justify-center bg-gradient-to-r ${item.color}`}
        >
          <div className="flex flex-col gap-4 text-white p-6 max-h-[90vh] overflow-y-auto">
            <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-6xl">{item.title}</h1>
            <div className="relative w-80 h-56 md:w-96 md:h-64 lg:w-[500px] lg:h-[350px] xl:w-[550px] xl:h-[570px]">
              <Image src={item.img} alt="Project Image" fill className="object-contain" />
            </div>
            <p className="text-lg w-80 md:w-96 lg:w-[500px] xl:w-[550px]">{item.desc}</p>
            <Link href={item.link} className="flex justify-end" target="_blank">
              <button className="px-6 py-2 bg-white text-black rounded-lg font-semibold shadow-md hover:scale-105 transition">
                See Demo
              </button>
            </Link>
          </div>
        </div>
      ))}
    </motion.div>
  </div>
</div>


        {/* Hire Me Section */}
        <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center gap-24 bg-gray-50">
          <h1 className="text-6xl">Do you have a project?</h1>
            <div className="relative flex items-center justify-center">
                {/* Rotating circular text */}
                <motion.svg
                    animate={{ rotate: "360deg" }}
                    transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                    className="absolute h-40 w-40 md:h-60 md:w-60"
                    viewBox="0 0 300 300"
                >
                    <defs>
                    <path
                        id="circlePath"
                        d="M150,150 m-120,0 a120,120 0 1,1 240,0 a120,120 0 1,1 -240,0"
                    />
                    </defs>
                    <text fill="black" fontSize="23.5" fontWeight="bold">
                    <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                        ● UI/UX Design ● Web Development ● AI-Integration ● Let&apos;ss Work
                    </textPath>
                    </text>
                </motion.svg>

                {/* Button in center */}
                <Link
                    href="/contact"
                    className="relative z-10 flex items-center justify-center h-16 w-16 md:h-28 md:w-28 rounded-full bg-black text-white text-center text-lg p-4 md:text-2xl shadow-lg cursor-pointer hover:scale-105 transition"
                >
                    Hire me!
                </Link>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioPage;
