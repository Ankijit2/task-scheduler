"use client";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation"; // Correct import for routing

export default function Home() {
  const router = useRouter(); // Use the router

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold underline">Welcome to My app</h1>
      <Button onClick={() => router.push('/main')}>Click here</Button>
    </div>
  );
}
