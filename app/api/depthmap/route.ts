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

        /*
        const response = await replicate.run(
            "jagilley/controlnet-depth2img:922c7bb67b87ec32cbc2fd11b1d5f94f0ba4f5519c4dbd02856376444127cc60",
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
              }
            }
          );
          */

          /*
          const response = await fetch ("https://api.replicate.com/v1/predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
            },
            body: JSON.stringify({
                "version": "922c7bb67b87ec32cbc2fd11b1d5f94f0ba4f5519c4dbd02856376444127cc60",
                "input": {
                    "eta": 0,
                    "image": secure_url,
                    "scale": 9,
                    "prompt": prompt,
                    "a_prompt": "best quality, extremely detailed",
                    "n_prompt": "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
                    "ddim_steps": steps,
                    "num_samples": amount,
                    "image_resolution": "512",
                    "detect_resolution": 512
                }
            })
          })
          */
          const prediction = await replicate.predictions.create({
            version: "922c7bb67b87ec32cbc2fd11b1d5f94f0ba4f5519c4dbd02856376444127cc60",
            input: {
                eta: 0,
                image: secure_url,
                scale: 9,
                prompt: prompt,
                a_prompt: "best quality, extremely detailed",
                n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
                ddim_steps: steps,
                num_samples: amount,
                image_resolution: "512",
                detect_resolution: 512
            }
          })

          await incrementApiLimit();

          if (prediction?.error) {
              return new Response(
                JSON.stringify({detail: prediction.error.detail}),{ status: 500}
              )
          }

          return new Response(JSON.stringify(prediction), { status: 201 });

          /*

          const predition = await response.json();
          return NextResponse.json(predition);

          */

        /*
          console.log(response);
          return NextResponse.json(response);
        */
    } catch (error) {
        console.error("[Image Render Error]",error)
        return new NextResponse("Internal Error", { status: 500 });
    }

}