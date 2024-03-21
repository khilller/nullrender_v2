import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest) {
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
    const data = await externalApiResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}