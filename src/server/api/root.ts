import { helloWorldRouter } from "#/server/api/routers/hello-world";
import { createTRPCRouter } from "#/server/api/trpc";

export const appRouter = createTRPCRouter({
    helloWorld: helloWorldRouter,
});

export type AppRouter = typeof appRouter;
