import { eventTrigger } from "@trigger.dev/sdk";
import { client } from "@/trigger";
import { Replicate } from '@trigger.dev/replicate'

import { z } from 'zod'

const replicate = new Replicate({
  id: 'replicate',
  apiKey: process.env.REPLICATE_API_TOKEN as string,
})


// define the job

client.defineJob({
  id: 'canny-style',
  name: "canny",
  version: "1.0.0",
  integrations: {replicate},
  trigger: eventTrigger({
    name: "canny", //this is connected to the name in the trigger-depthmap/route.ts
    schema: z.object({
      prompt: z.string(),
      amount: z.string(),
      secure_url: z.string(),
      version: z.string().default("aff48af9c68d162388d230a2ab003f68d2638d88307bdaf1c2f1ac95079c9613")
    })
  }),

  run: async (payload, io, ctx) => {
    const { prompt, amount, secure_url,version } = payload;

    const prediction = await io.replicate.predictions.createAndAwait("await-prediction",{
      version: version,
      input: {
        eta: 0,
        image: secure_url,
        scale: 9,
        prompt: prompt,
        a_prompt: "best quality, extremely detailed",
        n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
        ddim_steps: 25,
        num_samples: amount,
        low_threshold: 100,
        high_threshold: 200,
        image_resolution: "512"
      }
    })

    return prediction.output;
  },

})