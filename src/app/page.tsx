import Hero from "./components/Hero";
import ProductSections from "./components/ProductSections";

const Page = () => {
  return (
    <>
      <Hero />
      <ProductSections/>

      <section id="সব-পণ্য" className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold">
          সব পণ্য
        </h2>

        {/* এখানে পরে product cards আসবে */}
      </section>
    </>
  );
};

export default Page;