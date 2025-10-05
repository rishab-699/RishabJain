"use client";

import { useRef, useState } from "react";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";

// --- Authenticator ---
const authenticator = async () => {
  try {
    const res = await fetch("/api/imagekit-auth"); // fixed path
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (err) {
    console.error("Auth error:", err);
    throw new Error("ImageKit authentication failed");
  }
};

// --- Upload function with feedback ---
const handleUpload = async (file, setStatus) => {
  if (!file) return null;

  setStatus("uploading");
  try {
    const { signature, expire, token, publicKey } = await authenticator();
    const response = await upload({
      expire,
      token,
      signature,
      publicKey,
      file,
      fileName: file.name,
    });
    setStatus("success");
    return response;
  } catch (error) {
    setStatus("error");

    if (error instanceof ImageKitAbortError) console.error("Upload aborted:", error.reason);
    else if (error instanceof ImageKitInvalidRequestError) console.error("Invalid request:", error.message);
    else if (error instanceof ImageKitUploadNetworkError) console.error("Network error:", error.message);
    else if (error instanceof ImageKitServerError) console.error("Server error:", error.message);
    else console.error("Upload error:", error);

    return null;
  }
};

const AddBlogPage = () => {
  const [newBlog, setNewBlog] = useState([]);
  const [blogSections, setBlogSections] = useState("Paragraph");

  const [paragraph, setParagraph] = useState("");
  const [paragraphTitle, setParagraphTitle] = useState("");
  const [sectionImg, setSectionImg] = useState(null);

  const [title, setTitle] = useState("");
  const [heroImg, setHeroImg] = useState(null);

  // Status states
  const [heroStatus, setHeroStatus] = useState("idle");
  const [sectionStatus, setSectionStatus] = useState("idle");
  const [formStatus, setFormStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const heroInputRef = useRef();
  const sectionInputRef = useRef();

  // Add section
  const HandleSectionInput = async () => {
    if (!paragraph && !sectionImg) {
      setMessage("Section must have at least text or image.");
      return;
    }

    let uploadedInfo = null;
    if (sectionImg) {
      uploadedInfo = await handleUpload(sectionImg, setSectionStatus);
      if (!uploadedInfo) return;
    }

    const section = {
      type: blogSections,
      title: paragraphTitle,
      paragraph,
      img: uploadedInfo
        ? {
            url: uploadedInfo.url,
            width: uploadedInfo.width,
            height: uploadedInfo.height,
            size: uploadedInfo.size,
          }
        : null,
    };

    setNewBlog((prev) => [...prev, section]);

    // Reset section states
    setParagraph("");
    setParagraphTitle("");
    setSectionImg(null);
    if (sectionInputRef.current) sectionInputRef.current.value = "";

    setMessage("✅ Section added successfully");
  };

  const HandleInputOptions = (e) => {
    setBlogSections(e.target.value);
    setParagraph("");
    setParagraphTitle("");
    setSectionImg(null);
    if (sectionInputRef.current) sectionInputRef.current.value = "";
  };

  const handleHeroImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return setMessage("⚠️ No file selected");

    const uploadedUrl = await handleUpload(file, setHeroStatus);
    if (uploadedUrl) {
      setHeroImg(uploadedUrl);
      setMessage("✅ Hero image uploaded successfully");
    }
  };

  const handleSectionImage = (e) => {
    const file = e.target.files[0];
    if (file) setSectionImg(file);
  };

  // Submit blog to API
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !heroImg) {
      setMessage("⚠️ Title and hero image are required!");
      return;
    }

    const payload = {
      title,
      heroImg: {
        url: heroImg.url,
        width: heroImg.width,
        height: heroImg.height,
        size: heroImg.size,
      },
      sections: newBlog,
    };

    setFormStatus("submitting");
    setMessage("⏳ Submitting blog...");

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setFormStatus("success");
        setMessage("✅ Blog created successfully!");
        setNewBlog([]);
      } else {
        const error = await res.json();
        setFormStatus("error");
        setMessage("❌ Failed to create blog: " + error.error);
      }
    } catch (err) {
      console.error(err);
      setFormStatus("error");
      setMessage("❌ Unexpected error occurred!");
    }
  };

  return (
    <div className="w-[calc(100vw-30%)] p-4 rounded-xl">
      <div className="w-full p-4 bg-white rounded-xl">
        <span className="text-lg font-bold">Add Blog</span>
        <form onSubmit={HandleSubmit}>
          {/* Hero Image + Title */}
          <div className="flex flex-col gap-4">
            <label className="cursor-pointer">
              <div className="w-full max-h-44 aspect-[16/9] bg-gray-200 flex items-center justify-center">
                {heroStatus === "uploading" && <span className="text-blue-600">⏳ Uploading...</span>}
                {heroStatus === "success" && <span className="text-green-600">✅ Hero Uploaded</span>}
                {heroStatus === "error" && <span className="text-red-600">❌ Upload failed</span>}
                {heroStatus === "idle" && !heroImg && <span className="text-4xl">16 x 9</span>}
              </div>
              <input
                type="file"
                name="heroImg"
                ref={heroInputRef}
                onChange={handleHeroImage}
                hidden
              />
            </label>

            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              className="text-lg outline-none border-b-2 border-gray-200 w-full px-2 py-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Section Rendering */}
          <div className="p-4 w-full">
            {["Paragraph", "Paragraph+image", "image+Paragraph", "image/Paragraph"].includes(blogSections) && (
              <div className="flex flex-col gap-4">
                {(blogSections !== "Paragraph") && (
                  <label className="cursor-pointer w-full">
                    <div className={`h-64 ${blogSections === "image/Paragraph" ? "aspect-[16/9]" : "aspect-[3/4]"} bg-gray-200 flex items-center justify-center`}>
                      {sectionStatus === "uploading" && <span className="text-blue-600">⏳ Uploading...</span>}
                      {sectionStatus === "success" && <span className="text-green-600">✅ Image Uploaded</span>}
                      {sectionStatus === "error" && <span className="text-red-600">❌ Upload Failed</span>}
                      {sectionStatus === "idle" && !sectionImg && <span className="text-4xl">{blogSections === "image/Paragraph" ? "16 x 9" : "3 x 4"}</span>}
                    </div>
                    <input type="file" ref={sectionInputRef} onChange={handleSectionImage} hidden />
                  </label>
                )}

                <input
                  type="text"
                  name="ParagraphTitle"
                  placeholder="Paragraph Title"
                  className="text-lg w-full outline-none border-b-2 border-gray-200 px-2 py-1"
                  value={paragraphTitle}
                  onChange={(e) => setParagraphTitle(e.target.value)}
                />

                <textarea
                  placeholder="Write your paragraph..."
                  className="text-lg w-full h-64 outline-none border-b-2 border-gray-200 px-2 py-1"
                  value={paragraph}
                  onChange={(e) => setParagraph(e.target.value)}
                />

                <button type="button" onClick={HandleSectionInput} className="mt-2 px-4 py-2 text-lg text-white hover:font-bold bg-blue-900 rounded">
                  Add Section
                </button>
              </div>
            )}
          </div>

          {/* Section type selector */}
          <div className="p-4">
            <select value={blogSections} className="cursor-pointer px-2 py-1 border rounded" onChange={HandleInputOptions}>
              <option value="Paragraph">Paragraph</option>
              <option value="Paragraph+image">Paragraph+image</option>
              <option value="image+Paragraph">image+Paragraph</option>
              <option value="image/Paragraph">image/Paragraph</option>
            </select>
          </div>

          {/* Submit Blog */}
          <div className="p-4">
            <button type="submit" disabled={formStatus === "submitting"} className="px-6 py-3 text-white bg-green-700 hover:bg-green-800 font-semibold rounded">
              {formStatus === "submitting" ? "⏳ Saving..." : "Save Blog"}
            </button>
          </div>
        </form>

        {/* Status Feedback */}
        {message && (
          <div className="mt-4 p-2 bg-gray-100 rounded text-sm">
            {message}
          </div>
        )}

        {/* Preview */}
        <div className="mt-4">
          <h2 className="font-bold">Sections Preview:</h2>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(newBlog, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default AddBlogPage;
