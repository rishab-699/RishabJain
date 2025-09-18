"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Adddesigns from "../components/adddesigns";

const DesignPage = () => {
  const [designform, setDesignform] = useState(false);
  const [designs, setDesigns] = useState([]);
  const [singleImg, setSingleImg] = useState(null);

  useEffect(() => {
    const getDesigns = async () => {
      try {
        const res = await fetch("/api/designs", { method: "GET" });

        if (res.ok) {
          const data = await res.json();
          setDesigns(data);
          //console.log("Fetched designs:", data);
        } else {
          const error = await res.json();
          //console.error("Server error:", error);
        }
      } catch (error) {
        //console.error("Fetch error:", error);
      }
    };

    getDesigns();
  }, []);

  // ✅ Helper: check file type safely
  const getFileType = (name = "") => {
    const ext = name.split(".").pop().toLowerCase();
    if (["png", "jpg", "jpeg", "webp"].includes(ext)) return "image";
    if (["mp4", "webm", "mov"].includes(ext)) return "video";
    return "unknown";
  };

  return (
    <div className="p-4">
      {designform && <Adddesigns setDesignform={setDesignform} />}

      <h1 className="text-2xl font-bold mb-4">Design Page</h1>

      <button
        type="button"
        className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 hover:font-bold"
        onClick={() => setDesignform((prev) => !prev)}
      >
        Add Designs
      </button>

      <div className="mt-6 w-full flex flex-wrap gap-4">
        {designs.length > 0 ? (
          designs.map((item, index) => {
            const type = getFileType(item?.name);

            // ✅ Prefer numeric aspect ratio if width/height exist
            const aspectRatio =
              item?.width && item?.height
                ? item.width / item.height
                : 1; // fallback to square

            return (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden h-fit shadow-md bg-gray-100 cursor-pointer"
                style={{
                  width: "160px", // fixed column width
                  aspectRatio, // ✅ Dynamic ratio applied here
                }}
                onClick={()=> setSingleImg({...item, aspectRatio})}
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
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-90
            flex items-center justify-center
            ">
                <div className="bg-white w-fit max-w-[80%] rounded-xl relative flex flex-wrap items-center justify-center p-4 md:p-8">
                    <button type="button" className="" onClick={()=>{setSingleImg(null)}}><img src="/close.svg" className="absolute top-4 right-4 object-contain h-5 w-5"/></button>
                    <div
                        className=" relative max-w-1/2 rounded-lg overflow-hidden shadow-md bg-gray-100"
                        style={{
                        width: "360px", // fixed column width
                        aspectRatio: singleImg.aspectRatio, // ✅ Dynamic ratio applied here
                        }}
                    >
                        <Image src={singleImg.url} fill alt={singleImg.title || "design"} className="object-contain w-full h-full"/>
                    </div>
                    <div className="w-1/2 flex flex-col gap-4 p-4">
                        
                        <span className="text-4xl font-bold">{singleImg.title}</span>
                        <span className="text-xl">{singleImg.category}</span>
                        <span className="text-xl">{singleImg.overview}</span>
                    </div>
                </div>
            </div>
        }
    </div>
  );
};

export default DesignPage;
