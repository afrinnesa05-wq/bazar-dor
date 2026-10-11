
import Link from "next/link";
import CategoryProducts from "./CategoryProducts";
import { notFound } from "next/navigation";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  category: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  change?: {
    dir: string;
    pct: number;
  };
};

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

const unitNames: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const Page = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const [categoryRes, productsRes] = await Promise.all([
    fetch(
      `https://openapi.programming-hero.com/api/bazardor/categories/${slug}`,
      { cache: "no-store" }
    ),
    fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      { cache: "no-store" }
    ),
  ]);

  if (!categoryRes.ok || !productsRes.ok) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <Link href="/" className="text-green-600 hover:underline">
          ← হোমে ফিরে যান
        </Link>

        <p className="mt-6 text-red-600">
          ক্যাটাগরির তথ্য লোড করা যায়নি। আবার চেষ্টা করো।
        </p>
      </main>
    );
  }
  if (categoryRes.status === 404) {
  notFound();
}

  const category: Category = await categoryRes.json();
  const allProducts: Product[] = await productsRes.json();

  const products = allProducts.filter(
    (product) => product.category === slug
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="text-sm text-gray-500 transition hover:text-green-600"
        >
          ← হোমে ফিরে যান
        </Link>

        {/* Category Header */}
        <section className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-6 sm:p-10">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white text-5xl shadow-sm">
              {category.icon}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {category.nameBn}
              </h1>

              <p className="mt-2 text-sm text-gray-600">
                এই ক্যাটাগরির{" "}
                {products.length.toLocaleString("bn-BD")}টি পণ্য
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="mt-10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {category.nameBn} এর আজকের বাজারদর
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              এই ক্যাটাগরির পণ্যের বর্তমান দাম ও দামের পরিবর্তন দেখুন।
            </p>
          </div>
          <CategoryProducts products={products} />

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => {
                const isUp = product.change?.dir === "up";
                const isDown = product.change?.dir === "down";

                const badgeClass = isUp
                  ? "bg-green-50 text-green-700"
                  : isDown
                    ? "bg-red-50 text-red-600"
                    : "bg-gray-100 text-gray-500";

                const badgeIcon = isUp
                  ? "▲"
                  : isDown
                    ? "▼"
                    : "—";

                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="group rounded-xl border border-gray-200 bg-white p-4 transition duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
                  >
                    <div className="flex h-36 items-center justify-center rounded-lg bg-gray-50 text-6xl transition group-hover:bg-green-50">
                      {product.image}
                    </div>

                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {product.nameBn}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        প্রতি{" "}
                        {unitNames[product.unit.toLowerCase()] ??
                          product.unit}
                      </p>
                    </div>

                    <div className="mt-5 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xs text-gray-500">
                          আজকের দাম
                        </p>

                        <p className="mt-1 text-xl font-bold text-gray-900">
                          {product.today.toLocaleString("bn-BD")} টাকা
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1.5 text-xs font-semibold ${badgeClass}`}
                      >
                        {badgeIcon}{" "}
                        {product.change?.pct?.toLocaleString("bn-BD", {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        }) ?? "০"}
                        %
                      </span>
                    </div>

                    <div className="mt-5 border-t pt-3 text-sm font-medium text-green-700">
                      বিস্তারিত দেখুন →
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed bg-white px-5 py-12 text-center">
              <div className="text-4xl">{category.icon}</div>

              <h3 className="mt-4 font-semibold text-gray-800">
                এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                API-এর পণ্যের category field-এর সঙ্গে ক্যাটাগরির slug মিলছে কি না পরীক্ষা করতে হবে।
              </p>

              <Link
                href="/"
                className="mt-5 inline-block rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
              >
                সব পণ্য দেখুন
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Page;