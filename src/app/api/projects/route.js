import { NextResponse } from "next/server";
//import project from "@/models/project";
//import connectDb from "@/lib/Mongodbconnect";
import connectDb from "../../../lib/Mongodbconnect";
import Project from "../../../models/project";

export async function POST(req) {
    try {
        await connectDb();
        const body = await req.json();
        
        const newproject = await Project.create(body);
        return NextResponse.json(newproject, { status: 201 });
    } catch (error) {
        //console.error("Error saving project:", error);
        return NextResponse.json({ error: "Failed to save project" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDb(); // Fixed: was connectDB() (capital letters)
        const project = await Project.find().sort({ createdAt: -1 });
        //console.log(project);
        return NextResponse.json(project, { status: 200 });
    } catch (error) {
        //console.error("Error fetching project:", error);
        return NextResponse.json({ error: "server Failed to fetch project" }, { status: 500 });
    }
}