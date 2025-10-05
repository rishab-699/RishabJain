"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link"
import { useEffect, useState } from "react";

const Loader = ()=>{
    return (
        <div className="flex flex-col gap-4">
        <motion.div
        initial={{opacity:'0%'}}
        animate={{opacity:'100%'}}
        transition={{duration:2, ease:'easeIn', repeat: Infinity}}
        className="w-full bg-gray-300 flex gap-4 items-start">
            <div className="h-48 aspect-[16/9] bg-gray-500 rounded-lg"></div>
            <div className="h-48 bg-gray-300 p-4 flex flex-col gap-4">
                <div className="h-12 w-full bg-green-500 rounded-lg"></div>
                <div className="h-16 w-full bg-black rounded-lg"></div>
                <div className="h-16 w-full bg-gray-50 rounded-lg"></div>
            </div>

        </motion.div>
        <motion.div
        initial={{opacity:'0%'}}
        animate={{opacity:'100%'}}
        transition={{duration:2, ease:'easeIn', repeat: Infinity}}
        className="w-full bg-gray-300 flex gap-4 items-start">
            <div className="h-48 aspect-[16/9] bg-gray-500 rounded-lg"></div>
            <div className="h-48 bg-gray-300 p-4 flex flex-col gap-4">
                <div className="h-12 w-full bg-green-500 rounded-lg"></div>
                <div className="h-16 w-full bg-black rounded-lg"></div>
                <div className="h-16 w-full bg-gray-50 rounded-lg"></div>
            </div>

        </motion.div>
        <motion.div
        initial={{opacity:'0%'}}
        animate={{opacity:'100%'}}
        transition={{duration:2, ease:'easeIn', repeat: Infinity}}
        className="w-full bg-gray-300 flex gap-4 items-start">
            <div className="h-48 aspect-[16/9] bg-gray-500 rounded-lg"></div>
            <div className="h-48 bg-gray-300 p-4 flex flex-col gap-4">
                <div className="h-12 w-full bg-green-500 rounded-lg"></div>
                <div className="h-16 w-full bg-black rounded-lg"></div>
                <div className="h-16 w-full bg-gray-50 rounded-lg"></div>
            </div>

        </motion.div>
        </div>
    )
}

const Blogpage = ()=>{
    const [blogDetails,setBlogDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError]=useState({errState:false, msg:''})
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                setLoading(true);
            const res = await fetch('/api/blog',{method:'GET'});
            if(!res.ok){
                setError({errState:true, msg:'Server Side Error'});
                setLoading(false)
                return
            }
            const data = await res.json();
            setBlogDetails(data);
            console.log(data);
            setLoading(false);
            console.log('loading: '+loading);
            } catch (error) {
                setError({errState:true, msg:'Something went wrong!'});
            }
            setLoading(false);
        }
        fetchData();
        setLoading(false)
    },[])
    return(
        <div className="w-full p-4">
            
            
            <div className="flex items-center justify-between p-4 w-full">
                <p className="text-lg font-bold">Blog Page</p>
                <Link href={'/dashboard/blog/addblog'} className="p-4 text-lg hover:font-bold bg-blue-900 hover:bg-blue-950 rounded-xl text-white">New Blog</Link>
            </div>
            <div className="bg-white rounded-xl">
                {loading && <Loader/>}
                {blogDetails.length>0 && 
                    blogDetails.map((blog,idx)=>{
                        return(<Link href={`/dashboard/blog/${blog._id}`} key={idx} className="w-full bg-white hover:bg-gray-50 flex items-start gap-4 cursor-pointer p-4 rounded-xl">
                            <div className="h-36 aspect-[16/9] relative rounded-xl">
                                <Image
                                    src={blog.heroImg.url}
                                    fill
                                    className="object-cover hover:scale-105"
                                />
                            </div>
                            <div className=" w-full p-4 flex flex-col gap-4">
                                <span className="text-lg font-bold w-full">{blog.title}</span>
                                <div className="text-lg font-bold w-full">{
                                    blog?.sections?.map((value,idx)=>{
                                        return <div key={idx}>{value.type === 'Paragraph' && 
                                            <span  className="text-sm font-medium line-clamp-3 w-full text-clip">{value.paragraph}</span>
                                        }</div>
                                    })
                                    }</div>
                                
                            </div>
                        </Link>)
                        })
                    
                }
            </div>
        </div>
    )
}

export default Blogpage