'use server'
import { database } from "@/db/database";
import { bids as bidsSchema, items } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth"

export async function createItemAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  // const bid = formData.get("bid") as string;
  await database.insert(items).values({
    name: formData.get("name") as string,
    userId: session?.user?.id!,
  });
  revalidatePath("/");
}
