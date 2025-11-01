"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function TopBar() {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-50">
      <h1
        onClick={() => router.push("/")}
        className="text-xl font-bold cursor-pointer"
      >
        ChatBotRPG
      </h1>
      <div className="flex gap-3">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/campaign/saved">Saved Campaigns</Link>
      </div>
    </nav>
  );
}
