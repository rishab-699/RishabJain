"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"



const DesignsPage = ()=>{
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({errState:false, msg:''});
    const [singleImg, setSingleImg]=useState(null);
    const [category, setCategory] = useState("All");
    const [initialized, setInitialized]=useState(false)

    useEffect(()=>{
        const getDesigns = async()=>{
            setLoading(true);
            try {
                const res = await fetch("/api/designs",{method:"GET"});
                if(res.ok){
                    const data = await res.json();
                    //console.log(data.data)
                    setDesigns(data);
                    
                }else{
                    const error = await res.json();
                    setError({errState:true, msg:"Server error"})
                    //console.log(error);
                    setLoading(false);
                    return;
                }
            setLoading(false);
            } catch (error) {
                setError({errState:true, msg:"error fetching data"})
                setLoading(false);
                //console.log(error)
            }
            
        }
        getDesigns()
    },[]);
    const getFileType = (name = "") => {
    const ext = name.split(".").pop().toLowerCase();
    if (["png", "jpg", "jpeg", "webp"].includes(ext)) return "image";
    if (["mp4", "webm", "mov"].includes(ext)) return "video";
    return "unknown";
  };
    return(
        <motion.div
      className="h-full overflow-auto"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
        <div className="px-4 relative h-full sm:px-8 md:px-12 lg:px-20 xl:px-48">
            {/*filter category */}
            <div className="w-full p-4 sticky top-0 z-20 rounded-lg flex items-center justify-between bg-gradient-to-r from-red-200 to-blue-200 ">
                <div className="text-left text-xl font-bold">
                    UI/UX Designs
                </div>
                <select name="category" defaultValue={category} onChange={(e)=> setCategory(e.target.value)} className="p-2 outline-none rounded-xl text-center font-bold bg-blue-50" id="category">
                    <option value={"All"}>All</option>
                    {designs.length>0 && designs.map((value,index)=>{
                        return <option key={index} value={value.category}>{value.category}</option>
                    })}
                </select>
            </div>
            {/*gallery */}
            <div className="w-full rounded-lg flex items-center flex-wrap gap-2 md:gap-4 p-4 overflow-auto">
                    {loading?
                        <motion.div
                        initial={{opacity:"100%"}}
                        animate={{opacity:"10%"}}
                        transition={{duration:1, ease:"easeInOut", repeat:Infinity}}
                        className="w-15 md:w-30 md:max-w-32 h-30 md:h-60 md:max-h-64 aspect-[1/1}] bg-gray-700" />
                    
                    :
                    designs.length > 0 ? (
                              designs.map((item, index) => {
                                 
                                const type = getFileType(item?.name);
                                // ✅ Prefer numeric aspect ratio if width/height exist
                                const aspectRatio =
                                  item?.width && item?.height
                                    ? item.width / item.height
                                    : 1; // fallback to square
                    
                                return (
                                  (category === 'All' || item.category === category) && <div
                                    key={index}
                                    className="relative rounded-lg w-fit h-fit max-h-64 overflow-hidden shadow-md bg-gray-100 cursor-pointer"
                                    style={{
                                      width: "fit-content", // fixed column width
                                      aspectRatio, // ✅ Dynamic ratio applied here
                                      height: "264px",
                                    }}
                                    onClick={()=> setSingleImg({...item, aspectRatio,type})}
                                  >
                        
                                    {type === "image" && (
                                      <Image
                                        src={item.thumbnailUrl}
                                        alt={item.title || "design"}
                                        fill
                                        className="object-cover cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                                      />
                                    )}
                    
                                    {type === "video" && (
                                      <video
                                        src={item.url || item.imagesrc}
                                        className="object-cover w-full h-full"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                      />
                                    )}
                    
                                    {type === "unknown" && (
                                      <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600">
                                        Unsupported File
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                            ) : (
                              <p className="text-gray-500">No designs uploaded yet.</p>
                            )}
                </div>
                            {singleImg !== null &&
                                        <div className="absolute top-0 bottom-0 left-0 right-0 z-40 bg-black bg-opacity-90
                                        flex items-center justify-center
                                        ">
                                            <div className="bg-white w-fit max-w-[80%] rounded-xl relative flex flex-wrap items-center justify-center p-4 md:p-4">
                                                <button type="button" className="absolute top-4 right-4 h-4 w-4" onClick={()=>{setSingleImg(null)}}><img src="/close.svg" className=" object-contain h-5 w-5"/></button>
                                                <div
                                                    className=" relative max-w-1/2 rounded-lg overflow-hidden flex items-center justify-center shadow-md bg-gray-100"
                                                    style={{
                                                    height: "264px", // fixed column width
                                                    aspectRatio: singleImg.aspectRatio, // ✅ Dynamic ratio applied here
                                                    }}
                                                >
                                    {singleImg.type === "image" && (
                                      <Image
                                        src={singleImg.url}
                                        alt={singleImg.title || "design"}
                                        fill
                                        className="object-cover cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                                      />
                                    )}
                    
                                    {singleImg.type === "video" && (
                                      (loading && !initialized)? <motion.h1 
                                      initial={{opacity:"0%"}}
                                      animate={{opacity:"100%"}}
                                      transition={{duration:2, repeat:Infinity, ease:"easeIn"}}
                                      className="text-xl"
                                      >Loading...</motion.h1>:
                                      <video
                                        src={singleImg.url}
                                        className="object-cover w-full h-full"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        onCanPlay={() => {
                                        setLoading(false);
                                        setInitialized(true);
                                      }}
                                      // if you want to catch network stalls, uncomment ↓
                                      // onWaiting={() => !initialized && setLoading(true)}
                                      />
                                    )}
                    
                                    {singleImg.type === "unknown" && (
                                      <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600">
                                        Unsupported File
                                      </div>
                                    )}                                                </div>
                                                <div className="w-1/2 flex flex-col gap-4 p-4">
                                                    
                                                    <span className="text-4xl font-bold">{singleImg.title}</span>
                                                    <span className="text-xl">{singleImg.category}</span>
                                                    <span className="text-xl">{singleImg.overview}</span>
                                                </div>
                                            </div>
                                        </div>
                                    }
            
        </div>
    </motion.div>
    )
}

export default DesignsPage;