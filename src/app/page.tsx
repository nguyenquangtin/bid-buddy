import { auth } from "@/auth";
import SignIn from "@/components/sign-in"; // Updated import path
import SignOut from "@/components/sign-out"; // Changed to default import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { bids as bidsSchema, items } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function HomePage() {
  const session = await auth();
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto space-y-8 py-12">
      <h1 className="text-4xl font-bold">Items For Sale</h1>


      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <div
            className="border p-8 rounded-xl"
            key={item.id}>{item.name}</div>
        ))}
      </div>
    </main>
  );
}
