// this route is to get the free credit count

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

        let freeCredit;

        const data = await db.collection("profiles").findOne({ userId: userId });

        freeCredit = data?.freeCredit;

        return NextResponse.json({ success: true, freeCredit:freeCredit }, { status: 200 })

    } catch (error) {
        return NextResponse.json({success: false, error: error})
    }
}