import NewEntryForm from "@/components/NewEntryForm";

type NewEntryPageProps = {
  searchParams: Promise<{ headword?: string }>;
};

export default async function NewEntryPage({ searchParams }: NewEntryPageProps) {
  const { headword = "" } = await searchParams;

  return <NewEntryForm initialHeadword={headword} />;
}