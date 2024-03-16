import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";


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

        const response = await replicate.run(
            "jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
            {
              input: {
                eta: 0,
                image: secure_url,
                scale: 9,
                prompt: prompt,
                a_prompt: "best quality, extremely detailed",
                n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
                ddim_steps: steps,
                num_samples: amount,
                value_threshold: 0.1,
                image_resolution: "512",
                detect_resolution: 512,
                distance_threshold: 0.1,
              }
            }
          );

          return NextResponse.json(response);

    } catch (error) {
        console.error("[Image Render Error]",error)
        return new NextResponse("Internal Error", { status: 500 });
    }

}