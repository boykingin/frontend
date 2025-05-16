import { useTRPC } from "@/integrations/trpc/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Suspense } from "react";
import Masonary from "@/components/masonary";
import { z } from "zod";
import "animate.css/animate.compat.css?url";
export const Route = createFileRoute("/")({
  component: App,
  loader: async ({ context }) => {
    await context.queryClient.fetchQuery(
      context.trpc.snippet.all.queryOptions()
    );
  },
  validateSearch: z.object({
    term: z.string().default(""),
  }),
});

function App() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.snippet.all.queryOptions());
  const { term } = useSearch({ from: "/" });
  const filtered =
    term !== ""
      ? data.filter((i) => {
          return (
            i.title.toLowerCase().includes(term.toLowerCase()) ||
            i.description.toLowerCase().includes(term.toLowerCase()) ||
            i.language.toLowerCase().includes(term.toLowerCase())
          );
        })
      : data;
  return (
    <div className="w-[100%] h-fit px-[30px] motion-preset-fade">
      <Suspense
        fallback={
          <div className="w-[100%] h-[80%] flex items-center justify-center">
            <div className="loadingspinner">
              <div id="square1"></div>
              <div id="square2"></div>
              <div id="square3"></div>
              <div id="square4"></div>
              <div id="square5"></div>
            </div>
          </div>
        }
      >
        <Masonary data={filtered} />
      </Suspense>
    </div>
  );
}
