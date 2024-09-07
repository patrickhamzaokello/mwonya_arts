"use server"
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"

export async function getSignedURL() {
    const { data: session } = useSession()
    if(!session) {
        return {failure: {message: "Unauthorized"}}
    }

 return {success: {url: ""}}
}