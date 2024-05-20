import { eventTrigger } from "@trigger.dev/sdk";
import { client } from "@/trigger";
import { Replicate } from '@trigger.dev/replicate'

import { z } from 'zod'

const replicate = new Replicate({
  id: 'replicate',
  apiKey: process.env.REPLICATE_API_TOKEN as string,
})

//define the job

client.defineJob({
    id: 'styleImg',
    name: "style",
    version: "1.0.0",
    integrations: {replicate},
    trigger: eventTrigger({
        name: "style",
        schema: z.object({
            secure_url_1: z.string(),
            secure_url_2: z.string(),
            guidance_scale: z.number(),
            style_strength: z.number(),
            structure_strength: z.number(),
            version: z.string().default("a15407d73d9669676d623e37ee3b6d43642439beec1b99639967d215bcf42fc4")
        })
    }),

    run: async (payload, io, ctx) => {
        const { secure_url_1, secure_url_2, guidance_scale, style_strength, structure_strength, version } = payload;

        const prediction = await io.replicate.predictions.createAndAwait("await-prediction", {
            version: version,
            input: {
                seed: 1400,
                image: secure_url_1,
                prompt: "masterpiece, best quality, highres",
                image_style: secure_url_2,
                guidance_scale: guidance_scale,
                style_strength: style_strength,
                structure_strength: structure_strength,
                negative_prompts: 'worst quality, low quality, normal quality, nude, nudity, sexually explicit, porn, pornographic, adult content, violence, gore, blood, offensive, disturbing, explicit, inappropriate, human faces, human face, human body, human bodies, human, people, person, portrait, close-up, close up, closeup',
                num_interference_steps:30
            }
        })

        return prediction.output;
    }

})