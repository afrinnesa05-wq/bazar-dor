"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function LogoutButton() {
const [loading, setLoading] = useState(false);
const router = useRouter();

const handleLogout = async () => {
setLoading(true);


try {
  const { error } = await authClient.signOut();

  if (error) {
    toast.error(error.message || "Logout করা যায়নি");
    return;
  }

  toast.success("সফলভাবে Logout হয়েছে!");
  router.push("/");
  router.refresh();
} catch {
  toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
} finally {
  setLoading(false);
}


};

return ( <button
   type="button"
   onClick={handleLogout}
   disabled={loading}
   className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 disabled:opacity-60"
 >
{loading ? "Logout হচ্ছে..." : "সাইন আউট"} </button>
);
}
