import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { bids as bidsSchema, items } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { createItemAction } from "./actions";

export default async function CreatePage() {
  const session = await auth();

  return (
    <main className="container mx-auto space-y-8 py-12">
      <h1 className="text-4xl font-bold">
        Post an item
      </h1>

      <form
        className="border flex p-8 rounded-xl space-y-4 flex-col max-w-md"
        action={createItemAction}
      >
        <Input className="max-w-lg" name="name" placeholder="Name your item" />
        <Button className="self-end" type="submit">Post Item</Button>
      </form>

    </main>
  );
}
