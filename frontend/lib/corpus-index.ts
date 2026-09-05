import type { Entry } from "@/lib/corpus";

export type CorpusIndex = {
  index: Record<string, string>;
  maxPhraseLength: number;
};

export function normalizePhrase(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, " ");
}

export function buildCorpusIndex(entries: Entry[]): CorpusIndex {
  const index: Record<string, string> = {};
  let maxPhraseLength = 1;

  for (const entry of entries) {
    for (const phrase of [entry.headword, ...(entry.aliases ?? [])]) {
      const normalizedPhrase = normalizePhrase(phrase);

      if (!normalizedPhrase) {
        continue;
      }

      index[normalizedPhrase] = entry.id;
      maxPhraseLength = Math.max(maxPhraseLength, normalizedPhrase.split(" ").length);
    }
  }

  return { index, maxPhraseLength };
}