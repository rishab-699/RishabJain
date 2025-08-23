"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NavLinks= ({link})=>{
    const pathname = usePathname();
    return(
        <Link className={`rounded p-1 ${pathname === link.url&& 'bg-black text-white'}`} href={link.url}>{link.title}</Link>
    )
}

export default NavLinks