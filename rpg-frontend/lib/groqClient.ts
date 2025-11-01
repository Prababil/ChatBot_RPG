import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY! , dangerouslyAllowBrowser: true });

export async function sendChatMessage(character, message, history = []) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content: `You are the Game Master in a text RPG. 
        The player is ${character.name}, a ${character.race} ${character.class}. 
        Respond narratively to their actions and progress the story. 
        Keep track of their items and state. The player wakes up locked in a cell, 2 goblins guard outside, there is a whole in the wall that leads to the next cell which is open`,
      },
      ...history,
      { role: "user", content: message },
    ],
  });

  return response.choices[0]?.message?.content || "No response";
}
