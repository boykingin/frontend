import { useTRPC } from "@/integrations/trpc/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Suspense } from "react";
import Masonary from "@/components/masonary";
import { z } from "zod";
import "animate.css/animate.compat.css?url";
export const Route = createFileRoute("/")({
  component: App,
  validateSearch: z.object({
    term: z.string().optional(),
  }),
});

function App() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.snippet.all.queryOptions());
  const { term } = useSearch({ from: "/" });
  const filtered =
    term !== undefined
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
      <Suspense fallback={<>loading...</>}>
        <Masonary data={filtered} />
      </Suspense>
    </div>
  );
}
