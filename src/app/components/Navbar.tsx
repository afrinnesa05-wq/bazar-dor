import Image from "next/image";
import Link from "next/link";
import Navlinks from "./Navlinks";
import PriceTicker from "./PriceTicker";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            className="h-8 w-8"
            src="/logo-icon.png"
            alt="বাজার দর"
            width={32}
            height={32}
          />

          <div>
            <h2 className="text-lg font-bold leading-none">
              বাজার দর
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {date}
            </p>
          </div>
        </Link>

        <AuthButtons />
      </div>

      <Navlinks />
      <PriceTicker />
    </header>
  );
};

export default Navbar;
