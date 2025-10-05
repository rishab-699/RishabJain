"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BlogCard = ({ blogID }) => {
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ errState: false, msg: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/blog/${blogID}`, { method: "GET" });
        if (!res.ok) {
          setError({ errState: true, msg: "Server Error: " + res.status });
          setLoading(false);
          return;
        }

        const data = await res.json();
        setBlog(data);
        setLoading(false);
      } catch (error) {
        setError({ errState: true, msg: "Something went wrong!" });
        setLoading(false);
      }
    };

    fetchData();
  }, [blogID]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error.errState)
    return (
      <div className="text-center mt-8 text-red-600 font-semibold">
        {error.msg}
      </div>
    );

  return (
    <div className="w-full overflow-x-hidden scrollbar-hide overflow-y-auto max-h-[calc(100vh-8rem)] p-4">
      {blog && (
        <div className="flex flex-col items-center gap-10 p-6 bg-white rounded-xl shadow-md max-w-5xl mx-auto">
          {/* ===== Blog Title ===== */}
          <h1 className="text-2xl font-bold text-center lg:text-4xl">
            {blog.title}
          </h1>

          {/* ===== Hero Image ===== */}
          {blog.heroImg && (
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
              <Image
                src={blog.heroImg.url}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* ===== Blog Sections ===== */}
          <div className="flex flex-col gap-10 w-full overflow-hidden">
            {blog.sections.map((value, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-4 w-full overflow-hidden"
              >
                {/* Paragraph Only */}
                {value.type === "Paragraph" && (
                  <>
                    {value.title && (
                      <h2 className="text-xl font-semibold">{value.title}</h2>
                    )}
                    <p className="text-lg line-clamp-3">{value.paragraph}</p>
                  </>
                )}

                {/* Image / Paragraph */}
                {value.type === "image/Paragraph" && (
                  <>
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                      <Image
                        src={value.img.url}
                        alt={value.title || "blog image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {value.title && (
                      <h2 className="text-xl font-semibold">{value.title}</h2>
                    )}
                    <p className="text-lg line-clamp-3">{value.paragraph}</p>
                  </>
                )}

                {/* Image + Paragraph */}
                {value.type === "image+Paragraph" && (
                  <div className="flex flex-col md:flex-row gap-6 w-full overflow-hidden">
                    <div className="relative md:w-1/3 w-full aspect-[3/4] rounded-xl overflow-hidden">
                      <Image
                        src={value.img.url}
                        alt={value.title || "blog image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2 md:flex-1">
                      {value.title && (
                        <h2 className="text-xl font-semibold">{value.title}</h2>
                      )}
                      <p className="text-lg line-clamp-3">{value.paragraph}</p>
                    </div>
                  </div>
                )}

                {/* Paragraph + Image */}
                {value.type === "Paragraph+image" && (
                  <div className="flex flex-col md:flex-row-reverse gap-6 w-full overflow-hidden">
                    <div className="relative md:w-1/3 w-full aspect-[3/4] rounded-xl overflow-hidden">
                      <Image
                        src={value.img.url}
                        alt={value.title || "blog image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2 md:flex-1">
                      {value.title && (
                        <h2 className="text-xl font-semibold">{value.title}</h2>
                      )}
                      <p className="text-lg line-clamp-3">{value.paragraph}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
