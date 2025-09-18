"use client"
import { useRef, useState } from "react";
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from '@imagekit/next'

const Addprojects = ({setprojectform})=>{
    const [loading, setloading]=useState(false);
    const [error, setError]=useState({formstatus:false, msg:''});
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef();
    const [fileData, setFileData]=useState();

    const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };
    const [progress, setProgress] = useState(0);
    const abortController = new AbortController();
    const authenticator = async () => {
        try {
            // Perform the request to the upload authentication endpoint.
            const response = await fetch("../../api/imagekit-auth");
            if (!response.ok) {
                // If the server response is not successful, extract the error text for debugging.
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            // Parse and destructure the response JSON for upload credentials.
            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            // Log the original error for debugging before rethrowing a new error.
            console.error("Authentication error:", error);
            setError({status:true, msg:"Authentication request failed"})
            throw new Error("Authentication request failed");
        }
    };
    const handleUpload = async (category,aspectRatio) => {
        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            alert("Please select a file to upload");
            return;
        }
        const file = fileInput.files[0];

        // Retrieve authentication parameters for the upload.
        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey } = authParams;
        try {
            const uploadResponse = await upload({
                // Authentication parameters
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name, // Optionally set a custom file name
                // Progress callback to update upload progress state
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                // Abort signal to allow cancellation of the upload if needed.
                abortSignal: abortController.signal,
            });
            //console.log("Upload response:", uploadResponse);
            return uploadResponse;
        } catch (error) {
            // Handle specific error types provided by the ImageKit SDK.
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
                setError({status:true, msg:'Upload aborted'});
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
                setError({status:true, msg:'Invalid request'})
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
                setError({status:true, msg:'Network error'})
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
                setError({status:true, msg:'Server error'})
            } else {
                // Handle any other errors that may occur.
                console.error("Upload error:", error);
                setError({status:true, msg:'Upload error'})
            }
        }
    };

  
    const HandleSubmit= async(e)=>{
        e.preventDefault();
        setloading(true);
        {/*form data */}
        const file = e.target.projectfile.files[0];
        const category = "projects";
        const title = e.target.title.value;
        const link = e.target.link.value;
        const description = e.target.description.value;
        const aspectRatio = e.target.aspect_ratio.value;

        if(!file){
            setError({formstatus:true, msg:'upload media file'});
            setloading(false);
            return;
        }
        {/*get authentication params from API */}
        const uploadData = await handleUpload(category,aspectRatio);
        //console.log(uploadData)
        if(uploadData === null) {
            //console.log('nodata in the fileData');
            setloading(false);
            return;
        }else{
            //console.log(uploadData);
            const projectData = {
                title: title,
                category: category,
                description: description,
                link:link,
                aspectRatio: aspectRatio,
                fileId: uploadData.fileId,
                url: uploadData.url,
                thumbnailUrl: uploadData.thumbnailUrl,
                name: uploadData.name,
                width: uploadData.width,
                height: uploadData.height,
                size: uploadData.size,
            }
            //console.log(projectData);
            await fetch("/api/projects",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectData),
            });
            alert("Project added successfully");
        }
        setloading(false)
        setprojectform(false);

    }
    return(
        <div className=" absolute top-0 bottom-0 left-0 right-0 h-screen w-screen z-50 bg-black opacity-90 flex items-center justify-center">
            <form onSubmit={(e)=>HandleSubmit(e)} className="bg-white relative p-4 rounded-xl flex flex-col gap-4">
                <button type="button" className="" onClick={()=>{setprojectform(false)}}><img src="/close.svg" className="absolute top-4 right-4 object-contain h-5 w-5"/></button>
                {error.status && <span className="text-red-800 font-bold w-full text-center text-lg">{error.msg}</span>}
                {loading && <div className="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-90">
                        <progress className=" bg-black" value={progress} max={100}></progress>
                    </div>}
                
                <div>
                    <input type="file" name="projectfile" id="projectfile" ref={fileInputRef} onChange={handleFileChange} hidden disabled={loading}/>
                    <label htmlFor="projectfile"><img src={preview || "/uploadImg.svg"} className="object-contain h-60 w-full" id="projectfile" alt="" /></label>
                </div>
                <select type="text" name="aspect_ratio" id='aspect_ratio' disabled={loading} className="outline-none border-b-2 border-black text-lg">
                    <option value="1:1">1:1</option>
                    <option value="3:4">3:4</option>
                    <option value="4:3">4:3</option>
                    <option value="9:16">9:16</option>
                    <option value="16:9">16:9</option>
                </select>
                <input type="text" name="title" id='title' disabled={loading} className="outline-none border-b-2 border-black text-lg" placeholder="project title" />
                <input type="text" name="link" id='link' disabled={loading} className="outline-none border-b-2 border-black text-lg" placeholder="project link/docment link" />
                <textarea type="text" name="description" id='description' disabled={loading} className="outline-none border-b-2 border-black text-lg h-28" placeholder="project description"></textarea>
                
                <button type="submit" disabled={loading} className="w-full py-2 text-xl text-white bg-blue-900 font-bold hover:bg-blue-950 text-center">upload</button>
            </form>
        </div>
    )
}

export default Addprojects;