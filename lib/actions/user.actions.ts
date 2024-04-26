"use server"

import { connectToDatabase } from "../mongodb"

// get profile information
export async function findProfile(userId: string) {
    try {
        await connectToDatabase()
        const { db } = await connectToDatabase()


        const user =  await db.collection("profiles").findOne({ userId: userId })

        if (!user) throw new Error('User not found')

        return JSON.stringify(user)

    } catch (error) {
        console.log(error)
        return null
    }
}
