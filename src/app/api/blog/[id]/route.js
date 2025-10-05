import { NextResponse } from "next/server";
import connectDb from "../../../../lib/Mongodbconnect"; // your MongoDB connection helper
import Blog from "../../../../models/Blog";

export async function GET(req){
  try {
    connectDb();
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length-1];
    console.log('blogID:'+id);
    const blog = await Blog.findById(id);

    if(!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    return NextResponse.json(blog, { status: 200 });
    
  } catch (error) {
    console.error("POST /api/blogs error:", error);
    return new Response(JSON.stringify({ error: "Server Failed to fetch blog Details" }), { status: 500 });
  }
}