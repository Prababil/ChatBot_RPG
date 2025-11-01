"use client";
import { useState } from "react";
import CharacterCard from "@/components/CharacterCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { saveGameData } from "@/lib/storage";

const characters = [
  { id: 1, name: "Aric", class: "Fighter", race: "Human", hp: 120, strength: 16, intelligence: 8 },
  { id: 2, name: "Lyra", class: "Wizard", race: "Elf", hp: 80, strength: 6, intelligence: 18 },
  { id: 3, name: "Doran", class: "Rogue", race: "Dwarf", hp: 100, strength: 12, intelligence: 10 },
];

export default function NewCampaignPage() {
  const [selected, setSelected] = useState(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selected) {
      saveGameData("character", selected);
      router.push("/campaign/chat");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Choose Your Character</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            onSelect={setSelected}
            selected={selected?.id === char.id}
          />
        ))}
      </div>
      <Button onClick={handleContinue} disabled={!selected}>
        Continue
      </Button>
    </div>
  );
}
