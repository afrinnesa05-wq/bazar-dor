
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

type Market = {
  nameBn?: string;
  name?: string;
  price?: number;
};

type Product = {
  id: number | string;
  slug: string;
  nameBn: string;
  image?: string;
  today: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  unit: string;
  category?: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  description?: string;
  change?: {
    dir: string;
    pct: number;
  };
  markets?: Market[];
};

const unitNames: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const formatPrice = (price: number) =>
  price.toLocaleString("bn-BD");

const Page = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  // Check login session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { slug } = await params;

  // Fetch products
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-xl font-bold">
          পণ্যের তথ্য লোড করা যায়নি।
        </h1>
        <Link
          href="/"
          className="mt-4 inline-block text-green-600"
        >
          ← সব পণ্যে ফিরে যান
        </Link>
      </main>
    );
  }

  const result: unknown = await res.json();

  let products: Product[] = [];

  if (Array.isArray(result)) {
    products = result as Product[];
  } else if (
    typeof result === "object" &&
    result !== null &&
    "data" in result &&
    Array.isArray(result.data)
  ) {
    products = result.data as Product[];
  } else if (
    typeof result === "object" &&
    result !== null &&
    "products" in result &&
    Array.isArray(result.products)
  ) {
    products = result.products as Product[];
  }

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold">
          পণ্য পাওয়া যায়নি
        </h1>
        <Link
          href="/"
          className="mt-4 inline-block text-green-600"
        >
          ← সব পণ্যে ফিরে যান
        </Link>
      </main>
    );
  }

  const markets = product.markets ?? [];

  const prices = markets
    .map((market) => market.price)
    .filter(
      (price): price is number =>
        typeof price === "number" &&
        Number.isFinite(price)
    );

  const minPrice = prices.length
    ? Math.min(...prices)
    : product.today;

  const maxPrice = prices.length
    ? Math.max(...prices)
    : product.today;

  const avgPrice = prices.length
    ? prices.reduce((sum, price) => sum + price, 0) /
      prices.length
    : product.today;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const unit =
    unitNames[product.unit?.toLowerCase()] ??
    product.unit ??
    "";

  const imageUrl =
    typeof product.image === "string" &&
    /^https?:\/\//.test(product.image)
      ? product.image
      : null;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Link
          href="/"
          className="text-sm font-medium text-gray-500 transition hover:text-green-600"
        >
          ← সব পণ্যে ফিরে যান
        </Link>

        {/* Product Summary */}
        <section className="mt-6 grid gap-8 rounded-2xl border bg-white p-6 md:grid-cols-2 md:p-8">
          <div className="flex min-h-64 items-center justify-center rounded-xl bg-green-50 p-4">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.nameBn}
                width={500}
                height={350}
                sizes="(max-width: 768px) 100vw, 500px"
                className="max-h-80 w-full object-contain"
              />
            ) : (
              <span className="text-8xl sm:text-9xl">
                {product.image || "🛒"}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-2">
              {product.categoryNameBn && (
                <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                  {product.categoryIcon}{" "}
                  {product.categoryNameBn}
                </span>
              )}

              {product.category && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  {product.category}
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              {product.nameBn}
            </h1>

            <p className="mt-3 leading-7 text-gray-500">
              {product.description ??
                `${product.nameBn} এর আজকের বাজারদর ও বিভিন্ন বাজারের দামের তুলনা দেখুন।`}
            </p>

            <p className="mt-4 text-sm text-gray-500">
              একক: প্রতি {unit}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-sm text-gray-500">
                আজকের দাম
              </span>

              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.today)} টাকা
              </span>

              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  isUp
                    ? "bg-green-50 text-green-700"
                    : isDown
                      ? "bg-red-50 text-red-600"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {formatPrice(product.change?.pct ?? 0)}%
              </span>
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-10">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            {prices.length
              ? `বাজারভিত্তিক ${prices.length}টি দামের তুলনা`
              : "বাজারভিত্তিক দাম পাওয়া যায়নি; আপাতত আজকের দাম দেখানো হচ্ছে।"}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-white p-5">
              <p className="text-sm text-gray-500">
                সর্বনিম্ন দাম
              </p>
              <p className="mt-3 text-2xl font-bold text-green-700">
                {formatPrice(minPrice)} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-400">
                প্রতি {unit}
              </p>
            </div>

            <div className="rounded-xl border bg-white p-5">
              <p className="text-sm text-gray-500">
                সর্বোচ্চ দাম
              </p>
              <p className="mt-3 text-2xl font-bold text-red-600">
                {formatPrice(maxPrice)} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-400">
                প্রতি {unit}
              </p>
            </div>

            <div className="rounded-xl border bg-white p-5">
              <p className="text-sm text-gray-500">
                গড় দাম
              </p>
              <p className="mt-3 text-2xl font-bold text-gray-900">
                {formatPrice(Math.round(avgPrice))} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-400">
                প্রতি {unit}
              </p>
            </div>
          </div>
        </section>

        {/* Previous Prices */}
        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            আগের দামের তুলনা
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "গতকাল", price: product.yesterday },
              { label: "গত সপ্তাহ", price: product.lastWeek },
              { label: "গত মাস", price: product.lastMonth },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border bg-white p-5"
              >
                <p className="text-sm text-gray-500">
                  {item.label}
                </p>
                <p className="mt-2 text-xl font-bold text-gray-900">
                  {typeof item.price === "number"
                    ? `${formatPrice(item.price)} টাকা`
                    : "তথ্য নেই"}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  প্রতি {unit}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Market Prices */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <p className="mb-5 mt-1 text-sm text-gray-500">
            বিভিন্ন বাজারে {product.nameBn}-এর দাম
          </p>

          {markets.length > 0 ? (
            <div className="overflow-hidden rounded-xl border bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-5 py-4 text-sm font-semibold text-gray-600">
                        বাজারের নাম
                      </th>
                      <th className="px-5 py-4 text-right text-sm font-semibold text-gray-600">
                        আজকের দাম
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {markets.map((market, index) => (
                      <tr
                        key={`${
                          market.nameBn ??
                          market.name ??
                          "market"
                        }-${index}`}
                        className="border-t"
                      >
                        <td className="px-5 py-4 font-medium text-gray-800">
                          📍{" "}
                          {market.nameBn ??
                            market.name ??
                            "বাজার"}
                        </td>

                        <td className="px-5 py-4 text-right font-bold text-gray-900">
                          {typeof market.price === "number"
                            ? `${formatPrice(market.price)} টাকা`
                            : "দাম পাওয়া যায়নি"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed bg-white px-5 py-10 text-center">
              <p className="text-3xl">🏪</p>
              <p className="mt-3 font-semibold text-gray-800">
                বাজারভিত্তিক তথ্য পাওয়া যায়নি
              </p>
              <p className="mt-1 text-sm text-gray-500">
                API-তে বাজারের তথ্য থাকলে এখানে দেখানো হবে।
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Page;
