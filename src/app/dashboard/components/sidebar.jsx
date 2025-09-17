"use client"
import Link from "next/link"
import { usePathname } from "next/navigation";

const Sidebar = ()=>{
    const pathname = usePathname();
    const page = pathname.split('/')[2];
    console.log(page)
    return(
        <div className="h-screen p-2 flex flex-col items-start justify-start  gap-4">
            <Link href={'/dashboard/'} className={`text-xl w-full ${page === 'undefined'&&'font-bold'} rounded-lg hover:bg-black hover:text-white px-4 py-2`}>Home</Link>
            <Link href={'/dashboard/designs'} className={`text-xl w-full ${page === 'designs'&&'font-bold'} rounded-lg hover:bg-black hover:text-white px-4 py-2`}>Designs</Link>
            <Link href={'/dashboard/projects'} className={`text-xl w-full ${page === 'projects'&&'font-bold'} rounded-lg hover:bg-black hover:text-white px-4 py-2`}>Projects</Link>
            <Link href={'/dashboard/settings'} className={`text-xl w-full ${page === 'settings'&&'font-bold'} rounded-lg hover:bg-black hover:text-white px-4 py-2`}>Settings</Link>
        </div>
    )
}

export default Sidebar;