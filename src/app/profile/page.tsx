import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-10">
      <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="mt-2 text-sm text-gray-500">
          তোমার অ্যাকাউন্টের তথ্য এখানে দেখতে পারবে।
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">নাম</p>
            <p className="mt-1 font-semibold">
              {session.user.name || "নাম দেওয়া হয়নি"}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">ইমেইল</p>
            <p className="mt-1 break-all font-semibold">
              {session.user.email}
            </p>
          </div>
        </div>

        <Link
          href="/profile/update"
          className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700"
        >
          তথ্য পরিবর্তন করুন
        </Link>
      </div>
    </main>
  );
}