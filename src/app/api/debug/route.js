import { NextResponse } from "next/server";
import path from 'path';
import fs from 'fs';

export async function GET() {
    try {
        const currentDir = process.cwd();
        
        // Check the paths where you just created the files
        const newLibPath = path.join(currentDir,'src', 'app', 'lib', 'mongoconnect.js');
        const newModelsPath = path.join(currentDir,'src', 'app', 'models', 'designs.js');
        
        // Check if the new files exist
        const newLibExists = fs.existsSync(newLibPath);
        const newModelsExists = fs.existsSync(newModelsPath);
        
        // List contents of app directory to see what's there
        let appContents = [];
        let libContents = [];
        let modelsContents = [];
        
        try {
            const appDir = path.join(currentDir, 'app');
            if (fs.existsSync(appDir)) {
                appContents = fs.readdirSync(appDir);
                
                const libDir = path.join(appDir, 'lib');
                if (fs.existsSync(libDir)) {
                    libContents = fs.readdirSync(libDir);
                }
                
                const modelsDir = path.join(appDir, 'models');
                if (fs.existsSync(modelsDir)) {
                    modelsContents = fs.readdirSync(modelsDir);
                }
            }
        } catch (error) {
            console.log("Error reading directories:", error);
        }
        
        return NextResponse.json({
            currentDir,
            newLibPath,
            newModelsPath,
            newLibExists,
            newModelsExists,
            appContents,
            libContents,
            modelsContents,
            message: "Updated debug info - checking newly created files"
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}