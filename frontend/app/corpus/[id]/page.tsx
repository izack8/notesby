import Link from "next/link";
import LinkedText from "@/components/LinkedText";
import { getEntry } from "@/lib/corpus";

type EntryPageProps = {
	params: Promise<{ id: string }>;
};

export default async function EntryPage({ params }: EntryPageProps) {
	const { id } = await params;
	const entry = getEntry(id);

	if (!entry) {
		return (
			<main className="flex flex-1 flex-col">
				<h1 className="app-heading font-bold">{id}</h1>
				<p className="mt-6">This word has not been defined yet.</p>
				<Link className="mt-4 w-fit border px-3 py-1" href={{ pathname: "/new", query: { headword: id } }}>
					add it in!
				</Link>
			</main>
		);
	}

	return (
		<main className="flex flex-1 flex-col">
			<header>
				<h1 className="app-heading font-bold">{entry.headword}</h1>
				<p>{entry.pos}</p>
			</header>

			<ol className="mt-6 list-decimal space-y-5 pl-6">
				{entry.definitions.map((definition, index) => (
					<li key={`${entry.id}-${index}`}>
						<p>
							<LinkedText text={definition.text} />
						</p>
						{definition.examples.length > 0 && (
							<ul className="mt-2 list-disc space-y-1 pl-6">
								{definition.examples.map((example) => (
									<li key={example}>
										<LinkedText text={example} />
									</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ol>
			{entry.related.length > 0 && (
				<section className="mt-6">
					<h2 className="font-bold">related</h2>
					<ul>
						{entry.related.map((relatedId) => (
							<li key={relatedId}>
								<Link href={`/corpus/${relatedId}`}>{relatedId}</Link>
							</li>
						))}
					</ul>
				</section>
			)}
		</main>
	);
}
