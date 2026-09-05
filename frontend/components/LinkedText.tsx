import Link from "next/link";
import corpusIndex from "@/data/corpus-index.json";
import { normalizePhrase } from "@/lib/corpus-index";

type LinkedTextProps = {
  text: string;
};

export default function LinkedText({ text }: LinkedTextProps) {
  const tokens = text.match(/[\w-]+|[^\w-]+/g) ?? [];
  const index: Record<string, string> = corpusIndex.index;
  const content = [];

  for (let position = 0; position < tokens.length;) {
    if (!/^[\w-]+$/.test(tokens[position])) {
      content.push(tokens[position]);
      position += 1;
      continue;
    }

    let match: { id: string; end: number } | undefined;
    const words: string[] = [];
    let end = position;

    while (
      words.length < corpusIndex.maxPhraseLength &&
      end < tokens.length &&
      /^[\w-]+$/.test(tokens[end])
    ) {
      words.push(tokens[end]);
      const id = index[normalizePhrase(words.join(" "))];

      if (id) {
        match = { id, end };
      }

      if (!/^\s+$/.test(tokens[end + 1] ?? "")) {
        break;
      }

      end += 2;
    }

    if (match) {
      content.push(
        <Link className="hover:text-blue-500 hover:underline" key={`${position}-${match.end}`} href={`/corpus/${match.id}`}>
          {tokens.slice(position, match.end + 1).join("")}
        </Link>,
      );
      position = match.end + 1;
      continue;
    }

    content.push(
      <Link className="hover:text-blue-500 hover:underline" key={`${position}-${tokens[position]}`} href={`/corpus/${normalizePhrase(tokens[position])}`}>
        {tokens[position]}
      </Link>,
    );
    position += 1;
  }

  return content;
}