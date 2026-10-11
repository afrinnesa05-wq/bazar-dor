
import Link from "next/link";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

const Navlinks = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`Categories API error: ${res.status}`);
  }

  const text = await res.text();

  let data: unknown;

  try {
    data = JSON.parse(text);
  } catch {
    console.error("Categories API returned:", text);
    throw new Error("Categories API থেকে valid JSON পাওয়া যায়নি");
  }

  // API সরাসরি array অথবা { data: [...] } দিতে পারে
  const navs: Category[] = Array.isArray(data)
    ? data
    : typeof data === "object" &&
        data !== null &&
        "data" in data &&
        Array.isArray(data.data)
      ? data.data
      : [];

  if (navs.length === 0) {
    return (
      <nav className="flex flex-wrap items-center gap-2 px-4 pb-3 sm:px-6">
        <p className="text-sm text-gray-500">
          কোনো ক্যাটাগরি পাওয়া যায়নি।
        </p>
      </nav>
    );
  }

  return (
    <nav className="flex flex-wrap items-center gap-1.5 px-4 pb-3 sm:px-6">
      {navs.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="rounded-md px-2.5 py-1.5 text-sm text-gray-600 transition hover:bg-green-50 hover:text-green-600"
        >
          <span>{category.icon}</span>{" "}
          <span>{category.nameBn}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navlinks;
