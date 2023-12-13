import { UserButton, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { DarkModeToggle } from "./DarkModeToggle";

export default function Header() {
  const { userId } = auth();
  return (
    <header className="flex justify-between items-center border-b-2">
      <Link href='/' className="flex items-center space-x-2">
        <div className="bg-[#0160FE] w-fit">
          <Image
            src="/logo.png"
            alt="logo"
            className="invert"
            width={50}
            height={50}
          />
        </div>
        <h1 className="text-xl font-bold">DropStore</h1>
      </Link>

      <div className="justify-end px-5 flex items-center space-x-4 py-2">
        <DarkModeToggle />
        {userId ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link href="/sign-in">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
