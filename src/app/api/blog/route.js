import connectDb from "../../../lib/Mongodbconnect"; // your MongoDB connection helper
import Blog from "../../../models/Blog";

export async function GET(req) {
  try {
    await connectDb(); // connect to MongoDB
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    console.error("GET /api/blogs error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch blogs" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDb();
    const body = await req.json();

    const { title, heroImg, sections } = body;

    // Simple validation
    if (!title || !heroImg) {
      return new Response(JSON.stringify({ error: "Title and heroImg are required" }), {
        status: 400,
      });
    }

    const newBlog = await Blog.create({
      title,
      heroImg,
      sections,
    });

    return new Response(JSON.stringify(newBlog), { status: 201 });
  } catch (error) {
    console.error("POST /api/blogs error:", error);
    return new Response(JSON.stringify({ error: "Failed to create blog" }), { status: 500 });
  }
}
