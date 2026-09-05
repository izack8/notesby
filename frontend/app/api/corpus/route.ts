import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import type { Entry } from "@/lib/corpus";
import { buildCorpusIndex } from "@/lib/corpus-index";

export const runtime = "nodejs";

const corpusPath = path.join(process.cwd(), "data", "corpus.json");
const corpusIndexPath = path.join(process.cwd(), "data", "corpus-index.json");

type NewEntryRequest = {
  headword?: unknown;
  pos?: unknown;
  definition?: unknown;
  examples?: unknown;
  related?: unknown;
  aliases?: unknown;
};

function createId(headword: string) {
  return headword.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function POST(request: Request) {
  let body: NewEntryRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const headword = typeof body.headword === "string" ? body.headword.trim() : "";
  const pos = typeof body.pos === "string" ? body.pos.trim() : "";
  const definition = typeof body.definition === "string" ? body.definition.trim() : "";

  if (!headword || !pos || !definition) {
    return NextResponse.json(
      { error: "Headword, part of speech, and definition are required." },
      { status: 400 },
    );
  }

  const id = createId(headword);
  if (!id) {
    return NextResponse.json({ error: "Headword must contain letters or numbers." }, { status: 400 });
  }

  const examples = typeof body.examples === "string"
    ? body.examples.split("\n").map((example) => example.trim()).filter(Boolean)
    : [];
  const related = typeof body.related === "string"
    ? body.related.split(",").map((entryId) => createId(entryId)).filter(Boolean)
    : [];
  const aliases = typeof body.aliases === "string"
    ? body.aliases.split(",").map((alias) => alias.trim()).filter(Boolean)
    : [];
  const entries = JSON.parse(await readFile(corpusPath, "utf8")) as Entry[];

  if (entries.some((entry) => entry.id === id)) {
    return NextResponse.json({ error: `An entry for "${headword}" already exists.` }, { status: 409 });
  }

  const entry: Entry = {
    id,
    headword,
    pos,
    definitions: [{ text: definition, examples }],
    related,
    ...(aliases.length > 0 ? { aliases } : {}),
  };

  const updatedEntries = [...entries, entry];
  await writeFile(corpusPath, `${JSON.stringify(updatedEntries, null, 2)}\n`);
  await writeFile(corpusIndexPath, `${JSON.stringify(buildCorpusIndex(updatedEntries), null, 2)}\n`);

  return NextResponse.json(entry, { status: 201 });
  
}