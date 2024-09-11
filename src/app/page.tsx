import { database } from "@/db/database";
import { bids as bidsSchema } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";
import { auth } from "@/auth";

export default async function Homepage() {
  const bids = await database.query.bids.findMany(); // get all

  const session = await auth();

  return (
    <main className="">
      {session ? <SignOut /> : <SignIn />}
      {session?.user?.name}
      <form
        className="contrainer mx-auto"
        action={async (formData: FormData) => {
          "use server";

          await database.insert(bidsSchema).values({});
          revalidatePath("/");
        }}
      >
        <Input id="bid" placeholder="bid" />
        <Button type="submit">Place bid</Button>
      </form>

      {bids.map((bid) => (
        <div key={bid.id}>{bid.id}</div>
      ))}
    </main>
  );
}
