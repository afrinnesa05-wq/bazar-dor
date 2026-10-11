import Link from "next/link";

export default function CategoryNotFound() {
return ( <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4 py-12"> <div className="max-w-md text-center"> <div className="text-6xl">🔎</div>

    <h1 className="mt-5 text-2xl font-bold text-gray-900">
      ক্যাটাগরি খুঁজে পাওয়া যায়নি
    </h1>

    <p className="mt-3 text-gray-600">
      ক্যাটাগরিটি মুছে ফেলা হয়েছে অথবা ঠিকানা ভুল হয়েছে।
    </p>

    <Link
      href="/"
      className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
    >
      হোম পেজে ফিরে যান
    </Link>
  </div>
</main>


);
}
