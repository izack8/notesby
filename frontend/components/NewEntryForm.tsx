"use client";

import { useState, SubmitEvent } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  headword: string;
  pos: string;
  definition: string;
  examples: string;
  related: string;
  aliases: string;
};

type NewEntryFormProps = {
  initialHeadword: string;
};

const initialForm: FormState = {
  headword: "",
  pos: "",
  definition: "",
  examples: "",
  related: "",
  aliases: "",
};

export default function NewEntryForm({ initialHeadword }: NewEntryFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({ ...initialForm, headword: initialHeadword });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const response = await fetch("/api/corpus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      setError(result.error ?? "Unable to create this entry.");
      return;
    }

    router.push(`/corpus/${result.id}`);
    router.refresh();
  }

  return (
    <main className="flex flex-1 flex-col">
      <h1 className="app-heading font-bold">new entry</h1>
      <form className="mt-6 flex max-w-2xl flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1">
          headword
          <input className="border px-2 py-1" name="headword" required value={form.headword} onChange={(event) => setForm({ ...form, headword: event.target.value })} />
        </label>
        <label className="flex flex-col gap-1">
          part of speech
          <select className="border px-2 py-1" name="pos" required value={form.pos} onChange={(event) => setForm({ ...form, pos: event.target.value })}>
            <option value="" disabled>
              select a part of speech
            </option>
            <option value="noun">noun</option>
            <option value="pronoun">pronoun</option>
            <option value="verb">verb</option>
            <option value="adjective">adjective</option>
            <option value="adverb">adverb</option>
            <option value="preposition">preposition</option>
            <option value="conjunction">conjunction</option>
            <option value="interjection">interjection</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          definition
          <textarea className="border px-2 py-1" name="definition" required rows={4} value={form.definition} onChange={(event) => setForm({ ...form, definition: event.target.value })} />
        </label>
        <label className="flex flex-col gap-1">
          examples (one per line)
          <textarea className="border px-2 py-1" name="examples" rows={3} value={form.examples} onChange={(event) => setForm({ ...form, examples: event.target.value })} />
        </label>
        <label className="flex flex-col gap-1">
          related entry IDs (comma-separated)
          <input className="border px-2 py-1" name="related" value={form.related} onChange={(event) => setForm({ ...form, related: event.target.value })} />
        </label>
        <label className="flex flex-col gap-1">
          aliases (comma-separated)
          <input className="border px-2 py-1" name="aliases" value={form.aliases} onChange={(event) => setForm({ ...form, aliases: event.target.value })} />
        </label>
        {error && <p role="alert">{error}</p>}
        <button className="w-fit border px-3 py-1" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "creating..." : "create entry"}
        </button>
      </form>
    </main>
  );
}
