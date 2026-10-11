
type Product = {
  id: number;
  nameBn: string;
  today: number;
  unit: string;
  image?: string;
  change?: {
    dir: "up" | "down" | "same";
    pct: number;
  };
};

const PriceTicker = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("পণ্যের দাম লোড করা যায়নি");
  }

  const products: Product[] = await res.json();
  const firstTen = products.slice(0, 10);

  const formatPrice = (price: number) =>
    price.toLocaleString("bn-BD");

  return (
    <div className="w-full overflow-hidden bg-gray-900 text-white">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 gap-8 px-4 py-2"
            aria-hidden={copy === 1}
          >
            {firstTen.map((product) => {
              const dir = product.change?.dir ?? "same";
              const pct = product.change?.pct ?? 0;

              return (
                <div
                  key={product.id}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <span>{product.image ?? "🛒"}</span>
                  <span>{product.nameBn}</span>
                  <span>
                    {formatPrice(product.today)} টাকা/
                    {product.unit}
                  </span>

                  <span
                    className={
                      dir === "up"
                        ? "text-green-400"
                        : dir === "down"
                          ? "text-red-400"
                          : "text-gray-300"
                    }
                  >
                    {dir === "up"
                      ? "▲"
                      : dir === "down"
                        ? "▼"
                        : "—"}{" "}
                    {formatPrice(pct)}%
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTicker;
