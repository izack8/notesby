import corpus from "../data/corpus.json";

export type Entry = {
  id: string;
  headword: string;
  pos: string;
  definitions: Array<{
    text: string;
    examples: string[];
  }>;
  related: string[];
  aliases?: string[];
};

export const entries = corpus as Entry[];

export function getEntry(id: string) {
  return entries.find((entry) => entry.id === id.toLowerCase());
}