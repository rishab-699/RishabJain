"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const Homepage = () => {
  return <motion.div className="h-full"
    initial={{y:"-200vh"}}
    animate={{y:"0%"}}
    transition={{duration:1}}
  >
    <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-xl">
      {/*Image Container */}
      <div className="h-1/2 lg:h-full lg:w-1/2 relative">
        <Image src="/hero.png" className="object-contain" alt="Image" fill />
      </div>
      {/*Text Container */}
      <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-4 md:gap-6 lg:gap-8 items-center justify-center">
        {/*TITLE */}
        <h1 className="text-2xl md:text-4xl lg:6xl font-bold">Passionate Developer, Coder, UI/UX Designer</h1>
        <p className="text-sm md:text-xl">Passionate UI/UX Designer and web developer with
          expertise in front-end and back-end
          technologies. Skilled in JavaScript,
          React, Node.js, and Python. Committed
          to continuous learning.
        </p>
        <div className="w-full flex gap-4 text-sm sm:text-base">
          <Link className="p-4 bg-black text-white rounded-lg ring-1" href='/portfolio'>
            View my Work
          </Link>
          <Link className="p-4 bg-white text-black rounded-lg" href='/contact'>
            Contact me
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
};

export default Homepage;
