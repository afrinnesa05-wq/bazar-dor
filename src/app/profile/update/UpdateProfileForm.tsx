"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

type UpdateProfileFormProps = {
  initialName: string;
};

export default function UpdateProfileForm({
  initialName,
}: UpdateProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("নাম লিখো।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        toast.error(result.error.message || "তথ্য পরিবর্তন করা যায়নি।");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে।");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          তোমার নাম
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="তোমার নাম লিখো"
          required
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-600"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
      </button>
    </form>
  );
}