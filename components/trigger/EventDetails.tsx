"use client";

import { useEventRunDetails } from "@trigger.dev/react";
import { RunId } from "./RunId";

export function EventDetails({ eventId }: { eventId: string }) {
  const { isLoading, isError, data, error } = useEventRunDetails(eventId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  //show the run status and all the tasks
  return (
    <div>
    </div>
  );
}