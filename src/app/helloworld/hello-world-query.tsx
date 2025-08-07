"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "#/trpc/react";

function HelloWorldQuery() {
    const trpc = useTRPC();

    const helloworldQueryOptions = trpc.helloWorld.helloWorld.queryOptions();
    const helloWorldQuery = useQuery(helloworldQueryOptions);

    if (helloWorldQuery.isLoading) {
        return <p>Loading...</p>;
    }

    if (helloWorldQuery.error) {
        return <p>Error: {helloWorldQuery.error.message}</p>;
    }

    return <p>{helloWorldQuery.data ? helloWorldQuery.data : "No data available"}</p>;
}

export { HelloWorldQuery };
