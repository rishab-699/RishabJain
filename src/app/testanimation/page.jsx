"use client"

import { delay, motion } from "framer-motion"

const Testpage = ()=>{
    return(
        <div className="h-full flex items-center justify-center">
            <motion.div 
            className="w-96 h-96 bg-red-500 rounded" 
            initial={{x:-100}} 
            animate={{x:100, y:50, opacity:0.5}}
            transition={{delay:2, duration:4}}></motion.div>
            test page
        </div>
    )
}

export default Testpage