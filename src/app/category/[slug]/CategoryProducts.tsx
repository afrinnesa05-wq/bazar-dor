"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Product = {
id: number;
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

type Props = {
products: Product[];
};

const unitNames: Record<string, string> = {
kg: "প্রতি কেজি",
liter: "প্রতি লিটার",
litre: "প্রতি লিটার",
dozen: "প্রতি ডজন",
piece: "প্রতি পিস",
pcs: "প্রতি পিস",
};

export default function CategoryProducts({ products }: Props) {
const [sort, setSort] = useState("default");

const sortedProducts = useMemo(() => {
const items = [...products];


if (sort === "low") {
  items.sort((a, b) => a.today - b.today);
} else if (sort === "high") {
  items.sort((a, b) => b.today - a.today);
}

return items;


}, [products, sort]);

return ( <section className="mt-6"> <div className="mb-5 flex flex-wrap items-center justify-between gap-3"> <p className="text-sm text-gray-500">
মোট {products.length}টি পণ্য </p>


    <label className="flex items-center gap-2 text-sm text-gray-600">
      সাজান:
      <select
        value={sort}
        onChange={(event) => setSort(event.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-green-500"
      >
        <option value="default">ডিফল্ট</option>
        <option value="low">দাম: কম থেকে বেশি</option>
        <option value="high">দাম: বেশি থেকে কম</option>
      </select>
    </label>
  </div>

  {sortedProducts.length === 0 ? (
    <div className="rounded-2xl border border-dashed border-gray-300 px-5 py-12 text-center">
      <div className="mb-3 text-4xl">🛒</div>

      <h2 className="text-lg font-semibold text-gray-800">
        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        অন্য ক্যাটাগরি দেখো অথবা হোম পেজে ফিরে যাও।
      </p>

      <Link
        href="/"
        className="mt-5 inline-flex rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {sortedProducts.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
                {product.image || "🛒"}
              </div>

              <div className="min-w-0">
                <h2 className="truncate font-semibold text-gray-800">
                  {product.nameBn}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {unitNames[product.unit] || product.unit}
                </p>
              </div>
            </div>

            {product.change && (
              <span
                className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
                  product.change.dir === "up"
                    ? "bg-red-50 text-red-600"
                    : product.change.dir === "down"
                    ? "bg-green-50 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {product.change.dir === "up"
                  ? "↑"
                  : product.change.dir === "down"
                  ? "↓"
                  : "—"}{" "}
                {product.change.pct}%
              </span>
            )}
          </div>

          <div className="mt-5 border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-500">আজকের দাম</p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              ৳{product.today.toLocaleString("bn-BD")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )}
</section>


);
}
