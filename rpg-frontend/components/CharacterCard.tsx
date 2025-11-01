"use client";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Character = {
  name: string;
  class: string;
  race: string;
  hp: number;
  strength: number;
  intelligence: number;
};

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
  selected: boolean;
}

export default function CharacterCard({ character, onSelect, selected }: CharacterCardProps) {
  return (
    <Card
      className={`cursor-pointer transition ${
        selected ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={() => onSelect(character)}
    >
      <CardHeader>
        <h2 className="text-xl font-semibold">{character.name}</h2>
        <p className="text-muted-foreground">{character.class}</p>
      </CardHeader>
      <CardContent>
        <p>Race: {character.race}</p>
        <p>HP: {character.hp}</p>
        <p>Strength: {character.strength}</p>
        <p>Intelligence: {character.intelligence}</p>
      </CardContent>
      <CardFooter>
        <Button variant={selected ? "default" : "outline"}>
          {selected ? "Selected" : "Select"}
        </Button>
      </CardFooter>
    </Card>
  );
}
