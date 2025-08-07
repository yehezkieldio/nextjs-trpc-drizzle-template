"use client";

import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchStreamLink, loggerLink } from "@trpc/client";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { lazy, Suspense, useState } from "react";
import SuperJSON from "superjson";
import type { AppRouter } from "#/server/api/root";
import { createQueryClient } from "#/trpc/query-client";

const ReactQueryDevtools = lazy(() =>
    import("@tanstack/react-query-devtools").then((mod) => ({ default: mod.ReactQueryDevtools }))
);

export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<AppRouter>();

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

let clientQueryClientSingleton: QueryClient | undefined;
const getQueryClient = () => {
    if (typeof window === "undefined") {
        return createQueryClient();
    }

    clientQueryClientSingleton ??= createQueryClient();
    return clientQueryClientSingleton;
};

export function TRPCReactProvider(props: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    const [trpcClient] = useState(() =>
        createTRPCClient<AppRouter>({
            links: [
                loggerLink({
                    enabled: (op) =>
                        process.env.NODE_ENV === "development" ||
                        (op.direction === "down" && op.result instanceof Error),
                }),
                httpBatchStreamLink({
                    transformer: SuperJSON,
                    url: `${getBaseUrl()}/api/trpc`,
                    headers: () => {
                        const headers = new Headers();
                        headers.set("x-trpc-source", "nextjs-react");
                        return headers;
                    },
                }),
            ],
        })
    );

    const shouldShowDevtools = process.env.NODE_ENV === "development" || process.env.USE_REACTQUERY_DEVTOOLS;

    return (
        <QueryClientProvider client={queryClient}>
            <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
                {props.children}
            </TRPCProvider>
            {shouldShowDevtools && (
                <Suspense fallback={null}>
                    <ReactQueryDevtools initialIsOpen={false} />
                </Suspense>
            )}
        </QueryClientProvider>
    );
}

function getBaseUrl() {
    if (typeof window !== "undefined") {
        return window.location.origin;
    }

    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    return `http://localhost:${process.env.PORT ?? 3000}`;
}
