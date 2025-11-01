"use client";
import { useState, useEffect } from "react";
import { loadGameData } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Sidebar() {
  const [character, setCharacter] = useState(null);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    setCharacter(loadGameData("character"));
    setInventory(loadGameData("inventory") || []);
  }, []);

  return (
    <div className="w-64 border-r p-4 bg-muted/10 h-screen">
      {character && (
        <>
          <h2 className="font-bold text-lg mb-2">{character.name}</h2>
          <p>{character.race} {character.class}</p>
          <p>HP: {character.hp}</p>
          <h3 className="mt-4 font-semibold">Inventory</h3>
          <ul className="list-disc ml-5">
            {inventory.length > 0 ? (
              inventory.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <li className="text-muted-foreground">Empty</li>
            )}
          </ul>
          <Link href="/new">
          <Button className="mt-4 w-full" onClick={() => localStorage.clear()}>
            Start New Campaign
          </Button>
          </Link>
        </>
      )}
    </div>
  );
}
