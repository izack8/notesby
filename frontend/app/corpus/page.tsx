import Link from "next/link";
import { entries } from "@/lib/corpus";

export default function Corpus() {
  return (
    <main className="flex flex-1 flex-col">
      <h1 className="app-heading font-bold">corpus</h1>
      <ul className="mt-6 space-y-2">
        {entries.map((entry) => (
          <li key={entry.id}>
            <Link href={`/corpus/${entry.id}`}>{entry.headword}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}