//import { NextResponse } from "next/server";
//import imagekit from "../../lib/imagekit";
import { getUploadAuthParams } from "@imagekit/next/server"
import { randomUUID } from "crypto"

export async function GET() {
    const { token, expire, signature } = getUploadAuthParams({
        privateKey: process.env.IMAGEKIT_PRIVATEKEY, // Never expose this on client side
        publicKey: process.env.IMAGEKIT_PUBLICKEY,
        expire:  Math.floor(Date.now() / 1000) + 60 * 10, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
        token: randomUUID() + "-" + Date.now()
, // Optional, a unique token for request
    })

    return Response.json({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLICKEY })
}