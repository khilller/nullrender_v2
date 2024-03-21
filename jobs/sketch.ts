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
  id: 'sketchImg',
  name: "sketch",
  version: "1.0.0",
  integrations: {replicate},
  trigger: eventTrigger({
    name: "depthmap", //this is connected to the name in the trigger-depthmap/route.ts
    schema: z.object({
      prompt: z.string(),
      amount: z.string(),
      secure_url: z.string(),
      version: z.string().default("435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117")
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
        image_resolution: "512"
      }
    })

    return prediction.output;
  },

})