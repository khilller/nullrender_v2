import { client } from "@/trigger";
import { auth } from "@clerk/nextjs";

import "@/jobs"; // Ensure this imports your job definitions correctly
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkFreeCredits } from "@/lib/functions";


export  async function POST(req:any) {
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
        console.log("Checking free trial");
        const freeTrial = await checkFreeCredits();

        if(!freeTrial){
            return new Response(JSON.stringify("Free trial has expired"), { status: 403 });
        }
        

        const events = await client.sendEvents([
            {
                name: "canny",
                payload: {
                    prompt,
                    amount,
                    secure_url
                }
            }
        ])

        await incrementApiLimit();

        const eventId = events[0].id;
        //console.log(eventId);
        //console.log("After eventId");


        return new Response(JSON.stringify({ eventId }), { status: 201 });
    } catch (error){
        return new Response("Internal Error", { status: 500 });
    }

}

export const maxDuration = 10;