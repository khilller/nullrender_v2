// this route is to get the user profile

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { auth, currentUser } from "@clerk/nextjs/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    const { db } = await connectToDatabase();

    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.error()
        }
        // get the backend api user object
        const user = await currentUser();

        let profile;

        const data = await db.collection("profiles").find({ userId: userId }).toArray();

        if (data.length === 0) {
            await db.collection("profiles").insertOne({
                userId: userId,
                username: user?.username,
                email: user?.emailAddresses[0].emailAddress,
                name: user?.firstName + " " + user?.lastName,
                avatar: user?.imageUrl,
                credits: 0,
                freeCredit: 0
            })
        } else {
            profile = await db.collection("profiles").findOne({ userId: userId });
        }



        return NextResponse.json({ success: true, profile: profile }, { status: 200 })

    } catch (error) {
        return NextResponse.json({success: false, error: error})
    }
}