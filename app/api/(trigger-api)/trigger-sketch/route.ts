import { client } from "@/trigger";
import { auth } from "@clerk/nextjs";
import { createAppRoute } from "@trigger.dev/nextjs";

import "@/jobs"; // Ensure this imports your job definitions correctly


export  async function POST(req:any) {
    try {
        const { userId } = auth()
        const body = await req.json()

        let { prompt, amount, secure_url } = body;
        

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


        const eventId = events[0].id;
        console.log(eventId);

        return new Response(JSON.stringify({ eventId }), { status: 201 });
    } catch (error){
        return new Response("Internal Error", { status: 500 });
    }

}

export const maxDuration = 10;