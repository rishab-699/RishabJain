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
    const [error, setError]=useState({errState:false, msg:''});
        const [firstParagraph,setFirstParagraph] = useState({});

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
            //console.log(data);
            setFirstParagraph(data[0]?.sections?.find(s => s.type === 'Paragraph'));
            setLoading(false);
            //console.log('loading: '+loading);
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
                <p className="text-4xl font-bold">Blog Page</p>
            </div>
            <div className="flex items-start h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide gap-4 flex-wrap">
                {loading && <Loader/>}
                {blogDetails.length>0 && 
                    blogDetails.map((blog,idx)=>{
                        return(<Link href={`/blog/${blog._id}`} key={idx} className="w-fit bg-white max-h-[95%] h-[95%] hover:bg-gray-50 flex flex-col items-center gap-4 cursor-pointer p-4 rounded-xl">
                            
                            <p className="text-2xl max-w-[32rem] mt-2 mb-2 font-bold">{blog.title}</p>
                            <div className="h-64 aspect-[16/9] relative border-0 rounded-xl">
                                <Image
                                    src={blog.heroImg.url}
                                    fill
                                    className="object-cover border-0 rounded-xl hover:scale-102"
                                />
                            </div>
                            <div className="text-lg font-bold w-fit max-w-[32rem]">{
                                firstParagraph && (
                                        <p className="whitespace-pre-line break-words break-all text-gray-700 leading-relaxed text-sm font-medium line-clamp-3 w-full text-clip">
                                            {firstParagraph.paragraph}
                                        </p>
                                    )
                                }</div>
                                
                            
                        </Link>)
                        })
                    
                }
            </div>
        </div>
    )
}

export default Blogpage