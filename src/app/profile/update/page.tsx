import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "./UpdateProfileForm";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="mx-auto min-h-[60vh] max-w-xl px-4 py-10">
      <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold">তথ্য পরিবর্তন করুন</h1>
        <p className="mt-2 text-sm text-gray-500">
          তোমার প্রোফাইলের নাম পরিবর্তন করতে পারবে।
        </p>

        <div className="mt-6">
          <UpdateProfileForm initialName={session.user.name || ""} />
        </div>
      </div>
    </main>
  );
}