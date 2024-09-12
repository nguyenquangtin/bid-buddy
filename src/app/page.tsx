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
      <h1 className="text-4xl font-bold">
        Post an item to sell
      </h1>

      <form
        className="border flex p-8 rounded-xl space-y-4 flex-col max-w-md"
        action={async (formData: FormData) => {
          "use server";
          // const bid = formData.get("bid") as string;
          await database.insert(items).values({
            name: formData.get("name") as string,
            userId: session?.user?.id!,
          });
          revalidatePath("/");
        }}
      >
        <Input className="max-w-lg" name="name" placeholder="Name your item" />
        <Button className="self-end" type="submit">Post Item</Button>
      </form>

      <h2 className="text-2xl font-bold">
        Items for Sale
      </h2>

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
