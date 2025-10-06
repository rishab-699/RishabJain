"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

const BlogCard = ({ blogID })=>{
    const [blog,setBlog] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState({errState: false, msg:''});
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const res= await fetch(`/api/blog/${blogID}`,{ method:'GET'})
                console.log(res)
                if(!res.ok){
                    setError({
                    errState:true,
                    msg:'Server side Error!'+res.status
                })
                setLoading(false)
                return;
                }

                const data = await res.json();
                setBlog(data);
                console.log(data);

            } catch (error) {
                setError({
                    errState:true,
                    msg:'Something went wrong!'
                })
            }   
        }
        fetchData()
    },[])
    
    return(
        <div className="w-full p-4 h-[100vh] overflow-y-auto scrollbar-hide">
            Blog Card
            <div className="text-lg">
                {loading && <span>LOADING...</span>}
                {error.errState && <span className="text-red-700">{error.errState+':'+error.msg}</span>}
                {blog && 
                    <div className="p-4 flex flex-col items-center justify-start gap-4 w-full rounded-xl bg-white">
                        {/*Span title */}
                        <span className="text-2xl font-bold lg:text-4xl">{blog.title}</span>
                        {/*Hero Image */}
                        <div className="relative w-[70%] aspect-[16/9]">
                            <Image
                                src={blog.heroImg.url}
                                alt={blog.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/*Sections */}
                        <div>
                            {blog.sections.map((value,idx)=>{
                                return(
                                    <div key={idx} className="w-full mt-4 flex flex-col items-center gap-2">
                                        {value.type === 'Paragraph' &&
                                            <>
                                                {value.title && <span className="text-lg w-full text-left font-bold">{value.title}</span>}
                                                <p  className="whitespace-pre-line break-words break-all text-gray-700 leading-relaxed text-lg">
                                                    {value.paragraph}
                                                </p>
                                            </>
                                        }
                                        {value.type === 'image/Paragraph'&&
                                            <>  
                                                <div className="relative w-[70%] aspect-[16/9]">
                                                    <Image
                                                        src={value.img.url}
                                                        alt={blog.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                {value.title && <span className="text-lg w-full text-left font-bold">{value.title}</span>}
                                                <p  className="whitespace-pre-line break-words break-all text-gray-700 leading-relaxed text-lg">
                                                    {value.paragraph}
                                                </p>
                                            </>
                                        }
                                        {value.type === 'image+Paragraph'&&
                                            <div className="flex gap-4">  
                                                <div className="relative h-44 aspect-[3/4]">
                                                    <Image
                                                        src={blog.value.url}
                                                        alt={blog.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                {value.title && <span className="text-lg w-full text-left font-bold">{value.title}</span>}
                                                <p  className="whitespace-pre-line break-words break-all text-gray-700 leading-relaxed text-lg">
                                                    {value.paragraph}
                                                </p>
                                            </div>
                                        }
                                        {value.type === 'Paragraph+image'&&
                                            <div className="flex gap-4">  
                                                <div>
                                                    {value.title && <span className="text-lg w-full text-left font-bold">{value.title}</span>}
                                                    <p  className="whitespace-pre-line break-words break-all text-gray-700 leading-relaxed text-lg">
                                                        {value.paragraph}
                                                    </p>
                                                </div>
                                                <div className="relative h-44 aspect-[3/4]">
                                                    <Image
                                                        src={value.img.url}
                                                        alt={blog.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )

                            })}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default BlogCard;