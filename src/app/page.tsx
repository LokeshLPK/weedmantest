/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
const ALL_FRANCHISE_QUERY = `*[_type == "weedManFranchiseType"]`;
export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await client.fetch(ALL_FRANCHISE_QUERY);

  return (
    <main className="container mx-auto p-4">
      <h1>Home</h1>
      <div className="flex flex-wrap gap-4">
        {data?.map((franchise: any) => (
          <Button
            key={franchise._id || franchise.franchise_name}
            variant="outline"
          >
            {franchise.franchise_name}
          </Button>
        ))}
         
      </div>
    </main>
  );
}
