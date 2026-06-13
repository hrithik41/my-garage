import dynamic from "next/dynamic";
import Hero from "@/components/hero";

// 1. Initial viewport components (Loaded immediately)
import Highlights from "@/components/highlights";

// 2. Below-the-fold components (Lazy loaded in background / on demand)
const ServiceCategories = dynamic(() => import("@/components/serviceCategories"), {
  loading: () => (
    <div className="py-24 text-center text-gray-500 font-medium animate-pulse">
      Loading services categories...
    </div>
  ),
  ssr: true,
});

const WhyChooseUs = dynamic(() => import("@/components/whyChooseUs"), {
  loading: () => <div className="py-24 bg-[#09090c]" />,
  ssr: true,
});

const TestimonialsAndOffers = dynamic(() => import("@/components/testimonialsAndOffers"), {
  loading: () => <div className="py-24 bg-[#0d0d11]" />,
  ssr: true,
});

const GalleryAndMap = dynamic(() => import("@/components/galleryAndMap"), {
  loading: () => <div className="py-24 bg-[#09090c]" />,
  ssr: true,
});

export default function Home() {
  return (
    <main className="flex-grow pb-16">
      {/* Hero Banner (Loaded Immediately) */}
      <Hero />
      
      {/* Highlights Bar (Loaded Immediately) */}
      <Highlights />
      
      {/* Service Grid (Lazy Loaded) */}
      <ServiceCategories />
      
      {/* Stats Counter & Brands (Lazy Loaded) */}
      <WhyChooseUs />
      
      {/* Testimonials Slider & Offers (Lazy Loaded) */}
      <TestimonialsAndOffers />

      {/* Before/After Slider & Location Map (Lazy Loaded) */}
      <GalleryAndMap />
    </main>
  );
}
