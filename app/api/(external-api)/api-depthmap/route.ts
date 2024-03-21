// this route is to call the external webhoon to trigger the deployment of the output from replicate

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const response = await fetch('https://cloud.trigger.dev/api/v1/endpoints/clu0auvl1z9siob2jardnpqof/nullrender-gqhd/index/7e8fl8cvc1')

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 500 });
        
    }
}