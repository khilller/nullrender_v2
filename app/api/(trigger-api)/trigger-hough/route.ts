import { client } from "@/trigger";
import { auth } from "@clerk/nextjs";
import { createAppRoute } from "@trigger.dev/nextjs";

import "@/jobs"; // Ensure this imports your job definitions correctly
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { connectToDatabase } from "@/lib/mongodb";
import { checkFreeCredits } from "@/lib/functions";

export  async function POST(req:any) {
    const { db } = await connectToDatabase();

    try {
        const { userId } = auth()
        const body = await req.json()

        let { prompt, amount, secure_url } = body;

        if(!userId){
            console.log("userId is not defined");
            return new Response("Unauthorized", { status: 401 });
        }


        if(!prompt || !amount || !secure_url){
            return new Response("Missing required fields", { status: 400 });
        }

        // check for free credits
        //this is the latedt implementation

        /*
        
        let freeCredit;

        const data = await db.collection("profiles").findOne({ userId: userId });

        freeCredit = data?.freeCredit;

        if (!freeCredit || freeCredit <= 0) {
            return new Response(JSON.stringify("Free trial has expired"), { status: 403 });
        }
        */
        
        
        /*
        const freeTrial = await checkFreeCredits();

        console.log(freeTrial)

        if(!freeTrial){
            return new Response(JSON.stringify("Free trial has expired"), { status: 403 });
        }
        */
        

        const events = await client.sendEvents([
            {
                name: "hough",
                payload: {
                    prompt,
                    amount,
                    secure_url
                }
            }
        ])

        //await incrementApiLimit();
        /*
        if (freeCredit > 0) {
            await db.collection("profiles").updateOne({ userId: userId }, { $inc: { freeCredit: -1 } });
        }
        */

        //console.log(freeCredit);


        const eventId = events[0].id;
        //console.log(eventId);

        return new Response(JSON.stringify({ eventId }), { status: 201 });
    } catch (error){
        return new Response(JSON.stringify({ error}), { status: 500 });
    }

}

export const maxDuration = 10;

//return new Response("Internal Error", { status: 500 });