import { NextResponse } from "next/server";
//import Design from "@/models/Design";
//import connectDb from "@/lib/Mongodbconnect";
import connectDb from "../../../lib/Mongodbconnect";
import Design from "../../../models/Design";

export async function POST(req) {
    try {
        await connectDb();
        const body = await req.json();
        
        const newDesign = await Design.create(body);
        return NextResponse.json(newDesign, { status: 201 });
    } catch (error) {
        console.error("Error saving design:", error);
        return NextResponse.json({ error: "Failed to save design" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDb(); // Fixed: was connectDB() (capital letters)
        const design = await Design.find().sort({ createdAt: -1 });
        //console.log(design);
        return NextResponse.json(design, { status: 200 });
    } catch (error) {
        //console.error("Error fetching Design:", error);
        return NextResponse.json({ error: "server Failed to fetch Design" }, { status: 500 });
    }
}