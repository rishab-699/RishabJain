"use client"

import { motion, useInView, useScroll } from "framer-motion";
import Brain from "../components/brain"
import { useRef } from "react";

const AboutPage = ()=>{
    const skills = ["ReactJs", "JavaScript", "Java", "Python", "Framer Motion", "Tailwind Css","MongoDB","MySQL","PostgresSQL", "GraphQL","NEXT JS"]
    const containerRef = useRef();
    const { scrollYProgress } = useScroll({ container: containerRef });
    const skillref = useRef();
    const skillrefInView = useInView(skillref,{once:true},{margin:"500px"})
    return(
        <motion.div className="h-full"
            initial={{y:"-200vh"}}
            animate={{y:"0%"}}
            transition={{duration:1}}
        >
        <div className="h-full overflow-scroll lg: flex" ref={containerRef}>
            <div className=" p-4 lg:w-2/3 lg:p0 xl:w-1/2 sm:p-8 md:p-12 lg:p-20 xl:p-48 flex flex-col gap-24 md:gap-36 lg:gap-48 xl:gap-60">
                {/*BIOGRAPHY CONTAINER */}
                <div className="flex flex-col gap-12 justify-center">
                    <h1 className="font-black text-2xl">BIOGRAPHY</h1>
                    <p className="lg:text-lg xl:text-2xl">
                        Passionate UI/UX Designer and web developer with
                        expertise in front-end and back-end
                        technologies. Skilled in JavaScript,
                        React, Node.js, and Python. Committed
                        to continuous learning.
                    </p>
                    <div className="w-full flex items-end justify-end text-right">
                            <img 
                            src="/signature.svg" 
                            alt="rishab jain" 
                            className="w-40 h-auto" 
                            />
                    </div>
 
                    
                </div>
                {/*Skills Container */}
                <div className="flex flex-col gap-12 justify-center" ref={skillref}>
                    <motion.h1
                     initial={{x:"-300px"}}
                     animate={skillrefInView?{x:"0"}:{}}
                     transition={{delay:0.2}}
                     className="font-black text-2xl">SKILLS</motion.h1>
                    {/*Skills */}
                    <div className="flex gap-4 flex-wrap">
                        {skills.map((value,index)=>{
                            return <motion.div
                            initial={{x:"-300px"}}
                            animate={skillrefInView?{x:"0"}:{}}
                            transition={{delay:0.4}}
                            key={index} 
                            className="p-2 bg-black text-white font-bold cursor-pointer text-lg rounded text-center h-fit hover:bg-white hover:text-black">{value}</motion.div>
                        
                        })}
                        
                    </div>
                </div>
                <div className="">
                    experience
                </div>
            </div>
            <div className=" hidden lg:block w-1/3 sticky top-0 lg:w-1/2">
                <Brain scrollYProgress={scrollYProgress}/>
            </div>
        </div>
        </motion.div>
    )
}

export default AboutPage;