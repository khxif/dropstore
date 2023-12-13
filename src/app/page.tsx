import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { userId } = auth();
  return (
    <main className="w-full text-center container h-[80vh] flex items-center space-y-2 flex-col justify-center">
      <h1 className="text-4xl md:text-6xl md:max-w-4xl font-semibold">
        Effortless{" "}
        <span
          className="bg-gradient-to-br bg-clip-text text-transparent from-indigo-300 to-fuchsia-600
           animate-pulse md:leading-normal via-violet-700"
        >
          file storage,infinite possibilities
        </span>{" "}
        unlocked.
      </h1>
      <p className="text-lg md:max-w-2xl text-slate-500/60">
        Your files, securely stored, effortlessly accessible.
      </p>

      <Link href={userId ? "/dashboard" : "/sign-in"}>
        <Button
          className="flex items-center space-x-1 font-medium text-lg px-10 py-6 bg-gradient-to-br 
          hover:brightness-75 from-blue-800 via-indigo-900 to-purple-600 dark:text-white 
          transition-all duration-300 ease-in-out rounded-full drop-shadow-lg mt-4"
          size="lg"
        >
          Get started
          <ArrowRight className=" w-5 h-5 ml-1" />
        </Button>
      </Link>
    </main>
  );
}
