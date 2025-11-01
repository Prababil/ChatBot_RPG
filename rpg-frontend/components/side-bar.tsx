"use client";

export default function Sidebar({ character }: { character: any }) {
  return (
    <aside className="w-64 bg-gray-100 p-4 border-r">
      <h2 className="text-xl font-bold">Character</h2>
      {character ? (
        <div>
          <p className="font-medium">{character.name}</p>
          <h3 className="mt-4 font-semibold">Inventory</h3>
          <ul className="list-disc ml-5">
            {character.inventory?.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No character loaded.</p>
      )}
    </aside>
  );
}
