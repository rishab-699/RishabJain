"use client";

import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./navbar";
import { usePathname } from "next/navigation";

const Transitionprovider = ({ children }) => {
    const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
        <div key={pathname} className="h-screen w-screen bg-gradient-to-b from-blue-50 to-red-50">
            <motion.div
                animate={{ height: "0vh" }}
                exit={{ height: "140vh" }}
                transition={{ duration: 0.5, ease:"easeOut" }}
                className="h-screen w-screen fixed bg-black rounded-b-[100x] z-40"
            />
            <motion.div

                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease:"easeOut" }}
                className="fixed m-auto top-0 bottom-0 left-0 right-0 text-white text-8xl cursor-default z-50 w-fit h-fit"
            >
                {pathname === "/"?"Home":pathname.substring(1)}
            </motion.div>
            <motion.div
                initial={{ height: "140vh" }}
                animate={{ height: "0", 
                        transition:{ 
                            delay:1 ,duration: 0.5, ease:"easeOut" 
                        } 
                    }}
                
                className="h-screen w-screen fixed bg-black rounded-t-[100x] bottom-0 z-40"
            />
            
            <div className="h-24">
                <Navbar />
                <div className="h-[calc(100vh-6rem)]">{children}</div>
            </div>
        </div>
    </AnimatePresence>
  );
};

export default Transitionprovider;
