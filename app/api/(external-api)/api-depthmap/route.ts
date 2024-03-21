export async function POST(req:any, res:any) {
    try {
      // Forward the POST request to the external API
      const externalApiResponse = await fetch('https://cloud.trigger.dev/api/v1/endpoints/clu0auvl1z9siob2jardnpqof/nullrender-gqhd/index/7e8fl8cvc1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // ... any other headers the external API expects ...
        },
      });
  
      if (!externalApiResponse.ok) throw new Error(`External API error with status: ${externalApiResponse.status}`);
  
      // Retrieve and forward the response from the external API
      if (!externalApiResponse.ok) throw new Error(`External API error with status: ${externalApiResponse.status}`);

      res.status(200).json({ message: 'Success' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

