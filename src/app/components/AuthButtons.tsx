"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut, useSession } from "@/lib/auth-client";

export default function AuthButtons() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await signOut();

      if (result?.error) {
        toast.error("লগআউট করা যায়নি। আবার চেষ্টা করো।");
        return;
      }

      toast.success("সফলভাবে লগআউট হয়েছে।");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("লগআউট করার সময় সমস্যা হয়েছে।");
    }
  };

  if (isPending) {
    return <div className="h-9 w-32 animate-pulse rounded-lg bg-gray-200" />;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/profile"
          className="max-w-36 truncate rounded-lg border px-3 py-1.5 text-sm"
        >
          {session.user.name || "আমার প্রোফাইল"}
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
        >
          লগআউট
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="rounded-lg border px-3 py-1.5 text-sm"
      >
        সাইন ইন
      </Link>

      <Link
        href="/register"
        className="rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700"
      >
        সাইন আপ
      </Link>
    </div>
  );
}