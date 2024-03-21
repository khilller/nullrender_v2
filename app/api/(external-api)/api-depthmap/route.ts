import { NextResponse } from "next/server";

export async function POST(res:NextResponse) {
    try {
      // Forward the POST request to the external API
      const externalApiResponse = await fetch('https://cloud.trigger.dev/api/v1/endpoints/clu0auvl1z9siob2jardnpqof/nullrender-gqhd/index/7e8fl8cvc1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // ... any other headers the external API expects ...
        },
      });
  
      // Retrieve and forward the response from the external API
      if (!externalApiResponse.ok) throw new Error(`External API error with status: ${externalApiResponse.status}`);

      return NextResponse.json({success: true})
  
    } catch (error) {
      return NextResponse.json({success: false});
    }
  }

