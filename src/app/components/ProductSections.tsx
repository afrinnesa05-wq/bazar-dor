
import Link from "next/link";

type Product = {
  id: number | string;
  slug: string;
  nameBn: string;
  image?: string;
  today: number;
  unit: string;
  change?: {
    dir: "up" | "down" | "same";
    pct: number;
  };
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`Products API error: ${res.status}`);
  }

  const text = await res.text();

  let result: unknown;

  try {
    result = JSON.parse(text);
  } catch {
    console.error("Products API returned HTML/text:", text.slice(0, 300));
    throw new Error("Products API থেকে valid JSON পাওয়া যায়নি");
  }

  // API সরাসরি array অথবা { data: [...] } দিতে পারে
  if (Array.isArray(result)) {
    return result as Product[];
  }

  if (typeof result === "object" && result !== null) {
    const obj = result as Record<string, unknown>;

    if (Array.isArray(obj.data)) {
      return obj.data as Product[];
    }

    if (Array.isArray(obj.products)) {
      return obj.products as Product[];
    }
  }

  console.error("Unexpected Products API response:", result);
  throw new Error("Products API-এর data format সঠিক নয়");
}

function ProductCard({ product }: { product: Product }) {
  const direction = product.change?.dir ?? "same";
  const change = product.change?.pct ?? 0;

  const badgeClass =
    direction === "up"
      ? "bg-green-50 text-green-600"
      : direction === "down"
        ? "bg-red-50 text-red-600"
        : "bg-gray-100 text-gray-500";

  const badgeIcon =
    direction === "up" ? "▲" : direction === "down" ? "▼" : "—";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50 text-6xl">
        {product.image || "🛒"}
      </div>

      <h3 className="mt-4 font-semibold text-gray-900">
        {product.nameBn}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        প্রতি {product.unit}
      </p>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="mt-1 text-xl font-bold text-gray-900">
            {Number(product.today).toLocaleString("bn-BD")} টাকা
          </p>
        </div>

        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${badgeClass}`}
        >
          {badgeIcon}{" "}
          {Number(change).toLocaleString("bn-BD", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}
          %
        </span>
      </div>
    </Link>
  );
}

function ProductGrid({
  products,
  emptyText,
}: {
  products: Product[];
  emptyText: string;
}) {
  if (products.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">{emptyText}</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default async function ProductSections() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
    .slice(0, 6);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <section>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          আজ দাম বেড়েছে <span className="text-green-600">▲</span>
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          আজ যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে
        </p>
        <ProductGrid
          products={risers}
          emptyText="আজ কোনো পণ্যের দাম বাড়েনি।"
        />
      </section>

      <section className="mt-16">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          আজ দাম কমেছে <span className="text-red-600">▼</span>
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          আজ যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে
        </p>
        <ProductGrid
          products={fallers}
          emptyText="আজ কোনো পণ্যের দাম কমেনি।"
        />
      </section>

      <section id="সব-পণ্য" className="mt-16 scroll-mt-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          সব পণ্য
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          বাজারের সব নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম এক নজরে দেখুন।
        </p>
        <ProductGrid
          products={products}
          emptyText="কোনো পণ্য পাওয়া যায়নি।"
        />
      </section>
    </main>
  );
}
