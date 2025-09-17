"use client"

import Image from "next/image";
import Link from "next/link"
import { useState } from "react";
import NavLinks from "./navLinks";
import { motion } from "framer-motion";

const links = [
        {url: "/", title: "Home"},
        {url: "/about", title: "About"},
        {url: "/portfolio", title: "Portfolio"},
        {url: "/contact", title: "Contact"},
    ];
const Navbar = ()=>{
    const [open,setOpen] = useState(false);

    const topVariants={
        closed:{
            rotate:0,
        },
        open:{
            rotate:45,
            backgroundColor:"rgb(255,255,255)",
        }
    }
    const centerVariants={
        closed:{
            opacity:1,
        },
        open:{
            opacity:0,
        }
    }
    const bottomVariants={
        closed:{
            rotate:0,
        },
        open:{
            rotate:-45,
            backgroundColor:"rgb(255,255,255)"
        }
    }
    const listVariants={
        closed:{
            x:"100vw",
        },
        open:{
            x:"0",
            transition:{
                duration:0.2,
                when:'beforeChildren',
                staggerChildren:0.2,
            }
        }
    }
    const listItemVariants={
        closed:{
            x:-10,
            opacity:0
        },
        open:{
            x:0,
            opacity:1
        }
    }

    return(
        <div className="h-full z-30 flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-xl">
            {/*Menu */}
            <div className="hidden md:flex gap-4 w-1/3">
                {links.map((link)=>{
                    return <NavLinks link={link} key={link.url}/>
                })}
            </div>
            {/*LOGO */}
            <div className="md:hidden lg:flex xl:w-1/3 xl: justify-center">
                <Link href='/' className="text-sm bg-black rounded-md p-1 font-semibold flex items-center justify-center">
                    <span className="text-white mr-1">Rishab</span>
                    <span className="w-12 h-8  rounded bg-white text-black flex items-center justify-center">Jain</span>
                </Link>
            </div>
            {/*Social Links */}
            <div className="hidden md:flex gap-4 w-1/3">
                <Link href="https://github.com/rishab-699" >
                    <Image src="/github.png" alt='github' width={24} height={24} />
                </Link>
                <Link href="https://github.com/rishab-699" >
                    <Image src="/facebook.png" alt='github' width={24} height={24} />
                </Link>
                <Link href="https://github.com/rishab-699" >
                    <Image src="/instagram.png" alt='github' width={24} height={24} />
                </Link>
                <Link href="https://www.linkedin.com/in/rushab-chajjed/" >
                    <Image src="/linkedin.png" alt='github' width={24} height={24} />
                </Link>
                <Link href="https://github.com/rishab-699" >
                    <Image src="/pinterest.png" alt='github' width={24} height={24} />
                </Link>
            </div>
            {/*Responsive menu */}
            <div className="md:hidden">
                <button className="w-10 h-8 flex flex-col justify-between z-30 relative" onClick={()=> setOpen(!open)}>
                    <motion.div 
                        variants={topVariants}
                        animate={open?'open':'closed'}
                        className={"w-10 h-1 bg-black rounded origin-left"}></motion.div>
                    <motion.div 
                        variants={centerVariants} 
                        animate={open?'open':'closed'}
                        className="w-10 h-1 bg-black rounded origin-left"></motion.div>
                    <motion.div 
                        variants={bottomVariants}                        
                        animate={open?'open':'closed'}
                        className="w-10 h-1 bg-black rounded origin-left"></motion.div>
                </button>   
                {/*Menu List */}
                {
                    open &&(
                    <motion.div 
                    variants={listVariants}
                    initial='closed'
                    animate='open'
                    className="absolute top-0 left-0 h-screen w-screen bg-black text-white 
                    flex flex-col items-center justify-center gap-8 text-4xl z-30">
                        {links.map(links=>{

                        return <motion.div key={links.url} variants={listItemVariants}>
                            <Link href={links.url}>{links.title}</Link>
                        </motion.div>
                        
                        })}
                    </motion.div>
                )}   
            </div>
        </div>
    )
}

export default Navbar