import { createTRPCRouter, publicProcedure } from "./init";
import { z } from "zod";

const BASE_URL = import.meta.env.PROD
  ? "https://backend.voidrift.workers.dev"
  : "http://127.0.0.1:8787";

type deleteResponse =
  | {
      success: true;
      id: number;
    }
  | {
      success: false;
      message: "id not found";
    };

type item = {
  id: number;
  dateCreated: string;
  description: string;
  code: string;
  title: string;
  language: string;
};

const SnippetRouter = {
  all: publicProcedure.query(async () => {
    const data = await fetch(BASE_URL + "/snippets/all");
    const body = await data.json();
    return body as item[];
  }),
};

const delete_snippet = publicProcedure
  .input(
    z.object({
      id: z.number(),
    })
  )
  .mutation(async (opts) => {
    const response = await fetch(BASE_URL + `/snippets/${opts.input.id}`, {
      method: "DELETE",
    });
    return (await response.json()) as deleteResponse;
  });

export const upload_snippet = publicProcedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
      language: z.string(),
      code: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const response = await fetch(BASE_URL + `/snippets/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: input.title,
        description: input.description,
        language: input.language,
        code: input.code,
      }),
    });

    return await response.json();
  });

export const trpcRouter = createTRPCRouter({
  snippet: SnippetRouter,
  delete_snippet,
  upload_snippet,
});
export type TRPCRouter = typeof trpcRouter;
