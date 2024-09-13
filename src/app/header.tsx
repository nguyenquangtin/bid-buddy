import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";
import Image from "next/image"
import Link from "next/link";

export async function Header() {
  const session = await auth();

  return (
    <div className="bg-gray-50 py-4">
      <div className="container flex justify-between mx-auto">

        <div className="flex items-center gap-8">
          <Link href="/" className="hover:underline flex items-center gap-1">
            <Image src="/logo.svg" width="50" height="50" alt="logo" />
            EcomdyBuddy.com
          </Link>

          <div>
            <Link href="/items/create" className="hover:underline flex items-center gap-1">
              Auction Item
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div>{session?.user?.name}</div>
          <div>
            {session ? <SignOut /> : <SignIn />}
          </div>
        </div>

      </div>
    </div>
  )
}
