"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
//import { saveCharacter } from "@/lib/storage";
import { useRouter } from "next/navigation";
import { SelectContent, SelectTrigger, SelectValue } from "@radix-ui/react-select";

interface CharacterFormProps {
  onCreate: (character: any) => void;
}

export default function CharacterCreator({ onCreate }: CharacterFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [charClass, setCharClass] = useState("");
  const [race, setRace] = useState("");
  const [attributes, setAttributes] = useState({
    strength: 5,
    dexterity: 5,
    constitution: 5,
    intelligence: 5,
    wisdom: 5,
    charisma: 5,
  });

  const handleSubmit = () => {
    const character = {
      name,
      class: charClass,
      race,
      attributes,
      equipment: {
        armor: "Leather",
        weapon: "Sword",
        spells: [],
      },
    };
    //saveCharacter(character);
    router.push("/campaign/chat");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create Your Character</h1>
      <Input placeholder="Character Name" value={name} onChange={(e) => setName(e.target.value)} />

      <div>
        <h2 className="font-semibold">Class</h2>
        <Select onValueChange={setCharClass}>
            <SelectContent>
                <SelectItem value="fighter">Fighter (High HP, melee)</SelectItem>
                <SelectItem value="wizard">Wizard (Spells, low HP)</SelectItem>
                <SelectItem value="rogue">Rogue (Dexterity, stealth)</SelectItem>
            </SelectContent>
        </Select>
      </div>

      <div>
        <h2 className="font-semibold">Race</h2>
        <Select onValueChange={setRace}>
            <SelectTrigger>
                <SelectValue placeholder="Choose a class"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="human">Human (+balanced stats)</SelectItem>
                <SelectItem value="elf">Elf (+dexterity, +intelligence)</SelectItem>
                <SelectItem value="dwarf">Dwarf (+constitution, +strength)</SelectItem>
                <SelectItem value="orc">Orc (+strength, -charisma)</SelectItem>
            </SelectContent>
        </Select>
      </div>

      <div>
        <h2 className="font-semibold">Attributes</h2>
        {Object.keys(attributes).map((attr) => (
          <div key={attr} className="flex items-center space-x-2">
            <span className="capitalize">{attr}</span>
            <Input
              type="number"
              min={1}
              max={20}
              value={attributes[attr as keyof typeof attributes]}
              onChange={(e) =>
                setAttributes({ ...attributes, [attr]: parseInt(e.target.value) })
              }
            />
          </div>
        ))}
      </div>

      <Button onClick={handleSubmit}>Save Character & Start Adventure</Button>
    </div>
  );
}
