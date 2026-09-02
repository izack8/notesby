import Link from "next/link";

type LinkedTextProps = {
  text: string;
};

export default function LinkedText({ text }: LinkedTextProps) {
  return text.split(/(\b[\w-]+\b)/).map((part, index) =>
    /[\w]/.test(part) ? (
      <Link className="hover:text-blue-500 hover:underline" key={`${part}-${index}`} href={`/corpus/${part.toLowerCase()}`}>
        {part}
      </Link>
    ) : (
      part
    ),
  );
}