import { createTRPCRouter, publicProcedure } from "#/server/api/trpc";

export const helloWorldRouter = createTRPCRouter({
    helloWorld: publicProcedure.query(() => {
        return "Hello, world!";
    }),
});
