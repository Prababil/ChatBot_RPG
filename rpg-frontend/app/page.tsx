import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">ChatBot RPG</h1>
      <div className="flex gap-4">
        <Link href="/campaign/new">
          <Button>Create New Campaign</Button>
        </Link>
        <Button variant="secondary" disabled>
          Continue Campaign (Coming Soon)
        </Button>
      </div>
    </main>
  );
}
