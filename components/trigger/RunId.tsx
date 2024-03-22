"use client";

import { useRunDetails } from "@trigger.dev/react";
import { Download } from "lucide-react";
import Image from "next/image";
import { Card, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import Loader from "../shared/Loader";
import { useEffect, useState } from "react";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

type RunIdType = {
  runId: string;
  setInfo: React.Dispatch<any>;
}



export function RunId({ runId, setInfo }: RunIdType) {
  const { isLoading, isError, data, error } = useRunDetails(runId);
  const [image, setImage] = useState();
  

  useEffect(() => {
    let intervalId:any;
  
    const fetchData = async () => {
      try {
        const response = await fetch('/api/api-depthmap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({ your: 'data' }), // If needed
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        // If the fetch is successful, we assume an endpoint 
        // or another useEffect will eventually update the `data` state
        setInfo(data?.completedAt)
  
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
  
    // Start the fetching process if `data.status` is neither "SUCCESS" nor "FAILURE"
    if (data && data?.status !== "SUCCESS" && data?.status !== "FAILURE") {
      fetchData();  // Also call it immediately
      intervalId = setInterval(fetchData, 1000);
    } 
  
    // Return the cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  
  // Include `data.status` in the dependencies array to re-run 
  // the effect when the status changes
  }, [data?.status]);


  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  //show the run status and all the tasks
  return (
    <div className='space-y-4 mt-4'>
      {data && data?.status !== "SUCCESS" && (
        <div className='p-8 rounded-lg w-full flex items-center justify-center'>
          <Loader />
        </div>
        )}
        <p>{data?.status}</p>
        {data?.output && (
          <div className="space-y-4 mt-10 border rounded-lg p-4">
            <div>
              <h2 className='text-3xl font-bold text-center'>Generated Images</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-2 gap-4 mt-8'>
              {Array.isArray(data.output) && data.output?.slice(1).map((image:any, index:number) => (
                <Card key={index} className="rounded-lg overflow-hidden">
                  <div>
                    <Image
                      key={index}
                      src={image}
                      alt="Generated Image"
                      width={512}
                      height={512}
                      />
                  </div>
                  <CardFooter>
                    <Button variant="secondary" className='w-full mt-4' onClick={() => {window.open(image)}} >
                      <Download className='h-4 w-4 mr-2' />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}