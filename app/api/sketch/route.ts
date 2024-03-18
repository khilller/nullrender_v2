import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(req: Request) {
    try{
        const { userId } = auth()
        const body = await req.json()
        let { prompt, amount, steps, secure_url } = body;

        steps = Number(steps);


        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!prompt || !amount || !steps || !secure_url){
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const freeTrial = await checkApiLimit();

        if(!freeTrial){
            return new NextResponse("Free trial has expired", { status: 403 });
        }


        const response = await replicate.run(
            "jagilley/controlnet-scribble:435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
            {
              input: {
                eta: 0,
                image: secure_url,
                scale: 9,
                prompt: prompt,
                a_prompt: "best quality, extremely detailed, architectural renders",
                n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
                ddim_steps: steps,
                num_samples: amount,
                image_resolution: "512",

              }
            }
          );
          await incrementApiLimit();

          return NextResponse.json(response);

    } catch (error) {
        console.error("[Image Render Error]",error)
        return new NextResponse("Internal Error", { status: 500 });
    }

}