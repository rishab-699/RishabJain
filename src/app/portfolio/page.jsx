"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


const PortfolioPage = () => {
  const containerRef = useRef(null);

  const [projectList, setProjects] = useState([]);
  const [loading, setLoading]= useState(false);
  const [error, setError]= useState({errState:false, msg:""});

  // Calculate dynamic section height based on number of projects
  let sectionHeight = 100; // in vh

  useEffect(()=>{
    const getProjects = async()=>{
      setLoading(true);
      try {
        const res = await fetch("/api/projects",{method:"GET"});
        if(res.ok){
          const data = await res.json();
          //console.log(data);
          sectionHeight = data.length *100;
          setProjects(data);
          setLoading(false)
        }else{
          const error = await res.json();
          setError({errState: true, msg:"server side Error"});
          setLoading(false);
        }
      } catch (error) {
        setError({errState: true, msg:"Error fetching projects"});
      }
    }
    getProjects();
  },[])

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
    {loading ?<div className="z-50 absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <motion.h1 
          initial={{opacity:"30%"}}
          animate={{opacity:"100%"}}
          transition={{duration:2, ease:"easeIn", repeat: Infinity}}
          className="text-4xl">Loading...</motion.h1>
      </div>:
      <div ref={containerRef} className="relative text-xl">
        {/* Header */}
        <div className="w-full h-[calc(100vh-6rem)] text-center flex items-center justify-center text-4xl md:text-6xl font-bold">
          <span><Link href={'/portfolio'} className="hover:text-blue-700" >My Projects</Link> / <Link href={'/designs'} className="hover:text-blue-700"> UI/UX Designs</Link></span>
        </div>
        {/* Horizontal scroll section */}
<div style={{ height: `${sectionHeight}vh` }} className="w-screen relative">
  <div className="sticky top-0 h-screen flex items-center overflow-hidden">
    <motion.div style={{ x }} className="flex h-full bg-gradient-to-r from-red-50 to-blue-300">
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-red-50 to-blue-300"></div>
      {projectList.map((item) => (
        <div
          key={item.id}
          className={`w-screen h-screen flex items-center justify-center bg-gradient-to-r ${item.id/2===0?"from-red-300 to-blue-300":"from-blue-300 to-red-300"}`}
        >
          <div className="flex flex-col gap-4 text-white p-6 max-h-[90vh] overflow-y-auto">
            <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-6xl">{item.title}</h1>
            <div className="relative w-80 h-56 md:w-96 md:h-64 lg:w-[500px] lg:h-[350px] xl:w-[550px] xl:h-[570px]">
              <Image src={item.url} alt="Project Image" fill className="object-contain" />
            </div>
            <p className="text-lg w-80 md:w-96 lg:w-[500px] xl:w-[550px]">{item.description}</p>
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
                        ● UI/UX Design ● Web Development ● AI-Integration ● Let&apos;s Work
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
    }
    </motion.div>
  );
};

export default PortfolioPage;
