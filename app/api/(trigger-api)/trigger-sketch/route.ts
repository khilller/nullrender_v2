import { client } from "@/trigger";
import { auth } from "@clerk/nextjs";

import "@/jobs"; // Ensure this imports your job definitions correctly
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";


export  async function POST(req:any) {
    try {
        const { userId } = auth()
        const body = await req.json()
        console.log(body);

        let { prompt, amount, secure_url } = body;

        if(!userId){
            console.log("userId is not defined");
            return new Response("Unauthorized", { status: 401 });
        }

        if(!prompt || !amount || !secure_url){
            return new Response("Missing required fields", { status: 400 });
        }

        const freeTrial = await checkApiLimit();


        if(!freeTrial){
            return new Response(JSON.stringify("Free trial has expired"), { status: 403 });
        }
        

        const events = await client.sendEvents([
            {
                name: "sketch",
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