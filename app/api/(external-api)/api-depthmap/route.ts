import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Forward the POST request to the external API
      const externalApiResponse = await fetch('https://cloud.trigger.dev/api/v1/endpoints/', {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          // Include any other necessary headers
        },
        body: JSON.stringify(req.body),
      });

      if (!externalApiResponse.ok) {
        throw new Error(`External API error with status: ${externalApiResponse.status}`);
      }

      // Fetch the JSON result from the external API response
      const result = await externalApiResponse.json();

      // Send back the result as JSON
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  } else {
    // If not a POST request, return 405 Method Not Allowed
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}