import Image from "next/image";

const Hero = () => {
  return (
    <section className="bg-green-50">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14 grid md:grid-cols-2 gap-8 items-center">

        {/* Left Content */}
        <div>
          <p className="text-sm font-medium text-green-600 mb-3">
            প্রতিদিনের বাজারদর এক নজরে
          </p>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
            আজকের বাজারদর
            <br />
            জানুন সহজেই
          </h1>

          <p className="mt-4 text-gray-600 max-w-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ
            নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ দাম
            এক জায়গায় দেখুন।
          </p>

          {/* Anchor CTA */}
          <a
            href="#সব-পণ্য"
            className="inline-block mt-6 px-5 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্য"
            width={520}
            height={360}
            className="w-full max-w-md h-auto"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;